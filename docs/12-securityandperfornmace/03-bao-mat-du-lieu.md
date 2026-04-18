# 03. Bảo Mật Dữ Liệu

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
