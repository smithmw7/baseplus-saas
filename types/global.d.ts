// Global type declarations for third-party libraries

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void
    Sentry: {
      captureException: (error: Error, context?: Record<string, any>) => void
      captureMessage: (message: string, context?: Record<string, any>) => void
    }
  }
}

export {}
