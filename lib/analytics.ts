import { Analytics } from '@vercel/analytics/react'

// Analytics configuration
export const analytics = {
  // Track page views
  trackPageView: (url: string, title?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        page_location: url,
        page_title: title,
      })
    }
  },

  // Track custom events
  trackEvent: (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      })
    }
  },

  // Track user signup
  trackSignup: (method: string) => {
    analytics.trackEvent('sign_up', 'engagement', method)
  },

  // Track subscription events
  trackSubscription: (plan: string, action: 'started' | 'cancelled' | 'upgraded' | 'downgraded') => {
    analytics.trackEvent(action, 'subscription', plan)
  },

  // Track feature usage
  trackFeatureUsage: (feature: string) => {
    analytics.trackEvent('feature_used', 'engagement', feature)
  },
}

// Performance monitoring
export const performance = {
  // Measure page load time
  measurePageLoad: () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart
        
        analytics.trackEvent('page_load_time', 'performance', 'page_load', Math.round(loadTime))
      })
    }
  },

  // Measure API response time
  measureApiResponse: (endpoint: string, duration: number) => {
    analytics.trackEvent('api_response_time', 'performance', endpoint, Math.round(duration))
  },
}

// Error tracking
export const errorTracking = {
  // Track JavaScript errors
  trackError: (error: Error, context?: Record<string, any>) => {
    console.error('Error tracked:', error, context)
    
    analytics.trackEvent('error', 'error', error.message, 1)
    
    // Send to Sentry if configured
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        extra: context,
      })
    }
  },

  // Track API errors
  trackApiError: (endpoint: string, status: number, message: string) => {
    analytics.trackEvent('api_error', 'error', `${endpoint}_${status}`, 1)
    
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureMessage(`API Error: ${endpoint} - ${status}`, {
        level: 'error',
        extra: { endpoint, status, message },
      })
    }
  },
}

// User behavior tracking
export const userBehavior = {
  // Track button clicks
  trackClick: (buttonId: string, page: string) => {
    analytics.trackEvent('click', 'engagement', buttonId, 1)
  },

  // Track form submissions
  trackFormSubmit: (formName: string, success: boolean) => {
    analytics.trackEvent('form_submit', 'engagement', formName, success ? 1 : 0)
  },

  // Track search queries
  trackSearch: (query: string, results: number) => {
    analytics.trackEvent('search', 'engagement', query, results)
  },
}

// Export Vercel Analytics component
export { Analytics }
