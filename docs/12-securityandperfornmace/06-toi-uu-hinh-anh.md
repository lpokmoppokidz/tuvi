# 06. Tối Ưu Hình Ảnh

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
