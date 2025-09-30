interface RateLimitEntry {
  lastRequest: number;
  requestCount: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private readonly windowMs = 60000; // 1 minute
  private readonly maxRequests = 60;

  async checkLimit(apiName: string, customDelay?: number): Promise<void> {
    const now = Date.now();
    const entry = this.limits.get(apiName) || { lastRequest: 0, requestCount: 0 };

    // Reset counter if window has passed
    if (now - entry.lastRequest > this.windowMs) {
      entry.requestCount = 0;
    }

    // Check if we've exceeded the limit
    if (entry.requestCount >= this.maxRequests) {
      const waitTime = this.windowMs - (now - entry.lastRequest);
      throw new Error(`Rate limit exceeded for ${apiName}. Please wait ${Math.ceil(waitTime / 1000)} seconds.`);
    }

    // Apply custom delay if specified
    if (customDelay && now - entry.lastRequest < customDelay) {
      const waitTime = customDelay - (now - entry.lastRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    // Update the entry
    entry.lastRequest = Date.now();
    entry.requestCount++;
    this.limits.set(apiName, entry);
  }

  reset(apiName?: string): void {
    if (apiName) {
      this.limits.delete(apiName);
    } else {
      this.limits.clear();
    }
  }
}

export const rateLimiter = new RateLimiter();