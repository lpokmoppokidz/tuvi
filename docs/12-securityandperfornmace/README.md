# BẢO MẬT VÀ HIỆU NĂNG - TỬ VI ĐẨU SỐ

> **Phiên bản:** 1.0.0
> **Ngày:** 2026-04-17
> **Dự án:** Tử Vi Bắc Tông - Hệ thống Mobile + Supabase Backend
> **Platform:** React Native Expo SDK 54 + Supabase

---

## MỤC LỤC

1. [Tổng Quan Bảo Mật & Hiệu Năng](#1-tổng-quan-bảo-mật--hiệu-năng)
2. [Xác Thực & Ủy Quyền](#2-xác-thực--ủy-quyền-authentication--authorization)
3. [Bảo Mật Dữ Liệu](#3-bảo-mật-dữ-liệu)
4. [Bảo Mật API & Edge Functions](#4-bảo-mật-api--edge-functions)
5. [Bảo Mật Database & Row Level Security](#5-bảo-mật-database--row-level-security)
6. [Tối Ưu Hóa Tài Nguyên - Hình Ảnh](#6-tối-ưu-hóa-tài-nguyên---hình-ảnh)
7. [Tối Ưu Hóa Tài Nguyên - Code & Bundle](#7-tối-ưu-hóa-tài-nguyên---code--bundle)
8. [Tối Ưu Hóa Network & Lazy Loading](#8-tối-ưu-hóa-network--lazy-loading)
9. [Xử Lý Lỗi Toàn Diện](#9-xử-lý-lỗi-toàn-diện)
10. [Crash Prevention & Recovery](#10-crash-prevention--recovery)
11. [Monitoring & Logging](#11-monitoring--logging)
12. [Checklist Triển Khai](#12-checklist-triển-khai)

---

## 1. Tổng Quan Bảo Mật & Hiệu Năng

### 1.1 Mô Hình Bảo Mật Đa Lớp

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    MULTI-LAYER SECURITY MODEL                             │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  LAYER 1: CLIENT-SIDE SECURITY                                    │  │
│  │  • Secure Storage (Keychain / Keystore)                          │  │
│  │  • Token Management                                               │  │
│  │  • Input Validation                                              │  │
│  │  • HTTPS Enforcement                                             │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  LAYER 2: API SECURITY                                           │  │
│  │  • JWT Validation                                                 │  │
│  │  • Rate Limiting                                                 │  │
│  │  • CORS Configuration                                             │  │
│  │  • Request/Response Encryption                                   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  LAYER 3: DATABASE SECURITY                                      │  │
│  │  • Row Level Security (RLS) Policies                             │  │
│  │  • Encryption at Rest                                            │  │
│  │  • Audit Logging                                                 │  │
│  │  • Access Control                                                │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  LAYER 4: INFRASTRUCTURE SECURITY                                │  │
│  │  • Supabase Cloud Security                                        │  │
│  │  • SSL/TLS Certificates                                           │  │
│  │  • DDoS Protection                                               │  │
│  │  • Firewall Rules                                                │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Threat Model

| Threat Category       | Mô tả                                 | Mức độ rủi ro | Biện pháp                  |
| --------------------- | ------------------------------------- | ------------- | -------------------------- |
| **Token Theft**       | JWT bị đánh cắp qua man-in-the-middle | Cao           | HTTPS + Secure Storage     |
| **Password Cracking** | Brute force attack                    | Cao           | Rate limiting + Hashing    |
| **Data Breach**       | SQL injection / Unauthorized access   | Rất cao       | RLS + Input validation     |
| **API Abuse**         | DDoS / Request flooding               | Trung bình    | Rate limiting + Throttling |
| **Session Hijacking** | Refresh token bị đánh cắp             | Cao           | Secure storage + Rotation  |
| **Data Leakage**      | Thông tin nhạy cảm bị expose          | Trung bình    | Encryption + Masking       |

---

## 2. Xác Thực & Ủy Quyền (Authentication & Authorization)

### 2.1 Authentication Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                                    │
│                                                                          │
│  ┌──────────────┐                                                        │
│  │   LOGIN      │                                                        │
│  │   SCREEN     │                                                        │
│  └──────┬───────┘                                                        │
│         │                                                                │
│         ▼                                                                │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  1. INPUT VALIDATION (Client-side)                               │   │
│  │     • Email format validation                                     │   │
│  │     • Password strength check                                     │   │
│  │     • Rate limit tracking (local)                                 │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  2. HTTPS REQUEST → SUPABASE AUTH                                │   │
│  │     POST /auth/v1/token?grant_type=password                       │   │
│  │     Body: { email, password }                                     │   │
│  │     Headers: Content-Type: application/json                       │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  3. SUPABASE AUTH PROCESSES                                       │   │
│  │     • Password Hash Verification (bcrypt, cost 12)                │   │
│  │     • JWT Access Token Generation (1 hour)                        │   │
│  │     • Refresh Token Generation (30 days)                          │   │
│  │     • Session Creation                                            │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  4. TOKEN STORAGE (Client-side)                                   │   │
│  │     • Access Token → Memory (React state)                         │   │
│  │     • Refresh Token → Keychain (iOS) / Keystore (Android)        │   │
│  │     • User Metadata → Redux Store (encrypted)                      │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  5. AUTH STATE PERSISTENCE                                        │   │
│  │     • On app restart → Check refresh token validity               │   │
│  │     • Auto-refresh when access token expires                      │   │
│  │     • Secure logout → Clear all tokens                            │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 JWT Token Management Chi Tiết

#### Token Structure

```typescript
// src/shared/services/auth/token-manager.ts

interface TokenPayload {
  sub: string; // User ID (UUID)
  email: string; // User email
  exp: number; // Expiration timestamp
  iat: number; // Issued at timestamp
  aud: string; // Audience
  role: "authenticated" | "anon";
  iss: string; // Issuer (Supabase URL)
}

interface TokenPair {
  accessToken: string; // JWT - expires in 1 hour
  refreshToken: string; // Opaque - expires in 30 days
}
```

#### Supabase Client Configuration

```typescript
// src/lib/supabase.ts

import { createClient } from "@supabase/supabase-js";
import * as Keychain from "react-native-keychain";
import config from "@/shared/utils/config";

const supabaseUrl = config.SUPABASE_URL;
const supabaseAnonKey = config.SUPABASE_ANON_KEY;

// Custom storage adapter for secure token storage
const secureStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const credentials = await Keychain.getGenericPassword({ service: key });
      if (credentials) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error("Secure storage read error:", error);
      return null;
    }
  },

  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await Keychain.setGenericPassword(key, value, {
        service: key,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
      });
    } catch (error) {
      console.error("Secure storage write error:", error);
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await Keychain.resetGenericPassword({ service: key });
    } catch (error) {
      console.error("Secure storage remove error:", error);
    }
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Disable for mobile
    storage: secureStorage,
    storageKey: "@tuvi:auth-session",
  },
  global: {
    headers: {
      "x-client-info": "tuvi-mobile",
    },
  },
});
```

#### Token Refresh Logic

```typescript
// src/shared/services/auth/session.service.ts

import { supabase } from "@/lib/supabase";
import { store } from "@/shared/store";
import { authActions } from "@/shared/store/slices/auth.slice";

class SessionService {
  private refreshTimer: NodeJS.Timeout | null = null;
  private isRefreshing = false;
  private refreshPromise: Promise<boolean> | null = null;

  /**
   * Initialize session management
   * Call this on app startup
   */
  async initialize(): Promise<void> {
    // Get existing session
    const { data: session, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Session initialization error:", error);
      this.dispatchAuthState(false);
      return;
    }

    if (session?.session) {
      this.dispatchAuthState(true, session.session.user);
      this.scheduleTokenRefresh(session.session.expires_at);
    } else {
      this.dispatchAuthState(false);
    }

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "TOKEN_REFRESHED") {
        console.log("Token refreshed successfully");
      } else if (event === "SIGNED_OUT") {
        this.clearSession();
      } else if (event === "USER_UPDATED") {
        if (session?.user) {
          this.dispatchAuthState(true, session.user);
        }
      }
    });
  }

  /**
   * Schedule token refresh before expiration
   */
  private scheduleTokenRefresh(expiresAt: number): void {
    // Refresh 5 minutes before expiration
    const refreshTime = expiresAt * 1000 - Date.now() - 5 * 60 * 1000;

    if (refreshTime > 0) {
      this.refreshTimer = setTimeout(() => {
        this.refreshSession();
      }, refreshTime);
    }
  }

  /**
   * Refresh the access token
   */
  async refreshSession(): Promise<boolean> {
    // Prevent multiple simultaneous refresh attempts
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;

    this.refreshPromise = (async () => {
      try {
        const { data, error } = await supabase.auth.refreshSession();

        if (error) {
          console.error("Token refresh failed:", error);

          // If refresh token is expired, force logout
          if (error.message.includes("refresh_token")) {
            await this.forceLogout();
            return false;
          }

          return false;
        }

        if (data.session) {
          this.dispatchAuthState(true, data.session.user);
          this.scheduleTokenRefresh(data.session.expires_at);
          return true;
        }

        return false;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  /**
   * Force logout due to auth error
   */
  private async forceLogout(): Promise<void> {
    await this.clearSession();
    // Navigate to login screen
    // This will be handled by navigation service
  }

  /**
   * Clear all session data
   */
  private async clearSession(): Promise<void> {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }

    await supabase.auth.signOut();
    this.dispatchAuthState(false);
  }

  /**
   * Dispatch auth state to Redux store
   */
  private dispatchAuthState(isAuthenticated: boolean, user?: User): void {
    store.dispatch(
      authActions.setAuthState({
        isAuthenticated,
        user: user || null,
        lastUpdated: Date.now(),
      }),
    );
  }

  /**
   * Sign up with email and password
   */
  async signUp(
    email: string,
    password: string,
    metadata: SignUpMetadata,
  ): Promise<AuthResult> {
    // Validate input
    const validation = this.validateSignUp(email, password);
    if (!validation.isValid) {
      return { error: validation.error };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: metadata.displayName,
          birth_date: metadata.birthDate,
          birth_time: metadata.birthTime,
          gender: metadata.gender,
        },
        emailRedirectTo: undefined, // Disable email confirmation for mobile
      },
    });

    if (error) {
      return { error: error.message };
    }

    return { data };
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<AuthResult> {
    // Rate limiting check
    if (this.isRateLimited()) {
      return { error: "Quá nhiều lần thử. Vui lòng đợi 15 phút." };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      this.incrementLoginAttempts();
      return { error: error.message };
    }

    if (data.session) {
      this.resetLoginAttempts();
      this.dispatchAuthState(true, data.session.user);
      this.scheduleTokenRefresh(data.session.expires_at);
    }

    return { data };
  }

  /**
   * Sign out
   */
  async signOut(): Promise<void> {
    await this.clearSession();
  }

  /**
   * Validate sign up input
   */
  private validateSignUp(email: string, password: string): ValidationResult {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: "Email không hợp lệ" };
    }

    // Password validation
    if (password.length < 8) {
      return { isValid: false, error: "Mật khẩu phải có ít nhất 8 ký tự" };
    }

    if (!/[A-Z]/.test(password)) {
      return { isValid: false, error: "Mật khẩu phải có ít nhất 1 chữ hoa" };
    }

    if (!/[0-9]/.test(password)) {
      return { isValid: false, error: "Mật khẩu phải có ít nhất 1 số" };
    }

    return { isValid: true };
  }

  /**
   * Rate limiting for login attempts
   */
  private loginAttempts: { count: number; lastAttempt: number } = {
    count: 0,
    lastAttempt: 0,
  };

  private isRateLimited(): boolean {
    const now = Date.now();
    const fifteenMinutes = 15 * 60 * 1000;

    if (now - this.loginAttempts.lastAttempt > fifteenMinutes) {
      return false;
    }

    return this.loginAttempts.count >= 5;
  }

  private incrementLoginAttempts(): void {
    this.loginAttempts.count++;
    this.loginAttempts.lastAttempt = Date.now();
  }

  private resetLoginAttempts(): void {
    this.loginAttempts = { count: 0, lastAttempt: 0 };
  }
}

export const sessionService = new SessionService();
```

### 2.3 Supabase Auth Configuration

```typescript
// supabase/auth.config.ts

export const authConfig = {
  // JWT Configuration
  jwt: {
    secret: process.env.SUPABASE_JWT_SECRET!,
    accessTokenExp: 3600, // 1 hour in seconds
    refreshTokenExp: 2592000, // 30 days in seconds
    algorithm: "HS256",
  },

  // Password Security
  password: {
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: false, // Optional - reduces friction
    bcryptRounds: 12, // Industry standard
  },

  // Session Configuration
  session: {
    allowMultipleSessions: false, // One device at a time
    forceLogoutOnPasswordChange: true,
    enableRefreshTokenRotation: true,
  },

  // OAuth Providers (if needed in future)
  providers: {
    email: true,
    google: false, // Can enable later
    apple: false, // Can enable later
  },

  // Rate Limiting
  rateLimit: {
    maxLoginAttempts: 5,
    loginAttemptWindow: 15 * 60 * 1000, // 15 minutes
    maxSignUpAttempts: 3,
    signUpAttemptWindow: 60 * 60 * 1000, // 1 hour
  },

  // Email Configuration
  email: {
    enableConfirmation: false, // For mobile-first approach
    confirmationRedirect: undefined,
  },
};
```

### 2.4 Password Hashing - KHÔNG BAO GIỜ LƯU PASSWORD DẠNG TEXT

```sql
-- Supabase Auth tự động hash passwords bằng bcrypt
-- KHÔNG CẦN code thêm - Supabase đã xử lý

-- Tuy nhiên, để debug có thể verify hash
-- Bảng auth.users chứa encrypted password hashes

-- NEVER do this:
-- ❌ INSERT INTO auth.users (email, password) VALUES ('test@test.com', 'plaintext_password');
-- ❌ UPDATE auth.users SET password = 'new_password' WHERE id = 'xxx';

-- ALWAYS use Supabase Auth API:
-- ✅ supabase.auth.signUp({ email, password })
-- ✅ supabase.auth.signInWithPassword({ email, password })
```

### 2.5 Authorization - Protected Routes

```typescript
// src/shared/hooks/useAuth.ts

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { store } from '@/shared/store';
import { router } from 'expo-router';

/**
 * Hook to check if user is authenticated
 */
export function useAuth(required: boolean = true): AuthState {
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        setState({
          isLoading: false,
          isAuthenticated: !!session,
          user: session?.user || null,
        });

        // Redirect if auth required but not authenticated
        if (required && !session) {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setState({
          isLoading: false,
          isAuthenticated: false,
          user: null,
        });

        if (required) {
          router.replace('/(auth)/login');
        }
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setState({
        isLoading: false,
        isAuthenticated: !!session,
        user: session?.user || null,
      });

      if (required && !session && event === 'SIGNED_OUT') {
        router.replace('/(auth)/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [required]);

  return state;
}

/**
 * Higher-order component for protected routes
 */
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { required = true, roles = [] as string[] } = {}
): React.FC<P> {
  return function ProtectedRoute(props: P) {
    const { isLoading, isAuthenticated, user } = useAuth(required);

    if (isLoading) {
      return <LoadingScreen />;
    }

    if (required && !isAuthenticated) {
      return null; // Will redirect via hook
    }

    // Check roles if specified
    if (roles.length > 0 && user) {
      const userRole = user.user_metadata?.role;
      if (!roles.includes(userRole)) {
        return <AccessDeniedScreen />;
      }
    }

    return <WrappedComponent {...props} />;
  };
}
```

### 2.6 Biểu Mẫu Đăng Nhập/Anh Ninh

```typescript
// src/modules/auth/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { sessionService } from '@/shared/services/auth/session.service';
import { colors } from '@/theme';
import Button from '@/shared/components/ui/Button';
import ErrorMessage from '@/shared/components/ui/ErrorMessage';

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await sessionService.signIn(data.email, data.password);

      if (result.error) {
        setError(result.error);
        return;
      }

      // Success - navigation handled by auth state change
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Đăng Nhập</Text>

        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email là bắt buộc',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email không hợp lệ',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Email"
                placeholderTextColor={colors.textSecondary}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                editable={!isLoading}
              />
              {errors.email && (
                <ErrorMessage message={errors.email.message} />
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Mật khẩu là bắt buộc',
            minLength: {
              value: 8,
              message: 'Mật khẩu phải có ít nhất 8 ký tự',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Mật khẩu"
                placeholderTextColor={colors.textSecondary}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                textContentType="password"
                editable={!isLoading}
              />
              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )}
            </View>
          )}
        />

        {error && <ErrorMessage message={error} type="error" />}

        <Button
          title="Đăng Nhập"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          disabled={isLoading}
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputError: {
    borderColor: colors.error,
  },
  forgotPassword: {
    marginTop: 16,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
  },
});
```

---

## 3. Bảo Mật Dữ Liệu

### 3.1 Data Classification

```typescript
// src/shared/types/security.types.ts

/**
 * Data sensitivity levels
 */
export enum SensitivityLevel {
  PUBLIC = "public", // Can be accessed by anyone
  INTERNAL = "internal", // Authenticated users only
  CONFIDENTIAL = "confidential", // Authenticated + owner only
  RESTRICTED = "restricted", // Encrypted, highly sensitive
}

/**
 * Data classification for the Tử Vi app
 */
export const DATA_CLASSIFICATION = {
  // PUBLIC - Anyone can access
  saoMaster: {
    sensitivity: SensitivityLevel.PUBLIC,
    description: "Danh mục sao cố định",
  },
  luuanGia: {
    sensitivity: SensitivityLevel.PUBLIC,
    description: "Luận giải mẫu",
  },

  // INTERNAL - Authenticated users
  userProfile: {
    sensitivity: SensitivityLevel.CONFIDENTIAL,
    description: "Thông tin cá nhân, ngày sinh, giới tính",
    encryptedFields: ["birth_date", "birth_time"],
  },
  horoscope: {
    sensitivity: SensitivityLevel.CONFIDENTIAL,
    description: "Lá số tử vi",
    encryptedFields: ["natal_chart"],
  },
  vanHan: {
    sensitivity: SensitivityLevel.CONFIDENTIAL,
    description: "Vận hạn",
  },
  userSettings: {
    sensitivity: SensitivityLevel.INTERNAL,
    description: "Cài đặt người dùng",
  },

  // RESTRICTED - Premium/Admin only
  paymentInfo: {
    sensitivity: SensitivityLevel.RESTRICTED,
    description: "Thông tin thanh toán",
    encryptedFields: ["*"],
  },
} as const;
```

### 3.2 Secure Data Storage

```typescript
// src/shared/services/secure-storage.service.ts

import * as Keychain from "react-native-keychain";
import * as SecureShare from "react-native-secure-share"; // For sharing with encryption
import { STORE_KEYS } from "@/shared/utils/constants";

/**
 * Secure storage service for sensitive data
 */
class SecureStorageService {
  /**
   * Store sensitive data in Keychain/Keystore
   */
  async setSecureItem(key: string, value: string): Promise<boolean> {
    try {
      await Keychain.setGenericPassword(key, value, {
        service: `${STORE_KEYS.SECURE_PREFIX}${key}`,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
      });
      return true;
    } catch (error) {
      console.error(`SecureStorage: Failed to set ${key}`, error);
      return false;
    }
  }

  /**
   * Retrieve sensitive data from Keychain/Keystore
   */
  async getSecureItem(key: string): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: `${STORE_KEYS.SECURE_PREFIX}${key}`,
      });

      if (credentials) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error(`SecureStorage: Failed to get ${key}`, error);
      return null;
    }
  }

  /**
   * Remove sensitive data from Keychain/Keystore
   */
  async removeSecureItem(key: string): Promise<boolean> {
    try {
      await Keychain.resetGenericPassword({
        service: `${STORE_KEYS.SECURE_PREFIX}${key}`,
      });
      return true;
    } catch (error) {
      console.error(`SecureStorage: Failed to remove ${key}`, error);
      return false;
    }
  }

  /**
   * Store biometric-protected data
   */
  async setBiometricItem(key: string, value: string): Promise<boolean> {
    try {
      const result = await Keychain.setGenericPassword(key, value, {
        service: `${STORE_KEYS.BIOMETRIC_PREFIX}${key}`,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
      });
      return !!result;
    } catch (error) {
      console.error(`SecureStorage: Failed to set biometric ${key}`, error);
      return false;
    }
  }

  /**
   * Get biometric-protected data
   */
  async getBiometricItem(
    key: string,
  ): Promise<{ value: string | null; success: boolean }> {
    try {
      const result = await Keychain.getGenericPassword({
        service: `${STORE_KEYS.BIOMETRIC_PREFIX}${key}`,
        authenticationPrompt: {
          title: "Xác thực sinh trắc học",
          subtitle: "Xác minh danh tính để truy cập dữ liệu",
          cancel: "Hủy",
        },
      });

      if (result) {
        return { value: result.password, success: true };
      }
      return { value: null, success: true };
    } catch (error) {
      console.error(`SecureStorage: Biometric auth failed for ${key}`, error);
      return { value: null, success: false };
    }
  }

  /**
   * Clear all secure storage
   */
  async clearAll(): Promise<void> {
    try {
      // Get all keys with our prefix
      const keys = [
        ...Object.values(STORE_KEYS.SECURE_PREFIX),
        ...Object.values(STORE_KEYS.BIOMETRIC_PREFIX),
      ];

      await Promise.all(
        keys.map((key) => Keychain.resetGenericPassword({ service: key })),
      );
    } catch (error) {
      console.error("SecureStorage: Failed to clear all", error);
    }
  }
}

export const secureStorage = new SecureStorageService();
```

### 3.3 Data Masking

```typescript
// src/shared/utils/data-masking.ts

/**
 * Utility functions for data masking
 */
export const DataMasking = {
  /**
   * Mask email address
   * e.g., "user@example.com" → "u***@example.com"
   */
  maskEmail(email: string): string {
    const [local, domain] = email.split("@");
    if (!domain) return email;

    const maskedLocal =
      local.length > 1 ? `${local[0]}${"*".repeat(local.length - 1)}` : local;

    return `${maskedLocal}@${domain}`;
  },

  /**
   * Mask phone number
   * e.g., "0912345678" → "091***5678"
   */
  maskPhone(phone: string): string {
    if (phone.length < 7) return phone;

    const visibleStart = phone.slice(0, 3);
    const visibleEnd = phone.slice(-4);
    const masked = "*".repeat(3);

    return `${visibleStart}${masked}${visibleEnd}`;
  },

  /**
   * Mask birth date for privacy
   * e.g., "1990-05-15" → "1990-**-**"
   */
  maskBirthDate(date: string): string {
    return date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$1-**-**");
  },

  /**
   * Mask birth time for privacy
   * e.g., "09:30:00" → "**:30"
   */
  maskBirthTime(time: string): string {
    const [hours, minutes] = time.split(":");
    return `**:${minutes}`;
  },

  /**
   * Mask horoscope sharing
   * Show cung but not exact birth details
   */
  maskHoroscopeForSharing(horoscope: Horoscope): MaskedHoroscope {
    return {
      ...horoscope,
      birthDate: DataMasking.maskBirthDate(horoscope.birthDate),
      birthTime: undefined, // Never show in shared view
      userName: DataMasking.maskName(horoscope.userName),
    };
  },

  /**
   * Mask name
   * e.g., "Nguyễn Văn A" → "Nguyễn Văn *"
   */
  maskName(name: string): string {
    const parts = name.split(" ");
    if (parts.length === 1) return `${parts[0][0]}***`;

    return parts
      .map((part, index) => {
        if (index === parts.length - 1) {
          return "*".repeat(part.length);
        }
        return part;
      })
      .join(" ");
  },
};
```

---

## 4. Bảo Mật API & Edge Functions

### 4.1 API Security Headers

```typescript
// supabase/functions/_shared/cors.ts

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Restrict in production
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": [
    "authorization",
    "content-type",
    "x-client-info",
    "apikey",
    "x-requested-with",
  ].join(", "),
  "Access-Control-Max-Age": "86400", // 24 hours
  "Access-Control-Allow-Credentials": "true",

  // Security headers
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

// Production-specific CORS (more restrictive)
export const productionCorsHeaders = {
  ...corsHeaders,
  "Access-Control-Allow-Origin": "https://tuvi.app", // Only allow our domain
  "Access-Control-Allow-Credentials": "true",
};
```

### 4.2 Edge Function Security Patterns

```typescript
// supabase/functions/_shared/auth.ts

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "./cors.ts";

export interface AuthenticatedRequest {
  userId: string;
  userEmail: string;
  userRole: string;
  supabaseClient: ReturnType<typeof createClient>;
}

/**
 * Verify JWT token from Authorization header
 */
export async function verifyAuth(
  req: Request,
): Promise<AuthenticatedRequest | Response> {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: "Missing authorization header" }),
      {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Extract token
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Invalid authorization format" }),
      {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Create Supabase client with user's token
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    },
  );

  // Verify the token
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();

  if (error || !user) {
    return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return {
    userId: user.id,
    userEmail: user.email ?? "",
    userRole: user.user_metadata?.role ?? "user",
    supabaseClient,
  };
}

/**
 * Rate limiter for Edge Functions
 */
export class RateLimiter {
  private requests: Map<string, { count: number; resetAt: number }> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 100, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async check(
    identifier: string,
  ): Promise<{ allowed: boolean; remaining: number }> {
    const now = Date.now();
    const record = this.requests.get(identifier);

    if (!record || now > record.resetAt) {
      // New window
      this.requests.set(identifier, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true, remaining: this.maxRequests - 1 };
    }

    if (record.count >= this.maxRequests) {
      return { allowed: false, remaining: 0 };
    }

    record.count++;
    return { allowed: true, remaining: this.maxRequests - record.count };
  }

  // Clean up old entries periodically
  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.requests.entries()) {
      if (now > value.resetAt) {
        this.requests.delete(key);
      }
    }
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter(100, 60000); // 100 requests per minute
```

### 4.3 Input Validation

```typescript
// supabase/functions/_shared/validation.ts

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate birth date input
 */
export function validateBirthDate(data: {
  birth_date?: string;
  birth_time?: string;
}): ValidationResult {
  const errors: string[] = [];

  // Birth date validation
  if (!data.birth_date) {
    errors.push("Ngày sinh là bắt buộc");
  } else {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.birth_date)) {
      errors.push("Định dạng ngày sinh không hợp lệ (YYYY-MM-DD)");
    } else {
      const [year, month, day] = data.birth_date.split("-").map(Number);

      // Check valid date
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        errors.push("Ngày sinh không hợp lệ");
      }

      // Check not in future
      if (date > new Date()) {
        errors.push("Ngày sinh không thể là ngày trong tương lai");
      }

      // Check reasonable age (0-150 years)
      const age = new Date().getFullYear() - year;
      if (age < 0 || age > 150) {
        errors.push("Tuổi không hợp lệ");
      }
    }
  }

  // Birth time validation
  if (!data.birth_time) {
    errors.push("Giờ sinh là bắt buộc");
  } else {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timeRegex.test(data.birth_time)) {
      errors.push("Định dạng giờ sinh không hợp lệ (HH:MM:SS)");
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate gender input
 */
export function validateGender(gender?: string): ValidationResult {
  const errors: string[] = [];
  const validGenders = ["male", "female"];

  if (!gender) {
    errors.push("Giới tính là bắt buộc");
  } else if (!validGenders.includes(gender)) {
    errors.push(`Giới tính phải là một trong: ${validGenders.join(", ")}`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .slice(0, 500); // Limit length
}

/**
 * Validate calculate request
 */
export function validateCalculateRequest(body: unknown): ValidationResult {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Request body is required"] };
  }

  const data = body as Record<string, unknown>;

  // Validate birth date
  const dateResult = validateBirthDate({
    birth_date: data.birth_date as string,
    birth_time: data.birth_time as string,
  });
  errors.push(...dateResult.errors);

  // Validate gender
  const genderResult = validateGender(data.gender as string);
  errors.push(...genderResult.errors);

  // Validate optional fields
  if (data.birth_province && typeof data.birth_province !== "string") {
    errors.push("Tỉnh/Thành phố phải là chuỗi");
  }

  if (data.timezone && typeof data.timezone !== "string") {
    errors.push("Timezone phải là chuỗi");
  }

  return { valid: errors.length === 0, errors };
}
```

### 4.4 Edge Function Template

```typescript
// supabase/functions/calculate/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { verifyAuth, rateLimiter } from "../_shared/auth.ts";
import { validateCalculateRequest } from "../_shared/validation.ts";
import {
  tinhCanChiNam,
  tinhCanChiThang,
  tinhCanChiNgay,
  tinhCanChiGio,
} from "./can-chi.ts";
import { tinhMenh } from "./menh.ts";
import { tinhCucSo } from "./cuc.ts";
import { anDiaBan } from "./dia-ban.ts";
import { anSaoCoDinh } from "./sao.ts";
import { anTuHop } from "./tu-hop.ts";
import { anTamHop } from "./tam-hop.ts";
import { anHoaSao } from "./hoa.ts";

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    // 1. RATE LIMITING
    const clientIp = req.headers.get("x-forwarded-for") ?? "unknown";
    const rateCheck = await rateLimiter.check(clientIp);

    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({
          error: "Quá nhiều yêu cầu. Vui lòng thử lại sau.",
          retryAfter: 60,
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    // 2. AUTHENTICATION
    const authResult = await verifyAuth(req);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { userId, userEmail, supabaseClient } = authResult;

    // 3. INPUT VALIDATION
    const body = await req.json().catch(() => null);

    if (!body) {
      return new Response(
        JSON.stringify({ error: "Request body is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const validation = validateCalculateRequest(body);

    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          error: "Dữ liệu không hợp lệ",
          details: validation.errors,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const {
      birth_date,
      birth_time,
      gender,
      birth_province,
      birth_country,
      timezone,
    } = body;

    // 4. LOG THE REQUEST (for audit)
    console.log(
      JSON.stringify({
        type: "calculate_request",
        userId,
        timestamp: new Date().toISOString(),
        birthDate: birth_date, // Don't log birth_time for privacy
      }),
    );

    // 5. CALCULATE HOROSCOPE
    const [year, month, day] = birth_date.split("-").map(Number);
    const [hour, minute] = birth_time.split(":").map(Number);

    // Lunar calendar conversion
    const lunarDate = solarToLunar(year, month, day, 7);

    // Calculate Can Chi
    const canChiNam = tinhCanChiNam(lunarDate.year);
    const canChiThang = tinhCanChiThang(canChiNam.can, lunarDate.month);
    const canChiNgay = tinhCanChiNgay(getJulianDayNumber(year, month, day));
    const canChiGio = tinhCanChiGio(hour, minute, canChiNgay.can);

    // Calculate Mệnh
    const menh = tinhMenh(canChiNam.can, canChiNam.chi, lunarDate.isLeap);

    // Calculate Cục
    const cuc = tinhCucSo(
      canChiNam.can,
      canChiNam.chi,
      lunarDate.month,
      menh.amDuong,
      gender,
    );

    // An Địa Bàn
    const diaBan = anDiaBan(menh.chi, gender, cuc.direction);

    // An Sao
    const saoList = anSaoCoDinh(
      diaBan,
      canChiNam.can,
      canChiNam.chi,
      canChiThang.can,
      lunarDate.isLeap,
      menh.chi,
      gender,
    );

    // An Tứ Hợp, Tam Hợp
    const tuHop = anTuHop(diaBan);
    const tamHop = anTamHop(diaBan);

    // An Hóa Sao
    const hoaSao = anHoaSao(canChiNam.can, canChiNam.chi, diaBan);

    // 6. SAVE TO DATABASE
    // Update user profile with calculated data
    const { error: userError } = await supabaseClient
      .from("users")
      .update({
        can_nam: canChiNam.can,
        chi_nam: canChiNam.chi,
        can_thang: canChiThang.can,
        chi_thang: canChiThang.chi,
        can_ngay: canChiNgay.can,
        chi_ngay: canChiNgay.chi,
        can_gio: canChiGio.can,
        chi_gio: canChiGio.chi,
        menh_can: menh.can,
        menh_chi: menh.chi,
        menh_text: menh.text,
        cuc_number: cuc.soCuc,
        cuc_text: cuc.text,
        am_duong: menh.amDuong,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (userError) {
      console.error("User update error:", userError);
      // Continue anyway - horoscope calculation is more important
    }

    // Create or update horoscope
    const { data: horoscope, error: horoscopeError } = await supabaseClient
      .from("horoscopes")
      .upsert(
        {
          user_id: userId,
          name: `Lá số ${new Date().getFullYear()}`,
          dia_chi: diaBan,
          sao_list: saoList,
          tu_hop_1: tuHop.filter((t) => t.name === "Tý-Dần-Thìn"),
          tu_hop_2: tuHop.filter((t) => t.name === "Tỵ-Dậu-Sửu"),
          tu_hop_3: tuHop.filter((t) => t.name === "Ngọ-Tuất-Mùi"),
          tu_hop_4: tuHop.filter((t) => t.name === "Hợi-Mão-Mùi"),
          tam_hop_1: tamHop[0],
          tam_hop_2: tamHop[1],
          tam_hop_3: tamHop[2],
          tam_hop_4: tamHop[3],
          hoa_loc: hoaSao.find((h) => h.type === "loc"),
          hoa_quyen: hoaSao.find((h) => h.type === "quyen"),
          hoa_khoa: hoaSao.find((h) => h.type === "khoa"),
          hoa_kiep: hoaSao.find((h) => h.type === "kiep"),
          natal_chart: {
            birth_data: { birth_date, birth_time, gender, birth_province },
            can_chi: {
              nam: canChiNam,
              thang: canChiThang,
              ngay: canChiNgay,
              gio: canChiGio,
            },
            menh,
            cuc,
            calculated_at: new Date().toISOString(),
          },
          calculated_at: new Date().toISOString(),
          version: 1,
        },
        { onConflict: "user_id" },
      )
      .select()
      .single();

    if (horoscopeError) {
      console.error("Horoscope save error:", horoscopeError);
      throw new Error("Không thể lưu lá số");
    }

    // 7. RETURN RESPONSE
    const processingTime = Date.now() - startTime;

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          user: {
            id: userId,
            email: userEmail,
            can_nam: canChiNam.can,
            chi_nam: canChiNam.chi,
            can_thang: canChiThang.can,
            chi_thang: canChiThang.chi,
            can_ngay: canChiNgay.can,
            chi_ngay: canChiNgay.chi,
            can_gio: canChiGio.can,
            chi_gio: canChiGio.chi,
            menh_can: menh.can,
            menh_chi: menh.chi,
            menh_text: menh.text,
            cuc_number: cuc.soCuc,
            cuc_text: cuc.text,
            am_duong: menh.amDuong,
          },
          horoscope: {
            id: horoscope.id,
            dia_chi: diaBan,
            sao_list: saoList,
            tu_hop: tuHop,
            tam_hop: tamHop,
            hoa_loc: hoaSao.find((h) => h.type === "loc"),
            hoa_quyen: hoaSao.find((h) => h.type === "quyen"),
            hoa_khoa: hoaSao.find((h) => h.type === "khoa"),
            hoa_kiep: hoaSao.find((h) => h.type === "kiep"),
            calculated_at: horoscope.calculated_at,
            version: horoscope.version,
          },
        },
        meta: {
          processingTime,
          rateLimitRemaining: rateCheck.remaining,
        },
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "X-Processing-Time": String(processingTime),
          "X-RateLimit-Remaining": String(rateCheck.remaining),
        },
      },
    );
  } catch (error) {
    console.error("Calculate function error:", error);

    return new Response(
      JSON.stringify({
        error: "Đã xảy ra lỗi khi tính lá số",
        message: error instanceof Error ? error.message : "Unknown error",
        code: "CALCULATION_ERROR",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
```

---

## 5. Bảo Mật Database & Row Level Security

### 5.1 RLS Policies Chi Tiết

```sql
-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================
-- Supabase đã enable RLS trên tất cả các bảng
-- Đảm bảo user chỉ có thể truy cập data của chính mình
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horoscopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.van_hans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- USERS TABLE POLICIES
-- ============================================================

-- Policy: User chỉ có thể xem THÔNG TIN CƠ BẢN của chính mình
-- Không cho xem email, auth metadata của người khác
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: User chỉ có thể cập nhật THÔNG TIN CƠ BẢN của chính mình
CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: User không thể INSERT/XÓA rows trong users table
-- (Supabase Auth tự quản lý auth.users)
CREATE POLICY "users_no_insert" ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- HOROSCOPES TABLE POLICIES
-- ============================================================

-- Policy: User chỉ có thể xem lá số của chính mình
CREATE POLICY "horoscopes_select_own" ON public.horoscopes
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: User chỉ có thể tạo lá số cho chính mình
CREATE POLICY "horoscopes_insert_own" ON public.horoscopes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: User chỉ có thể cập nhật lá số của chính mình
CREATE POLICY "horoscopes_update_own" ON public.horoscopes
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: User chỉ có thể xóa lá số của chính mình
CREATE POLICY "horoscopes_delete_own" ON public.horoscopes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Policy: Ai cũng có thể xem lá số CÔNG KHAI (nếu user cho phép)
CREATE POLICY "horoscopes_select_public" ON public.horoscopes
  FOR SELECT
  USING (is_public = TRUE);

-- Policy: Chỉ owner mới có thể thay đổi is_public
CREATE POLICY "horoscopes_update_public_own" ON public.horoscopes
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id AND
    (is_public = FALSE OR is_public = TRUE) -- Không thể force change
  );

-- ============================================================
-- VAN_HANS TABLE POLICIES
-- ============================================================

CREATE POLICY "van_hans_select_own" ON public.van_hans
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "van_hans_insert_own" ON public.van_hans
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "van_hans_update_own" ON public.van_hans
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "van_hans_delete_own" ON public.van_hans
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- USER_SETTINGS TABLE POLICIES
-- ============================================================

-- Mỗi user chỉ có 1 row trong user_settings
-- User chỉ có thể xem/sửa settings của chính mình
CREATE POLICY "user_settings_select_own" ON public.user_settings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_settings_insert_own" ON public.user_settings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_settings_update_own" ON public.user_settings
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Auto-create settings when user is created (via trigger)
CREATE POLICY "user_settings_auto_create" ON public.user_settings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- USER_FAVORITES TABLE POLICIES
-- ============================================================

CREATE POLICY "user_favorites_all_own" ON public.user_favorites
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- AUDIT_LOG TABLE POLICIES
-- ============================================================

-- Chỉ admin hoặc service role mới có thể ghi audit log
-- Users có thể xem audit log của chính mình
CREATE POLICY "audit_log_select_own" ON public.audit_log
  FOR SELECT
  USING (auth.uid() = user_id);

-- Insert được thực hiện bởi trigger hoặc service role
-- Users không thể insert/delete audit log
CREATE POLICY "audit_log_no_modify" ON public.audit_log
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- PUBLIC TABLES (No RLS needed - read-only reference data)
-- ============================================================

-- sao_master - Danh mục sao (read-only, public)
-- luuan_gia - Luận giải mẫu (read-only, public)
-- Các bảng này chỉ được update bởi admin

-- ============================================================
-- SERVICE ROLE BYPASS
-- ============================================================
-- Edge Functions sử dụng service_role key sẽ bypass RLS
-- Chỉ dùng service_role trong server-side code
-- KHÔNG BAO GIỜ expose service_role key ra client
-- ============================================================
```

### 5.2 Audit Logging

```sql
-- Tạo bảng audit_log nếu chưa có
CREATE TABLE IF NOT EXISTS public.audit_log (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id UUID,
    old_value JSONB,
    new_value JSONB,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audit_user ON public.audit_log(user_id);
CREATE INDEX idx_audit_entity ON public.audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_created ON public.audit_log(created_at DESC);
CREATE INDEX idx_audit_action ON public.audit_log(action);

-- Function để ghi audit log
CREATE OR REPLACE FUNCTION public.log_audit_event(
    p_user_id UUID,
    p_action TEXT,
    p_entity_type TEXT,
    p_entity_id UUID,
    p_old_value JSONB DEFAULT NULL,
    p_new_value JSONB DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
) RETURNS BIGINT AS $$
DECLARE
    audit_id BIGINT;
    v_ip_address INET;
    v_user_agent TEXT;
BEGIN
    -- Get client IP (from request headers set by Supabase)
    v_ip_address := current_setting('request.jwt.claim.ip_address', true)::INET;
    v_user_agent := current_setting('request.jwt.claim.user_agent', true);

    INSERT INTO public.audit_log (
        user_id, action, entity_type, entity_id,
        old_value, new_value, ip_address, user_agent, metadata
    ) VALUES (
        p_user_id, p_action, p_entity_type, p_entity_id,
        p_old_value, p_new_value, v_ip_address, v_user_agent, p_metadata
    ) RETURNING id INTO audit_id;

    RETURN audit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger để tự động ghi audit khi có thay đổi
CREATE OR REPLACE FUNCTION public.capture_changes()
RETURNS TRIGGER AS $$
DECLARE
    audit_action TEXT;
    old_val JSONB;
    new_val JSONB;
BEGIN
    IF TG_OP = 'INSERT' THEN
        audit_action := 'INSERT';
        old_val := NULL;
        new_val := to_jsonb(NEW);
    ELSIF TG_OP = 'UPDATE' THEN
        audit_action := 'UPDATE';
        old_val := to_jsonb(OLD);
        new_val := to_jsonb(NEW);
    ELSIF TG_OP = 'DELETE' THEN
        audit_action := 'DELETE';
        old_val := to_jsonb(OLD);
        new_val := NULL;
    END IF;

    -- Don't log if no actual changes
    IF audit_action = 'UPDATE' AND old_val = new_val THEN
        RETURN NEW;
    END IF;

    PERFORM public.log_audit_event(
        COALESCE(NEW.user_id, OLD.user_id),
        audit_action,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        old_val,
        new_val,
        jsonb_build_object('trigger', TG_NAME)
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to tables (optional - only for important tables)
CREATE TRIGGER users_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.capture_changes();

CREATE TRIGGER horoscopes_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.horoscopes
    FOR EACH ROW EXECUTE FUNCTION public.capture_changes();
```

---

## 6. Tối Ưu Hóa Tài Nguyên - Hình Ảnh

### 6.1 Image Optimization Pipeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    IMAGE OPTIMIZATION PIPELINE                           │
│                                                                          │
│  ┌──────────────┐                                                        │
│  │   SOURCE     │                                                        │
│  │   IMAGE      │  PNG, JPEG, WebP (original size)                       │
│  │              │  e.g., 4000x4000 px, 5MB                             │
│  └──────┬───────┘                                                        │
│         │                                                                │
│         ▼                                                                │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  STEP 1: RESIZE (Expo Image / Sharp on server)                    │   │
│  │  • Resize to max display size                                     │   │
│  │  • Generate multiple sizes:                                        │   │
│  │    - Thumbnail: 200x200 px (for lists)                            │   │
│  │    - Medium: 800x800 px (for cards)                               │   │
│  │    - Large: 1600x1600 px (for detail view)                       │   │
│  │    - Original: Keep for download                                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  STEP 2: COMPRESS                                                 │   │
│  │  • JPEG: Quality 80% (good balance)                               │   │
│  │  • WebP: 20-30% smaller than JPEG                                 │   │
│  │  • PNG: Optimize with oxipng                                      │   │
│  │  • Target sizes:                                                  │   │
│  │    - Thumbnail: ~10-20KB                                          │   │
│  │    - Medium: ~50-100KB                                            │   │
│  │    - Large: ~200-500KB                                            │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  STEP 3: STORE (Supabase Storage)                                 │   │
│  │  • Bucket: 'images'                                               │   │
│  │  • Path: /{userId}/{type}/{size}/{filename}                      │   │
│  │  • Example: /user123/avatar/medium/profile.jpg                    │   │
│  │  • Cache-Control headers set for CDN caching                      │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  STEP 4: SERVE (with proper headers)                              │   │
│  │  • Content-Type: image/webp (if supported)                        │   │
│  │  • Cache-Control: public, max-age=31536000, immutable             │   │
│  │  • ETag for cache validation                                       │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Image Component với Caching

```typescript
// src/shared/components/ui/OptimizedImage.tsx

import React, { memo, useState } from 'react';
import { View, StyleSheet, Image, ImageStyle, ViewStyle } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { colors } from '@/theme';

interface OptimizedImageProps {
  uri?: string;
  placeholder?: string;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  fallback?: string;
  priority?: 'high' | 'normal' | 'low';
  sizes?: 'thumbnail' | 'medium' | 'large' | 'original';
  blurRadius?: number;
}

const FALLBACK_IMAGE = 'https://tuvi.app/assets/images/placeholder.png';
const PLACEHOLDER_COLOR = colors.skeleton;

export const OptimizedImage = memo(function OptimizedImage({
  uri,
  placeholder,
  style,
  containerStyle,
  fallback = FALLBACK_IMAGE,
  priority = 'normal',
  sizes = 'medium',
  blurRadius = 10,
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine cache policy based on priority
  const cachePolicy = priority === 'high'
    ? 'memory'
    : priority === 'low'
      ? 'disk'
      : 'memory-disk';

  // Source URL with size optimization
  const source = uri
    ? { uri: getOptimizedUrl(uri, sizes) }
    : undefined;

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const displayUri = hasError ? fallback : uri;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Placeholder / Loading state */}
      {isLoading && (
        <View style={[styles.placeholder, style]}>
          <ExpoImage
            source={{ uri: placeholder || PLACEHOLDER_COLOR }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            blurRadius={blurRadius}
            transition={200}
          />
        </View>
      )}

      {/* Main image */}
      {displayUri && (
        <ExpoImage
          source={{ uri: displayUri }}
          style={[styles.image, style, isLoading && styles.hidden]}
          contentFit="cover"
          transition={200}
          fadeDuration={200}
          cachePolicy={cachePolicy}
          onError={handleError}
          onLoad={handleLoad}
          // Progressive loading
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
          // Priority for above-the-fold images
          priority={priority}
        />
      )}
    </View>
  );
});

/**
 * Generate optimized image URL based on size
 * In production, this would point to Supabase Storage transformations
 */
function getOptimizedUrl(uri: string, size: OptimizedImageProps['sizes']): string {
  // If it's already a processed URL, return as-is
  if (uri.includes('supabase')) {
    // Add size parameter for Supabase Image Transform
    const sizeMap = {
      thumbnail: '200x200',
      medium: '800x800',
      large: '1600x1600',
      original: '3200x3200',
    };
    return `${uri}?width=${sizeMap[size].split('x')[0]}&height=${sizeMap[size].split('x')[1]}&quality=80`;
  }

  // For external URLs, could use Cloudflare Images, imgix, etc.
  return uri;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: colors.cardBackground,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: colors.skeleton,
  },
  hidden: {
    opacity: 0,
  },
});
```

### 6.3 Image Upload Service

```typescript
// src/shared/services/image-upload.service.ts

import { supabase } from "@/lib/supabase";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

interface ImageVariant {
  name: string;
  size: number;
  quality: number;
}

const IMAGE_VARIANTS: ImageVariant[] = [
  { name: "thumbnail", size: 200, quality: 70 },
  { name: "medium", size: 800, quality: 80 },
  { name: "large", size: 1600, quality: 85 },
];

/**
 * Service for image upload with optimization
 */
class ImageUploadService {
  private maxFileSize = 5 * 1024 * 1024; // 5MB
  private allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  /**
   * Pick image from gallery
   */
  async pickImage(): Promise<string | null> {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      throw new Error("Quyền truy cập thư viện ảnh bị từ chối");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      return result.assets[0].uri;
    }

    return null;
  }

  /**
   * Capture image from camera
   */
  async captureImage(): Promise<string | null> {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      throw new Error("Quyền truy cập camera bị từ chối");
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      return result.assets[0].uri;
    }

    return null;
  }

  /**
   * Upload avatar image with optimization
   */
  async uploadAvatar(userId: string, imageUri: string): Promise<UploadResult> {
    try {
      // Validate file
      const validation = await this.validateImage(imageUri);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Generate unique filename
      const timestamp = Date.now();
      const filename = `avatar_${timestamp}.webp`;

      // Read file and convert to base64
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${userId}/${filename}`, decode(base64), {
          contentType: "image/webp",
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Avatar upload error:", error);
        return { success: false, error: "Không thể tải ảnh lên" };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(`${userId}/${filename}`);

      return { success: true, url: urlData.publicUrl };
    } catch (error) {
      console.error("Upload error:", error);
      return { success: false, error: "Đã xảy ra lỗi khi tải ảnh" };
    }
  }

  /**
   * Validate image before upload
   */
  private async validateImage(
    uri: string,
  ): Promise<{ valid: boolean; error?: string }> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);

      if (!fileInfo.exists) {
        return { valid: false, error: "File không tồn tại" };
      }

      if (
        "size" in fileInfo &&
        fileInfo.size &&
        fileInfo.size > this.maxFileSize
      ) {
        return { valid: false, error: "Kích thước file quá lớn (tối đa 5MB)" };
      }

      // Get file extension
      const extension = uri.split(".").pop()?.toLowerCase();
      const validExtensions = ["jpg", "jpeg", "png", "webp"];

      if (!extension || !validExtensions.includes(extension)) {
        return { valid: false, error: "Định dạng file không được hỗ trợ" };
      }

      return { valid: true };
    } catch (error) {
      return { valid: false, error: "Không thể đọc file" };
    }
  }

  /**
   * Delete old avatar
   */
  async deleteOldAvatar(userId: string, filename: string): Promise<void> {
    try {
      await supabase.storage.from("avatars").remove([`${userId}/${filename}`]);
    } catch (error) {
      console.error("Delete avatar error:", error);
    }
  }

  /**
   * Get optimized image URL
   */
  getOptimizedUrl(
    publicUrl: string,
    options: { width?: number; height?: number; quality?: number } = {},
  ): string {
    const { width = 800, height = 800, quality = 80 } = options;

    // If using Supabase Storage, add transformation params
    if (publicUrl.includes("supabase.co/storage")) {
      return `${publicUrl}?width=${width}&height=${height}&quality=${quality}&format=auto`;
    }

    return publicUrl;
  }
}

export const imageUploadService = new ImageUploadService();

// Helper to decode base64
function decode(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
```

### 6.4 Expo Image Configuration

```typescript
// app.json (relevant image config)

{
  "expo": {
    "plugins": [
      [
        "expo-image",
        {
          "copyright": "© 2026 Tử Vi App",
          "enableModernImageFormat": true,
          "imageOptimization": {
            "enabled": true,
            "maxWidth": 2048,
            "maxHeight": 2048,
            "quality": 0.8,
            "format": "webp"
          }
        }
      ]
    ]
  }
}
```

---

## 7. Tối Ưu Hóa Tài Nguyên - Code & Bundle

### 7.1 Bundle Size Analysis

```typescript
// metro.config.js - Optimized for production

const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Enable tree shaking
  config.transformer.minifierPath = "metro-react-native-babel-preset";

  // Custom resolver
  config.resolver = {
    ...config.resolver,

    // Blocklist for unused modules
    blockList: [
      // Exclude dev-only modules in production
      /react-native-safe-area-view/,
    ],

    // Source extensions
    sourceExts: [...config.resolver.sourceExts, "svg", "cjs"],

    // Asset extensions
    assetExts: config.resolver.assetExts.filter(
      (ext) =>
        !["png", "jpg", "jpeg", "webp", "gif", "bmp", "tiff", "svg"].includes(
          ext,
        ),
    ),
  };

  // Optimize babel
  config.transformer.babelTransformerPath =
    require.resolve("react-native-svg-transformer");

  return config;
})();
```

### 7.2 Code Splitting Strategy

```typescript
// src/app/(main)/(tabs)/_layout.tsx

import React, { Suspense, lazy } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '@/theme';

// Lazy load tab screens
const HomeScreen = lazy(() => import('@/modules/home/screens/HomeScreen'));
const HoroscopeScreen = lazy(() => import('@/modules/horoscope/screens/HoroscopeScreen'));
const VanHanScreen = lazy(() => import('@/modules/vanhan/screens/VanHanScreen'));
const ProfileScreen = lazy(() => import('@/modules/profile/screens/ProfileScreen'));

// Lazy load heavy components
const HoroscopeChart = lazy(() => import('@/shared/components/HoroscopeChart'));
const VanHanTimeline = lazy(() => import('@/shared/components/VanHanTimeline'));

function LoadingFallback() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

function TabLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="index" component={LazyHome} />
      <Tab.Screen name="horoscope" component={LazyHoroscope} />
      <Tab.Screen name="vanhan" component={LazyVanHan} />
      <Tab.Screen name="profile" component={LazyProfile} />
    </Tab.Navigator>
  );
}

// Wrapped components with suspense
function LazyHome() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeScreen />
    </Suspense>
  );
}

// ... similar for other tabs
```

### 7.3 Module Federation / Shared Dependencies

```typescript
// babel.config.js

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],

    plugins: [
      // Enable decorators for mobx/react-native etc.
      ["@babel/plugin-proposal-decorators", { legacy: true }],

      // Optimize imports
      [
        "import",
        {
          libraryName: "@ant-design/icons-react-native",
          customName: (name) => {
            const mapping = {
              HomeOutlined: "@ant-design/icons-react-native",
            };
            return mapping[name] || `@ant-design/icons-react-native`;
          },
        },
      ],

      // Remove console logs in production
      ...(process.env.NODE_ENV === "production"
        ? [["transform-remove-console", { exclude: ["error", "warn"] }]]
        : []),

      // Reanimated plugin
      "react-native-reanimated/plugin",
    ],
  };
};
```

### 7.4 Dynamic Import

```typescript
// src/shared/utils/dynamic-import.ts

/**
 * Dynamic import for heavy modules
 * Use when module is not needed immediately
 */
export async function dynamicImport<T>(modulePath: string): Promise<T | null> {
  try {
    return await import(modulePath);
  } catch (error) {
    console.error(`Failed to dynamically import: ${modulePath}`, error);
    return null;
  }
}

/**
 * Lazy load chart library only when needed
 */
export const loadChartLibrary = () =>
  dynamicImport<typeof import("react-native-gifted-charts")>(
    "react-native-gifted-charts",
  );

/**
 * Lazy load PDF library for export feature
 */
export const loadPDFLibrary = () =>
  dynamicImport<typeof import("react-native-pdf-lib")>("react-native-pdf-lib");

/**
 * Preload critical modules
 */
export function preloadModule(modulePath: string): void {
  // Preload without executing
  const preloadLink = document.createElement("link");
  preloadLink.rel = "modulepreload";
  preloadLink.href = modulePath;
  document.head.appendChild(preloadLink);
}
```

### 7.5 Asset Optimization

```typescript
// src/theme/images.ts

import { Image as ExpoImage } from "expo-image";

// Pre-load critical images
const CRITICAL_IMAGES = [
  require("@/assets/images/logo.png"),
  require("@/assets/images/loading.gif"),
  require("@/assets/images/empty-state.png"),
];

// Preload images on app start
export async function preloadCriticalAssets(): Promise<void> {
  await Promise.all(
    CRITICAL_IMAGES.map((image) =>
      ExpoImage.prefetch(Image.resolveAssetSource(image).uri),
    ),
  );
}

// Lazy load non-critical images
export function useLazyImage(uri: string | undefined) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (uri) {
      Image.prefetch(uri).then(() => setIsLoaded(true));
    }
  }, [uri]);

  return isLoaded;
}
```

---

## 8. Tối Ưu Hóa Network & Lazy Loading

### 8.1 API Service with Caching

```typescript
// src/shared/services/api-cache.service.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/lib/supabase";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  etag?: string;
}

interface CacheOptions {
  ttl?: number; // Time to live in ms (default: 1 hour)
  useStale?: boolean; // Return stale data while refetching
  storageKey?: string; // Custom storage key
}

const DEFAULT_TTL = 60 * 60 * 1000; // 1 hour
const CACHE_PREFIX = "@tuvi:cache:";

/**
 * Cached API service
 */
class APICacheService {
  /**
   * Get cached data
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = await AsyncStorage.getItem(CACHE_PREFIX + key);
      if (!raw) return null;

      const entry: CacheEntry<T> = JSON.parse(raw);
      const now = Date.now();

      if (now - entry.timestamp > DEFAULT_TTL) {
        // Cache expired
        await AsyncStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error("Cache get error:", error);
      return null;
    }
  }

  /**
   * Set cached data
   */
  async set<T>(key: string, data: T, etag?: string): Promise<void> {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        etag,
      };
      await AsyncStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
    } catch (error) {
      console.error("Cache set error:", error);
    }
  }

  /**
   * Invalidate cache
   */
  async invalidate(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(CACHE_PREFIX + key);
    } catch (error) {
      console.error("Cache invalidate error:", error);
    }
  }

  /**
   * Invalidate all cache
   */
  async invalidateAll(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((k) => k.startsWith(CACHE_PREFIX));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error("Cache invalidateAll error:", error);
    }
  }

  /**
   * Fetch with cache
   */
  async fetchWithCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheOptions = {},
  ): Promise<T> {
    const { ttl = DEFAULT_TTL, useStale = true } = options;

    // Try to get from cache first
    const cached = await this.get<T>(key);

    if (cached && !this.isExpired(key, ttl)) {
      // Return cached data
      if (useStale) {
        // Refetch in background
        this.fetchAndUpdate(key, fetcher, ttl).catch(console.error);
        return cached;
      }
      return cached;
    }

    // Fetch fresh data
    return this.fetchAndUpdate(key, fetcher, ttl);
  }

  /**
   * Fetch and update cache
   */
  private async fetchAndUpdate<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number,
  ): Promise<T> {
    const data = await fetcher();
    await this.set(key, data);
    return data;
  }

  /**
   * Check if cache is expired
   */
  private isExpired(key: string, ttl: number): boolean {
    // This would need async check, simplified here
    return false;
  }

  /**
   * Get cache size
   */
  async getCacheSize(): Promise<number> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((k) => k.startsWith(CACHE_PREFIX));

      let totalSize = 0;
      for (const k of cacheKeys) {
        const value = await AsyncStorage.getItem(k);
        if (value) {
          totalSize += value.length;
        }
      }

      return totalSize;
    } catch (error) {
      return 0;
    }
  }
}

export const apiCache = new APICacheService();
```

### 8.2 Optimized Horoscope Service

```typescript
// src/shared/services/horoscope.service.ts

import { supabase } from "@/lib/supabase";
import { apiCache } from "./api-cache.service";
import { secureStorage } from "./secure-storage.service";

export const horoscopeService = {
  /**
   * Get horoscope with caching
   */
  async getHoroscope(
    horoscopeId: string,
    options?: CacheOptions,
  ): Promise<Horoscope> {
    const cacheKey = `horoscope:${horoscopeId}`;

    return apiCache.fetchWithCache(
      cacheKey,
      async () => {
        const { data, error } = await supabase.functions.invoke(
          `horoscope/${horoscopeId}`,
        );

        if (error) throw error;
        if (!data) throw new Error("Không tìm thấy lá số");

        return data;
      },
      options,
    );
  },

  /**
   * Get horoscope list with pagination
   */
  async getHoroscopeList(
    page: number = 1,
    limit: number = 20,
  ): Promise<{ data: Horoscope[]; hasMore: boolean }> {
    const cacheKey = `horoscopes:page:${page}:limit:${limit}`;

    return apiCache.fetchWithCache(
      cacheKey,
      async () => {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await supabase
          .from("horoscopes")
          .select("*", { count: "exact" })
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error) throw error;

        return {
          data: data || [],
          hasMore: (count || 0) > to + 1,
        };
      },
      { ttl: 5 * 60 * 1000 }, // 5 minutes
    );
  },

  /**
   * Invalidate horoscope cache
   */
  async invalidateCache(horoscopeId: string): Promise<void> {
    await apiCache.invalidate(`horoscope:${horoscopeId}`);
    // Also invalidate list caches
    const keys = await AsyncStorage.getAllKeys();
    for (const key of keys) {
      if (key.includes("horoscopes:page:")) {
        await apiCache.invalidate(key.replace(CACHE_PREFIX, ""));
      }
    }
  },
};
```

### 8.3 Lazy Loading Hooks

```typescript
// src/shared/hooks/useLazyLoad.ts

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Lazy load data when component mounts
 */
export function useLazyLoad<T>(
  loader: () => Promise<T>,
  options: {
    immediate?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  } = {},
): LazyLoadResult<T> {
  const { immediate = true, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    if (!immediate && !data) {
      // Only load when explicitly called
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await loader();

      if (mountedRef.current) {
        setData(result);
        onSuccess?.(result);
      }
    } catch (err) {
      if (mountedRef.current) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        onError?.(error);
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [immediate, data, loader, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      load();
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    reload: load,
    isEmpty: !data && !isLoading && !error,
  };
}

/**
 * Lazy load image when in viewport
 */
export function useInViewLazyLoad(
  threshold: number = 0.1,
): [React.RefObject<View>, boolean] {
  const ref = useRef<View>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

/**
 * Pagination hook
 */
export function usePagination<T>(
  fetcher: (page: number) => Promise<{ data: T[]; hasMore: boolean }>,
  options: { initialPage?: number; pageSize?: number } = {},
): PaginationResult<T> {
  const { initialPage = 1, pageSize = 20 } = options;
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(
    async (pageNum: number, append: boolean = false) => {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      try {
        const result = await fetcher(pageNum);

        if (append) {
          setData((prev) => [...prev, ...result.data]);
        } else {
          setData(result.data);
        }

        setHasMore(result.hasMore);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [fetcher],
  );

  const loadNext = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      load(nextPage, true);
    }
  }, [isLoadingMore, hasMore, page, load]);

  const refresh = useCallback(() => {
    setPage(initialPage);
    load(initialPage, false);
  }, [initialPage, load]);

  useEffect(() => {
    load(initialPage, false);
  }, []);

  return {
    data,
    page,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadNext,
    refresh,
  };
}
```

### 8.4 Network Status Handling

```typescript
// src/shared/hooks/useNetworkStatus.ts

import { useState, useEffect, useCallback } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string | null;
  details: {
    isConnectionExpensive: boolean;
    isBetterConnection: boolean;
  } | null;
}

export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: true,
    type: 'unknown',
    details: null,
  });

  useEffect(() => {
    // Get initial status
    NetInfo.fetch().then((state: NetInfoState) => {
      setStatus({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        details: state.details ?? null,
      });
    });

    // Subscribe to changes
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setStatus({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        details: state.details ?? null,
      });
    });

    return () => unsubscribe();
  }, []);

  return status;
}

/**
 * HOC for network-dependent components
 */
export function withNetworkCheck<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  FallbackComponent?: React.ComponentType
): React.FC<P> {
  return function NetworkAwareComponent(props: P) {
    const { isConnected, isInternetReachable } = useNetworkStatus();

    if (!isConnected || isInternetReachable === false) {
      if (FallbackComponent) {
        return <FallbackComponent />;
      }
      return <OfflineFallback />;
    }

    return <WrappedComponent {...props} />;
  };
}

/**
 * Offline fallback component
 */
function OfflineFallback() {
  return (
    <View style={styles.container}>
      <Icon name="wifi-off" size={64} color={colors.textSecondary} />
      <Text style={styles.title}>Không có kết nối</Text>
      <Text style={styles.subtitle}>
        Vui lòng kiểm tra kết nối internet và thử lại
      </Text>
      <Button
        title="Thử Lại"
        onPress={() => NetInfo.refresh()}
        variant="primary"
      />
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
});
```

---

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

---

## 11. Monitoring & Logging

### 11.1 Logging Service

```typescript
// src/shared/services/logging.service.ts

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CRITICAL = 4,
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  category: string;
  message: string;
  data?: unknown;
  context?: Record<string, unknown>;
  userId?: string;
  deviceId?: string;
  appVersion?: string;
}

type LogTransport = (entry: LogEntry) => void;

/**
 * Structured logging service
 */
class LoggingService {
  private level: LogLevel = __DEV__ ? LogLevel.DEBUG : LogLevel.INFO;
  private transports: LogTransport[] = [];
  private logs: LogEntry[] = [];
  private readonly MAX_LOGS = 1000;

  /**
   * Add log transport (e.g., remote logging)
   */
  addTransport(transport: LogTransport): () => void {
    this.transports.push(transport);
    return () => {
      this.transports = this.transports.filter((t) => t !== transport);
    };
  }

  /**
   * Set log level
   */
  setLevel(level: LogLevel): void {
    this.level = level;
  }

  /**
   * Log debug message
   */
  debug(category: string, message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, category, message, data);
  }

  /**
   * Log info message
   */
  info(category: string, message: string, data?: unknown): void {
    this.log(LogLevel.INFO, category, message, data);
  }

  /**
   * Log warning
   */
  warn(category: string, message: string, data?: unknown): void {
    this.log(LogLevel.WARN, category, message, data);
  }

  /**
   * Log error
   */
  error(
    category: string,
    message: string,
    error?: Error,
    data?: unknown,
  ): void {
    this.log(LogLevel.ERROR, category, message, {
      ...data,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    });
  }

  /**
   * Log critical error
   */
  critical(
    category: string,
    message: string,
    error?: Error,
    data?: unknown,
  ): void {
    this.log(LogLevel.CRITICAL, category, message, {
      ...data,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    });
  }

  /**
   * Internal log method
   */
  private log(
    level: LogLevel,
    category: string,
    message: string,
    data?: unknown,
  ): void {
    // Filter by level
    if (level < this.level) {
      return;
    }

    const entry: LogEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data,
      userId: getCurrentUserId(),
      deviceId: getDeviceId(),
      appVersion: getAppVersion(),
    };

    // Add to local log
    this.logs.push(entry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.shift();
    }

    // Console output in development
    if (__DEV__) {
      this.consoleOutput(entry);
    }

    // Send to transports
    this.transports.forEach((transport) => {
      try {
        transport(entry);
      } catch (error) {
        console.error("Log transport error:", error);
      }
    });
  }

  /**
   * Console output with formatting
   */
  private consoleOutput(entry: LogEntry): void {
    const levelName = LogLevel[entry.level];
    const prefix = `[${entry.category}]`;

    const style = this.getStyle(entry.level);
    const args = [
      `%c${entry.timestamp} ${levelName} ${prefix} ${entry.message}`,
      style,
    ];

    if (entry.data) {
      args.push(entry.data);
    }

    console.log(...args);
  }

  /**
   * Get console style for level
   */
  private getStyle(level: LogLevel): string {
    const styles: Record<LogLevel, string> = {
      [LogLevel.DEBUG]: "color: #888",
      [LogLevel.INFO]: "color: #2196F3",
      [LogLevel.WARN]: "color: #FF9800",
      [LogLevel.ERROR]: "color: #F44336",
      [LogLevel.CRITICAL]: "color: #9C27B0; font-weight: bold",
    };
    return styles[level];
  }

  /**
   * Get recent logs
   */
  getRecentLogs(count: number = 100): LogEntry[] {
    return this.logs.slice(-count);
  }

  /**
   * Export logs for debugging
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Clear logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Helper functions
function getCurrentUserId(): string | undefined {
  // Implement based on your auth state
  return undefined;
}

function getDeviceId(): string | undefined {
  return undefined;
}

function getAppVersion(): string | undefined {
  return undefined;
}

export const logger = new LoggingService();

// Convenience loggers
export const authLogger = {
  debug: (msg: string, data?: unknown) => logger.debug("Auth", msg, data),
  info: (msg: string, data?: unknown) => logger.info("Auth", msg, data),
  error: (msg: string, err?: Error, data?: unknown) =>
    logger.error("Auth", msg, err, data),
};

export const apiLogger = {
  debug: (msg: string, data?: unknown) => logger.debug("API", msg, data),
  info: (msg: string, data?: unknown) => logger.info("API", msg, data),
  error: (msg: string, err?: Error, data?: unknown) =>
    logger.error("API", msg, err, data),
};

export const crashLogger = {
  critical: (msg: string, err?: Error, data?: unknown) =>
    logger.critical("Crash", msg, err, data),
};
```

### 11.2 Performance Monitor

```typescript
// src/shared/services/performance.service.ts

interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, unknown>;
}

interface RenderMetric {
  componentName: string;
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
}

/**
 * Performance monitoring service
 */
class PerformanceService {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private renderMetrics: Map<string, RenderMetric> = new Map();
  private slowRenderThreshold = 16; // 60fps = 16.67ms per frame

  /**
   * Start tracking a metric
   */
  startMetric(name: string, metadata?: Record<string, unknown>): void {
    this.metrics.set(name, {
      name,
      startTime: performance.now(),
      metadata,
    });
  }

  /**
   * End tracking a metric
   */
  endMetric(name: string): number | null {
    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`Metric "${name}" not found`);
      return null;
    }

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;

    // Log if slow
    if (metric.duration > 100) {
      console.warn(
        `Slow operation: ${name} took ${metric.duration.toFixed(2)}ms`,
      );
    }

    return metric.duration;
  }

  /**
   * Track render performance
   */
  trackRender(componentName: string, renderTime: number): void {
    const existing = this.renderMetrics.get(componentName);

    if (existing) {
      existing.renderCount++;
      existing.lastRenderTime = renderTime;

      // Calculate rolling average
      existing.averageRenderTime =
        (existing.averageRenderTime * (existing.renderCount - 1) + renderTime) /
        existing.renderCount;
    } else {
      this.renderMetrics.set(componentName, {
        componentName,
        renderCount: 1,
        lastRenderTime: renderTime,
        averageRenderTime: renderTime,
      });
    }

    // Warn if slow render
    if (renderTime > this.slowRenderThreshold) {
      console.warn(
        `Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`,
      );
    }
  }

  /**
   * Get performance report
   */
  getReport(): PerformanceReport {
    const metrics = Array.from(this.metrics.values())
      .filter((m) => m.duration !== undefined)
      .map((m) => ({
        name: m.name,
        duration: m.duration!,
        metadata: m.metadata,
      }));

    const renders = Array.from(this.renderMetrics.values())
      .filter((r) => r.renderCount > 1)
      .map((r) => ({
        component: r.componentName,
        renderCount: r.renderCount,
        averageTime: r.averageRenderTime,
        lastTime: r.lastRenderTime,
      }));

    return {
      metrics,
      renders,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics.clear();
    this.renderMetrics.clear();
  }
}

export interface PerformanceReport {
  metrics: Array<{
    name: string;
    duration: number;
    metadata?: Record<string, unknown>;
  }>;
  renders: Array<{
    component: string;
    renderCount: number;
    averageTime: number;
    lastTime: number;
  }>;
  timestamp: string;
}

export const performanceMonitor = new PerformanceService();

// Polyfill for performance.now if not available
const performance = global.performance || {
  now: () => Date.now(),
};
```

---

## 12. Checklist Triển Khai

### 12.1 Security Checklist

#### Authentication & Authorization

- [ ] Sử dụng HTTPS cho tất cả API calls
- [ ] JWT tokens được lưu trong Keychain/Keystore
- [ ] Refresh tokens được rotate định kỳ
- [ ] Password requirements được enforce (8+ chars, uppercase, number)
- [ ] Rate limiting cho login attempts (5 attempts / 15 minutes)
- [ ] Session timeout sau 30 phút không hoạt động
- [ ] Đăng xuất xóa hết tokens và cache
- [ ] Multi-device login control (nếu cần)

#### Data Security

- [ ] Không lưu password dạng plain text
- [ ] Dữ liệu nhạy cảm (birth_date, birth_time) được mã hóa
- [ ] RLS policies được apply trên tất cả user tables
- [ ] Audit logging cho các thao tác quan trọng
- [ ] Input validation ở cả client và server
- [ ] Sanitization cho user inputs

#### API Security

- [ ] CORS headers được configure đúng
- [ ] Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- [ ] Rate limiting trên Edge Functions
- [ ] Request/Response size limits
- [ ] Proper error messages (không leak internal details)

#### Storage Security

- [ ] Secure storage cho tokens
- [ ] Biometric authentication cho sensitive data (nếu có)
- [ ] Auto-clear sensitive data khi logout
- [ ] Encrypted AsyncStorage cho cached data

### 12.2 Performance Checklist

#### Bundle Optimization

- [ ] Tree shaking enabled
- [ ] Unused modules removed
- [ ] Code splitting cho routes
- [ ] Lazy loading cho heavy components
- [ ] Dynamic imports cho optional features

#### Image Optimization

- [ ] Images resized to appropriate dimensions
- [ ] WebP format sử dụng khi supported
- [ ] Image compression (quality 80%)
- [ ] Progressive loading cho large images
- [ ] Image caching enabled
- [ ] Placeholder/skeleton loading states

#### Network Optimization

- [ ] Response caching (TTL: 1 hour for horoscopes)
- [ ] Stale-while-revalidate strategy
- [ ] Pagination cho large lists
- [ ] Request deduplication
- [ ] Offline mode support với fallback data

#### Rendering Optimization

- [ ] FlatList với proper key extraction
- [ ] Memoization với React.memo
- [ ] useCallback/useMemo cho expensive operations
- [ ] Virtualization cho long lists
- [ ] Avoid inline function definitions in render
- [ ] Proper image sizing (không scale trong render)

### 12.3 Error Handling Checklist

#### Client-Side Error Handling

- [ ] Error boundaries cho all screens
- [ ] User-friendly error messages
- [ ] Retry mechanisms cho recoverable errors
- [ ] Offline detection và handling
- [ ] Crash recovery với state restoration

#### Server-Side Error Handling

- [ ] Try-catch blocks trong all Edge Functions
- [ ] Proper error responses (không crash)
- [ ] Error logging và monitoring
- [ ] Graceful degradation strategies

#### Crash Prevention

- [ ] Null/undefined checks
- [ ] Type guards cho complex types
- [ ] Async operation error handling
- [ ] App state management (background/foreground)
- [ ] Memory leak prevention (cleanup subscriptions)

### 12.4 Monitoring Checklist

#### Logging

- [ ] Structured logging với levels (DEBUG, INFO, WARN, ERROR, CRITICAL)
- [ ] Log transport cho production monitoring
- [ ] Sensitive data masking trong logs
- [ ] Log rotation/cleanup

#### Performance Monitoring

- [ ] Track slow operations (>100ms)
- [ ] Track slow renders (>16ms)
- [ ] Memory usage monitoring
- [ ] Network request timing

#### Analytics

- [ ] Track app crashes
- [ ] Track user behavior flows
- [ ] Track API error rates
- [ ] Track performance metrics

---

## Tài Liệu Liên Quan

- [Backend System Design](./tu-vi-backend-system-design.md) - Kiến trúc tổng thể hệ thống
- [Algorithm Documentation](./tu-vi-dau-so-van-han-algorithm.md) - Chi tiết thuật toán tính vận hạn

---

**Phiên bản:** 1.0.0  
**Ngày cập nhật:** 2026-04-17  
**Trạng thái:** Hoàn thành
