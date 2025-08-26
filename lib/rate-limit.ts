import { Ratelimit } from '@upstash/ratelimit'
import { redis } from './redis'

// Create rate limiters for different endpoints
export const rateLimiters = {
  // General API rate limit: 10 requests per 10 seconds
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '10 s'),
    analytics: true,
    prefix: 'ratelimit:api',
  }),

  // Auth endpoints: 5 requests per minute
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    analytics: true,
    prefix: 'ratelimit:auth',
  }),

  // Stripe webhooks: 100 requests per minute
  webhook: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'),
    analytics: true,
    prefix: 'ratelimit:webhook',
  }),
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export async function checkRateLimit(
  identifier: string,
  type: keyof typeof rateLimiters = 'api'
): Promise<RateLimitResult> {
  const limiter = rateLimiters[type]
  const result = await limiter.limit(identifier)
  
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  }
}

// Middleware for Next.js API routes
export function withRateLimit(
  handler: Function,
  type: keyof typeof rateLimiters = 'api'
) {
  return async (req: any, res: any) => {
    // Get identifier (IP address or user ID)
    const identifier = req.headers['x-forwarded-for'] || 
                      req.connection.remoteAddress || 
                      'unknown'
    
    const rateLimitResult = await checkRateLimit(identifier, type)
    
    if (!rateLimitResult.success) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: rateLimitResult.reset,
      })
    }
    
    // Add rate limit headers
    res.setHeader('X-RateLimit-Limit', rateLimitResult.limit)
    res.setHeader('X-RateLimit-Remaining', rateLimitResult.remaining)
    res.setHeader('X-RateLimit-Reset', rateLimitResult.reset)
    
    return handler(req, res)
  }
}
