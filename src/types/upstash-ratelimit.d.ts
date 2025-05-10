declare module '@upstash/ratelimit' {
  export type Duration = string | number | [number, string];
  
  export class Ratelimit {
    constructor(options: {
      redis: any;
      limiter: any;
      analytics?: boolean;
      prefix?: string;
      ephemeralCache?: any;
    });
    
    limit(identifier: string): Promise<{
      success: boolean;
      limit: number;
      remaining: number;
      reset: number;
    }>;
    
    static slidingWindow(
      limit: number,
      window: Duration
    ): any;
    
    static tokenBucket(
      limit: number,
      refillRate: number,
      window: Duration
    ): any;
    
    static fixedWindow(
      limit: number,
      window: Duration
    ): any;
  }
} 