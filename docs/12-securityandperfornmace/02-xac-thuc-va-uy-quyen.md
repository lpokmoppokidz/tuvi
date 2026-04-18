# 02. Xác Thực & Ủy Quyền

## 2. Xác Thực & Ủy Quyền (Authentication & Authorization)

### 2.1 Authentication Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                                    │
│                                                                          │
│  ┌──────────────┐                                                        │
│  │   LOGIN      │                                                        │
│  │   SCREEN     │                                                        │
└──────┬───────┘                                                        │
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
