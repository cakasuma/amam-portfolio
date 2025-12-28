// Simple in-memory rate limiter for API endpoints
// Protects against DDoS and spam attacks

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(maxRequests: number = 5, windowMinutes: number = 15) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMinutes * 60 * 1000;
    
    // Clean up old entries every 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Check if a request should be allowed
   * @param identifier - Usually an IP address or user identifier
   * @returns true if request is allowed, false if rate limit exceeded
   */
  public checkLimit(identifier: string): { allowed: boolean; resetTime?: number; remaining?: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    // No previous requests or window expired
    if (!entry || now > entry.resetTime) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return { allowed: true, remaining: this.maxRequests - 1 };
    }

    // Within rate limit
    if (entry.count < this.maxRequests) {
      entry.count++;
      return { allowed: true, remaining: this.maxRequests - entry.count };
    }

    // Rate limit exceeded
    return { 
      allowed: false, 
      resetTime: entry.resetTime,
      remaining: 0 
    };
  }

  /**
   * Clean up expired entries to prevent memory leaks
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  /**
   * Clear all rate limit data (useful for testing)
   */
  public clear(): void {
    this.requests.clear();
  }

  /**
   * Stop the cleanup interval
   */
  public destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

// Create a singleton instance
// 5 requests per 15 minutes per IP
const contactRateLimiter = new RateLimiter(5, 15);

export { contactRateLimiter, RateLimiter };
