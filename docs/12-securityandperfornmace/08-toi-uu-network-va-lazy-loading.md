# 08. Tối Ưu Network & Lazy Loading

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
