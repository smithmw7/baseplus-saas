// Cursor Integration for Self-Debugging
// This module provides utilities for Cursor to monitor and debug the application

export interface DebugInfo {
  timestamp: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  context?: Record<string, any>
  stack?: string
  userId?: string
  sessionId?: string
  url?: string
}

export interface PerformanceMetric {
  name: string
  duration: number
  timestamp: string
  metadata?: Record<string, any>
}

class CursorDebugger {
  private logs: DebugInfo[] = []
  private metrics: PerformanceMetric[] = []
  private maxLogs = 1000
  private maxMetrics = 500

  // Log a debug message
  log(level: DebugInfo['level'], message: string, context?: Record<string, any>) {
    const debugInfo: DebugInfo = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    }

    this.logs.push(debugInfo)
    
    // Keep only the latest logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    // Send to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Cursor Debug] ${level.toUpperCase()}:`, message, context)
    }

    // Send to external monitoring if configured
    this.sendToMonitoring(debugInfo)
  }

  // Track performance metrics
  trackPerformance(name: string, duration: number, metadata?: Record<string, any>) {
    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: new Date().toISOString(),
      metadata,
    }

    this.metrics.push(metric)
    
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics)
    }
  }

  // Get recent logs for Cursor to analyze
  getRecentLogs(limit: number = 50): DebugInfo[] {
    return this.logs.slice(-limit)
  }

  // Get performance metrics
  getPerformanceMetrics(limit: number = 50): PerformanceMetric[] {
    return this.metrics.slice(-limit)
  }

  // Get error summary for Cursor
  getErrorSummary(): {
    totalErrors: number
    recentErrors: DebugInfo[]
    errorTypes: Record<string, number>
  } {
    const errors = this.logs.filter(log => log.level === 'error')
    const errorTypes: Record<string, number> = {}
    
    errors.forEach(error => {
      const type = error.message.split(':')[0] || 'Unknown'
      errorTypes[type] = (errorTypes[type] || 0) + 1
    })

    return {
      totalErrors: errors.length,
      recentErrors: errors.slice(-10),
      errorTypes,
    }
  }

  // Send debug info to external monitoring
  private async sendToMonitoring(debugInfo: DebugInfo) {
    // Send to your monitoring service (e.g., Sentry, LogRocket, etc.)
    if (process.env.CURSOR_DEBUG_WEBHOOK) {
      try {
        await fetch(process.env.CURSOR_DEBUG_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(debugInfo),
        })
      } catch (error) {
        console.error('Failed to send debug info to monitoring:', error)
      }
    }
  }

  // Generate debug report for Cursor
  generateDebugReport(): string {
    const errorSummary = this.getErrorSummary()
    const recentLogs = this.getRecentLogs(10)
    const recentMetrics = this.getPerformanceMetrics(10)

    return `
# Cursor Debug Report

## Error Summary
- Total Errors: ${errorSummary.totalErrors}
- Error Types: ${JSON.stringify(errorSummary.errorTypes, null, 2)}

## Recent Errors
${errorSummary.recentErrors.map(error => 
  `- ${error.timestamp}: ${error.message}`
).join('\n')}

## Recent Logs
${recentLogs.map(log => 
  `- [${log.level.toUpperCase()}] ${log.timestamp}: ${log.message}`
).join('\n')}

## Performance Metrics
${recentMetrics.map(metric => 
  `- ${metric.name}: ${metric.duration}ms`
).join('\n')}
    `.trim()
  }
}

// Global instance
export const cursorDebugger = new CursorDebugger()

// Convenience methods
export const debug = {
  info: (message: string, context?: Record<string, any>) => 
    cursorDebugger.log('info', message, context),
  
  warn: (message: string, context?: Record<string, any>) => 
    cursorDebugger.log('warn', message, context),
  
  error: (message: string, context?: Record<string, any>) => 
    cursorDebugger.log('error', message, context),
  
  debug: (message: string, context?: Record<string, any>) => 
    cursorDebugger.log('debug', message, context),
  
  performance: (name: string, duration: number, metadata?: Record<string, any>) =>
    cursorDebugger.trackPerformance(name, duration, metadata),
  
  getReport: () => cursorDebugger.generateDebugReport(),
  
  getErrors: () => cursorDebugger.getErrorSummary(),
  
  getLogs: (limit?: number) => cursorDebugger.getRecentLogs(limit),
}

// Global error handler for Cursor monitoring
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    debug.error('Unhandled JavaScript Error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    debug.error('Unhandled Promise Rejection', {
      reason: event.reason,
      stack: event.reason?.stack,
    })
  })
}
