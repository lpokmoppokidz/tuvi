# 09. Xử Lý Lỗi & Phục Hồi

## 9. Xử Lý Lỗi Toàn Diện

### 9.1 Error Hierarchy

```typescript
// src/shared/types/errors.types.ts

/**
 * Custom error types for the app
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public isOperational: boolean = true,
    public details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

// Authentication Errors
export class AuthError extends AppError {
  constructor(
    message: string,
    code: AuthErrorCode,
    details?: Record<string, unknown>,
  ) {
    super(message, code, 401, true, details);
    this.name = "AuthError";
  }
}

export enum AuthErrorCode {
  INVALID_CREDENTIALS = "AUTH_001",
  TOKEN_EXPIRED = "AUTH_002",
  TOKEN_INVALID = "AUTH_003",
  SESSION_EXPIRED = "AUTH_004",
  NETWORK_ERROR = "AUTH_005",
  RATE_LIMITED = "AUTH_006",
  ACCOUNT_LOCKED = "AUTH_007",
}

// Validation Errors
export class ValidationError extends AppError {
  constructor(
    message: string,
    public fieldErrors: FieldError[] = [],
  ) {
    super(message, "VALIDATION_ERROR", 400, true, { fieldErrors });
    this.name = "ValidationError";
  }
}

export interface FieldError {
  field: string;
  message: string;
  code: string;
}

// API Errors
export class APIError extends AppError {
  constructor(
    message: string,
    code: string,
    public apiResponse?: unknown,
  ) {
    super(message, code, 500, true);
    this.name = "APIError";
  }
}

// Network Errors
export class NetworkError extends AppError {
  constructor(message: string = "Lỗi kết nối mạng") {
    super(message, "NETWORK_ERROR", 0, true);
    this.name = "NetworkError";
  }
}

// Calculation Errors
export class CalculationError extends AppError {
  constructor(
    message: string,
    public calculationType: string,
  ) {
    super(message, "CALCULATION_ERROR", 500, true);
    this.name = "CalculationError";
  }
}
```

### 9.2 Error Handler Service

```typescript
// src/shared/services/error-handler.service.ts

import {
  AppError,
  AuthError,
  ValidationError,
  NetworkError,
} from "@/shared/types/errors.types";

type ErrorHandler = (error: Error, context?: ErrorContext) => void;

interface ErrorContext {
  screen?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

/**
 * Global error handler service
 */
class ErrorHandlerService {
  private handlers: ErrorHandler[] = [];
  private errorLog: ErrorLogEntry[] = [];
  private maxLogSize = 100;

  /**
   * Register an error handler
   */
  registerHandler(handler: ErrorHandler): () => void {
    this.handlers.push(handler);
    return () => {
      this.handlers = this.handlers.filter((h) => h !== handler);
    };
  }

  /**
   * Handle an error
   */
  handle(error: Error, context?: ErrorContext): Error {
    // Log the error
    this.logError(error, context);

    // Call registered handlers
    this.handlers.forEach((handler) => {
      try {
        handler(error, context);
      } catch (handlerError) {
        console.error("Error in error handler:", handlerError);
      }
    });

    // Determine if should throw or return error
    if (error instanceof AppError) {
      return error;
    }

    // Wrap unknown errors
    return new AppError(
      "Đã xảy ra lỗi không mong muốn",
      "UNKNOWN_ERROR",
      500,
      false,
    );
  }

  /**
   * Log error for debugging
   */
  private logError(error: Error, context?: ErrorContext): void {
    const entry: ErrorLogEntry = {
      id: generateId(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      context: context || {},
      timestamp: new Date().toISOString(),
      userId: getCurrentUserId(), // Implement based on your auth
    };

    // Add to local log
    this.errorLog.push(entry);
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }

    // Log to console in development
    if (__DEV__) {
      console.group(`🚨 Error: ${error.name}`);
      console.error(error.message);
      console.error(error.stack);
      console.log("Context:", context);
      console.groupEnd();
    }
  }

  /**
   * Get recent errors
   */
  getRecentErrors(): ErrorLogEntry[] {
    return this.errorLog.slice(-10);
  }

  /**
   * Clear error log
   */
  clearLog(): void {
    this.errorLog = [];
  }
}

/**
 * Error translation service
 * Maps errors to user-friendly messages
 */
class ErrorTranslationService {
  private translations: Record<string, string> = {
    // Auth errors
    AUTH_001: "Email hoặc mật khẩu không đúng",
    AUTH_002: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại",
    AUTH_003: "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại",
    AUTH_004: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại",
    AUTH_005: "Không thể kết nối máy chủ. Vui lòng kiểm tra kết nối internet",
    AUTH_006: "Quá nhiều lần thử. Vui lòng đợi 15 phút",
    AUTH_007: "Tài khoản đã bị khóa. Vui lòng liên hệ hỗ trợ",

    // Validation errors
    VALIDATION_ERROR: "Dữ liệu không hợp lệ",
    INVALID_EMAIL: "Email không hợp lệ",
    INVALID_PASSWORD: "Mật khẩu phải có ít nhất 8 ký tự",
    INVALID_DATE: "Ngày sinh không hợp lệ",

    // API errors
    NETWORK_ERROR:
      "Không thể kết nối máy chủ. Vui lòng kiểm tra kết nối internet",
    SERVER_ERROR: "Máy chủ đang bận. Vui lòng thử lại sau",
    NOT_FOUND: "Không tìm thấy dữ liệu",
    TIMEOUT: "Yêu cầu đã hết thời gian. Vui lòng thử lại",

    // Calculation errors
    CALCULATION_ERROR: "Không thể tính toán lá số. Vui lòng thử lại sau",

    // Unknown
    UNKNOWN_ERROR: "Đã xảy ra lỗi. Vui lòng thử lại",
  };

  /**
   * Get user-friendly error message
   */
  getMessage(error: Error): string {
    if (error instanceof AppError) {
      return this.translations[error.code] || error.message;
    }

    // Handle Supabase errors
    if ("code" in error) {
      const code = (error as { code: string }).code;
      return this.translations[code] || this.translations["UNKNOWN_ERROR"];
    }

    return this.translations["UNKNOWN_ERROR"];
  }

  /**
   * Check if error is recoverable
   */
  isRecoverable(error: Error): boolean {
    if (error instanceof AppError) {
      return error.statusCode < 500;
    }

    if (error instanceof NetworkError) {
      return true;
    }

    return false;
  }
}

export const errorHandler = new ErrorHandlerService();
export const errorTranslator = new ErrorTranslationService();

// Helper to generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper to get current user ID
function getCurrentUserId(): string | null {
  // Implement based on your auth state
  return null;
}
```

### 9.3 Error Boundary Component

```typescript
// src/shared/components/ErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { colors } from '@/theme';
import { errorHandler, errorTranslator } from '@/shared/services/error-handler.service';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `ERR-${Date.now()}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to error handler
    errorHandler.handle(error, {
      component: 'ErrorBoundary',
      metadata: {
        errorInfo: errorInfo.componentStack,
      },
    });

    // Call custom error handler
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorId: null,
    });
  };

  handleReport = (): void => {
    // Open feedback form or send error report
    // Implement based on your feedback system
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          errorId={this.state.errorId}
          onRetry={this.handleRetry}
          onReport={this.handleReport}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Error fallback UI
 */
interface ErrorFallbackProps {
  error: Error | null;
  errorId: string | null;
  onRetry: () => void;
  onReport: () => void;
}

function ErrorFallback({ error, errorId, onRetry, onReport }: ErrorFallbackProps) {
  const errorMessage = error ? errorTranslator.getMessage(error) : 'Đã xảy ra lỗi';
  const isRecoverable = error ? errorTranslator.isRecoverable(error) : true;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>⚠️</Text>
      </View>

      <Text style={styles.title}>Oops! Đã xảy ra lỗi</Text>

      <Text style={styles.message}>{errorMessage}</Text>

      {errorId && (
        <Text style={styles.errorId}>Mã lỗi: {errorId}</Text>
      )}

      {__DEV__ && error && (
        <View style={styles.devInfo}>
          <Text style={styles.devTitle}>Chi tiết (Development only):</Text>
          <Text style={styles.devMessage}>{error.message}</Text>
          {error.stack && (
            <Text style={styles.devStack}>{error.stack}</Text>
          )}
        </View>
      )}

      <View style={styles.actions}>
        {isRecoverable && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>Thử Lại</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.reportButton} onPress={onReport}>
          <Text style={styles.reportButtonText}>Báo Cáo Lỗi</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => {
          // Navigate to home
        }}
      >
        <Text style={styles.homeButtonText}>Quay Về Trang Chủ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.errorLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  errorId: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  devInfo: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    maxWidth: '100%',
  },
  devTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.error,
    marginBottom: 8,
  },
  devMessage: {
    fontSize: 11,
    color: colors.text,
    marginBottom: 4,
  },
  devStack: {
    fontSize: 10,
    color: colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  reportButton: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reportButtonText: {
    color: colors.text,
    fontSize: 14,
  },
  homeButton: {
    marginTop: 32,
    padding: 12,
  },
  homeButtonText: {
    color: colors.primary,
    fontSize: 14,
  },
});
```

### 9.4 Screen-Level Error Handling

```typescript
// src/shared/hooks/useErrorHandler.ts

import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { errorHandler, errorTranslator } from '@/shared/services/error-handler.service';
import { AppError, ValidationError, NetworkError } from '@/shared/types/errors.types';

interface UseErrorHandlerReturn {
  error: Error | null;
  isError: boolean;
  handleError: (error: Error, options?: ErrorOptions) => void;
  clearError: () => void;
  showErrorAlert: (error: Error, options?: ErrorOptions) => void;
}

interface ErrorOptions {
  title?: string;
  onRetry?: () => void;
  onReport?: () => void;
  fallbackMessage?: string;
}

/**
 * Hook for handling errors in screens/components
 */
export function useErrorHandler(): UseErrorHandlerReturn {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((err: Error, options?: ErrorOptions) => {
    // Process error
    const processedError = errorHandler.handle(err, {
      // Add context automatically
    });

    setError(processedError);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const showErrorAlert = useCallback((err: Error, options?: ErrorOptions) => {
    const message = errorTranslator.getMessage(err);
    const isRecoverable = errorTranslator.isRecoverable(err);

    if (err instanceof ValidationError && err.fieldErrors.length > 0) {
      // Show field-specific errors
      const fieldMessages = err.fieldErrors
        .map(f => `${f.field}: ${f.message}`)
        .join('\n');

      Alert.alert(
        options?.title || 'Lỗi Xác Thực',
        fieldMessages,
        [{ text: 'OK' }]
      );
      return;
    }

    if (err instanceof NetworkError || !isRecoverable) {
      // Show error with retry option
      Alert.alert(
        options?.title || 'Lỗi',
        message,
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Thử Lại',
            onPress: options?.onRetry,
          },
          {
            text: 'Báo Cáo',
            onPress: options?.onReport,
          },
        ]
      );
      return;
    }

    // Simple error alert
    Alert.alert(
      options?.title || 'Lỗi',
      message,
      [{ text: 'OK' }]
    );
  }, []);

  return {
    error,
    isError: error !== null,
    handleError,
    clearError,
    showErrorAlert,
  };
}

/**
 * Async wrapper with error handling
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  options: {
    onError?: (error: Error) => void;
    context?: string;
  } = {}
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    errorHandler.handle(err, { action: options.context });
    options.onError?.(err);
    return null;
  }
}

/**
 * HOC for error handling
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorOptions?: ErrorOptions
): React.FC<P> {
  return function ErrorBoundaryWrapper(props: P) {
    const { error, showErrorAlert, clearError } = useErrorHandler();

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorTranslator.getMessage(error)}</Text>
          <Button title="Thử Lại" onPress={clearError} />
        </View>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 14,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
});
```

### 9.5 API Error Response Handling

```typescript
// src/shared/services/api.service.ts

import { supabase } from "@/lib/supabase";
import { errorTranslator } from "./error-handler.service";
import {
  AppError,
  APIError,
  NetworkError,
  AuthError,
} from "@/shared/types/errors.types";

interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIErrorInfo;
}

interface APIErrorInfo {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Generic API call wrapper
 */
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<APIResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle API error
      const apiError = new APIError(
        data.error?.message || "API Error",
        data.error?.code || "API_ERROR",
        data,
      );

      return {
        success: false,
        error: {
          code: apiError.code,
          message: errorTranslator.getMessage(apiError),
          details: data.error?.details,
        },
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    // Handle network error
    if (error instanceof TypeError && error.message.includes("Network")) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: errorTranslator.getMessage(new NetworkError()),
        },
      };
    }

    return {
      success: false,
      error: {
        code: "UNKNOWN_ERROR",
        message: errorTranslator.getMessage(error as Error),
      },
    };
  }
}

/**
 * Supabase function call wrapper
 */
export async function callFunction<T>(
  functionName: string,
  options: {
    body?: unknown;
    method?: "POST" | "GET" | "PUT" | "DELETE";
  } = {},
): Promise<APIResponse<T>> {
  const { data, error } = await supabase.functions.invoke(functionName, {
    body: options.body,
    method: options.method,
  });

  if (error) {
    // Handle Supabase error
    let errorCode = "FUNCTION_ERROR";
    let errorMessage = error.message;

    // Map common Supabase error codes
    if (error.message.includes("JWT")) {
      errorCode = "AUTH_002"; // Token expired
    } else if (error.message.includes("rate limit")) {
      errorCode = "AUTH_006";
    } else if (error.message.includes("not found")) {
      errorCode = "NOT_FOUND";
    }

    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
      },
    };
  }

  return {
    success: true,
    data: data as T,
  };
}

/**
 * Parse Supabase error to user-friendly message
 */
export function parseSupabaseError(error: {
  message: string;
  status?: number;
}): string {
  // Rate limiting
  if (error.status === 429) {
    return "Quá nhiều yêu cầu. Vui lòng thử lại sau.";
  }

  // Authentication errors
  if (error.message.includes("Invalid login credentials")) {
    return "Email hoặc mật khẩu không đúng";
  }

  if (error.message.includes("Email not confirmed")) {
    return "Email chưa được xác nhận";
  }

  if (error.message.includes("User already registered")) {
    return "Email đã được đăng ký";
  }

  // Network errors
  if (
    error.message.includes("fetch failed") ||
    error.message.includes("Network")
  ) {
    return "Không thể kết nối máy chủ. Vui lòng kiểm tra kết nối internet";
  }

  // Database errors
  if (error.message.includes("duplicate key")) {
    return "Dữ liệu đã tồn tại";
  }

  if (error.message.includes("violates foreign key")) {
    return "Dữ liệu không hợp lệ";
  }

  // Default
  return "Đã xảy ra lỗi. Vui lòng thử lại sau";
}
```

---

## 10. Crash Prevention & Recovery

### 10.1 App State Manager

```typescript
// src/shared/services/app-state.service.ts

import { AppState, AppStateStatus, EmitterSubscription } from "react-native";
import { supabase } from "@/lib/supabase";
import { apiCache } from "./api-cache.service";

type AppStateChangeHandler = (state: AppStateStatus) => void;

/**
 * Manage app lifecycle and state transitions
 */
class AppStateManager {
  private currentState: AppStateStatus = "active";
  private listeners: AppStateChangeHandler[] = [];
  private backgroundTime: number | null = null;
  private subscription: EmitterSubscription | null = null;

  // Background timeout (5 minutes)
  private readonly BACKGROUND_TIMEOUT = 5 * 60 * 1000;

  /**
   * Initialize app state manager
   */
  initialize(): void {
    this.currentState = AppState.currentState;

    // Listen for state changes
    this.subscription = AppState.addEventListener(
      "change",
      this.handleStateChange,
    );

    // Handle background/foreground transitions
    this.subscription = AppState.addEventListener("change", (nextState) => {
      if (
        this.currentState === "active" &&
        nextState.match(/inactive|background/)
      ) {
        this.onAppBackground();
      } else if (
        this.currentState.match(/inactive|background/) &&
        nextState === "active"
      ) {
        this.onAppForeground();
      }
      this.currentState = nextState;
    });
  }

  /**
   * Handle state change
   */
  private handleStateChange = (nextState: AppStateStatus): void => {
    this.listeners.forEach((listener) => listener(nextState));
  };

  /**
   * Called when app goes to background
   */
  private async onAppBackground(): Promise<void> {
    this.backgroundTime = Date.now();
    console.log("App went to background");

    // Save any pending data
    // Clear sensitive data from memory if needed
  }

  /**
   * Called when app comes to foreground
   */
  private async onAppForeground(): Promise<void> {
    console.log("App came to foreground");

    // Check if background time exceeded threshold
    if (this.backgroundTime) {
      const backgroundDuration = Date.now() - this.backgroundTime;

      if (backgroundDuration > this.BACKGROUND_TIMEOUT) {
        // Session expired - force re-authentication
        console.log("Session expired after background");
        await this.handleSessionExpiry();
      }
    }

    this.backgroundTime = null;
  }

  /**
   * Handle session expiry
   */
  private async handleSessionExpiry(): Promise<void> {
    try {
      // Sign out user
      await supabase.auth.signOut();

      // Clear sensitive cache
      await apiCache.invalidateAll();

      // Navigate to login (will be handled by navigation listener)
    } catch (error) {
      console.error("Error handling session expiry:", error);
    }
  }

  /**
   * Add state change listener
   */
  addListener(handler: AppStateChangeHandler): () => void {
    this.listeners.push(handler);
    return () => {
      this.listeners = this.listeners.filter((h) => h !== handler);
    };
  }

  /**
   * Get current state
   */
  getState(): AppStateStatus {
    return this.currentState;
  }

  /**
   * Check if app is in foreground
   */
  isActive(): boolean {
    return this.currentState === "active";
  }

  /**
   * Cleanup
   */
  cleanup(): void {
    if (this.subscription) {
      this.subscription.remove();
    }
    this.listeners = [];
  }
}

export const appStateManager = new AppStateManager();
```

### 10.2 Recovery Strategies

```typescript
// src/shared/services/recovery.service.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/lib/supabase";

interface RecoveryPoint {
  id: string;
  timestamp: number;
  screen: string;
  data: Record<string, unknown>;
}

interface CrashRecoveryData {
  lastActiveScreen: string;
  lastActiveTime: number;
  recoveryPoints: RecoveryPoint[];
  pendingActions: PendingAction[];
}

interface PendingAction {
  id: string;
  type: string;
  payload: unknown;
  timestamp: number;
  retryCount: number;
}

/**
 * Service for handling crash recovery and data persistence
 */
class RecoveryService {
  private readonly RECOVERY_KEY = "@tuvi:recovery";
  private readonly PENDING_ACTIONS_KEY = "@tuvi:pending_actions";
  private readonly MAX_RECOVERY_POINTS = 5;
  private readonly MAX_RETRY_COUNT = 3;

  /**
   * Create a recovery point
   */
  async createRecoveryPoint(
    screen: string,
    data: Record<string, unknown>,
  ): Promise<void> {
    try {
      const recovery = await this.getRecoveryData();

      // Add new recovery point
      const point: RecoveryPoint = {
        id: `rp-${Date.now()}`,
        timestamp: Date.now(),
        screen,
        data,
      };

      recovery.recoveryPoints.push(point);

      // Keep only recent recovery points
      if (recovery.recoveryPoints.length > this.MAX_RECOVERY_POINTS) {
        recovery.recoveryPoints = recovery.recoveryPoints.slice(
          -this.MAX_RECOVERY_POINTS,
        );
      }

      recovery.lastActiveScreen = screen;
      recovery.lastActiveTime = Date.now();

      await AsyncStorage.setItem(this.RECOVERY_KEY, JSON.stringify(recovery));
    } catch (error) {
      console.error("Failed to create recovery point:", error);
    }
  }

  /**
   * Get recovery data
   */
  async getRecoveryData(): Promise<CrashRecoveryData> {
    try {
      const raw = await AsyncStorage.getItem(this.RECOVERY_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (error) {
      console.error("Failed to get recovery data:", error);
    }

    return {
      lastActiveScreen: "",
      lastActiveTime: 0,
      recoveryPoints: [],
      pendingActions: [],
    };
  }

  /**
   * Recover from crash
   */
  async recoverFromCrash(): Promise<RecoveryResult> {
    const recovery = await this.getRecoveryData();

    // Check if crash recovery is needed (app was inactive for a while)
    const timeSinceLastActive = Date.now() - recovery.lastActiveTime;

    if (timeSinceLastActive < 60 * 1000) {
      // Less than 1 minute - not a crash, just backgrounded
      return { needsRecovery: false };
    }

    // Find most recent recovery point
    const lastPoint =
      recovery.recoveryPoints[recovery.recoveryPoints.length - 1];

    if (!lastPoint) {
      return { needsRecovery: false };
    }

    return {
      needsRecovery: true,
      screen: lastPoint.screen,
      data: lastPoint.data,
      timestamp: lastPoint.timestamp,
    };
  }

  /**
   * Add pending action for retry
   */
  async addPendingAction(type: string, payload: unknown): Promise<string> {
    const pending = await this.getPendingActions();

    const action: PendingAction = {
      id: `pa-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      payload,
      timestamp: Date.now(),
      retryCount: 0,
    };

    pending.push(action);
    await AsyncStorage.setItem(
      this.PENDING_ACTIONS_KEY,
      JSON.stringify(pending),
    );

    return action.id;
  }

  /**
   * Get pending actions
   */
  async getPendingActions(): Promise<PendingAction[]> {
    try {
      const raw = await AsyncStorage.getItem(this.PENDING_ACTIONS_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (error) {
      console.error("Failed to get pending actions:", error);
    }

    return [];
  }

  /**
   * Retry pending actions
   */
  async retryPendingActions(
    retryFn: (action: PendingAction) => Promise<boolean>,
  ): Promise<RetryResult> {
    const pending = await this.getPendingActions();
    const results: { id: string; success: boolean }[] = [];

    for (const action of pending) {
      if (action.retryCount >= this.MAX_RETRY_COUNT) {
        // Max retries exceeded - remove action
        results.push({ id: action.id, success: false });
        continue;
      }

      try {
        const success = await retryFn(action);

        if (success) {
          results.push({ id: action.id, success: true });
        } else {
          // Increment retry count
          action.retryCount++;
          results.push({ id: action.id, success: false });
        }
      } catch (error) {
        action.retryCount++;
        results.push({ id: action.id, success: false });
      }
    }

    // Remove successful actions
    const remaining = pending.filter(
      (p) => !results.find((r) => r.id === p.id && r.success),
    );

    await AsyncStorage.setItem(
      this.PENDING_ACTIONS_KEY,
      JSON.stringify(remaining),
    );

    return {
      total: pending.length,
      successful: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
    };
  }

  /**
   * Clear all recovery data
   */
  async clearRecoveryData(): Promise<void> {
    await AsyncStorage.removeItem(this.RECOVERY_KEY);
    await AsyncStorage.removeItem(this.PENDING_ACTIONS_KEY);
  }
}

export interface RecoveryResult {
  needsRecovery: boolean;
  screen?: string;
  data?: Record<string, unknown>;
  timestamp?: number;
}

export interface RetryResult {
  total: number;
  successful: number;
  failed: number;
}

export const recoveryService = new RecoveryService();
```

### 10.3 Graceful Degradation

```typescript
// src/shared/services/graceful-degradation.service.ts

import { supabase } from "@/lib/supabase";
import { apiCache } from "./api-cache.service";

interface FallbackData {
  horoscope?: unknown;
  vanHan?: unknown;
  user?: unknown;
}

/**
 * Service for providing fallback data when primary source fails
 */
class GracefulDegradationService {
  private readonly FALLBACK_KEY = "@tuvi:fallback";

  /**
   * Save data as fallback
   */
  async saveAsFallback(type: string, data: unknown): Promise<void> {
    try {
      const fallback = await this.getFallbackData();
      fallback[type] = data;
      await AsyncStorage.setItem(this.FALLBACK_KEY, JSON.stringify(fallback));
    } catch (error) {
      console.error("Failed to save fallback data:", error);
    }
  }

  /**
   * Get fallback data
   */
  async getFallbackData(): Promise<FallbackData> {
    try {
      const raw = await AsyncStorage.getItem(this.FALLBACK_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (error) {
      console.error("Failed to get fallback data:", error);
    }

    return {};
  }

  /**
   * Get horoscope with fallback
   */
  async getHoroscopeWithFallback(horoscopeId: string): Promise<{
    data: unknown | null;
    isFallback: boolean;
    error?: string;
  }> {
    try {
      // Try primary source (Supabase)
      const { data, error } = await supabase.functions.invoke(
        `horoscope/${horoscopeId}`,
      );

      if (error || !data) {
        throw error;
      }

      // Save as fallback
      await this.saveAsFallback("horoscope", data);

      return { data, isFallback: false };
    } catch (error) {
      // Try fallback
      const fallback = await this.getFallbackData();

      if (fallback.horoscope) {
        console.warn("Using fallback horoscope data");
        return { data: fallback.horoscope, isFallback: true };
      }

      return {
        data: null,
        isFallback: false,
        error: "Không thể tải lá số",
      };
    }
  }

  /**
   * Check data freshness
   */
  async isDataFresh(
    type: string,
    maxAgeMs: number = 24 * 60 * 60 * 1000,
  ): Promise<boolean> {
    const fallback = await this.getFallbackData();
    const data = fallback[type as keyof FallbackData];

    if (!data || typeof data !== "object") {
      return false;
    }

    const timestamp = (data as { updatedAt?: number }).updatedAt;
    if (!timestamp) {
      return false;
    }

    return Date.now() - timestamp < maxAgeMs;
  }
}

export const gracefulDegradation = new GracefulDegradationService();
```
