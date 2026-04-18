# 10. Monitoring & Logging

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
