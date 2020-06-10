
/** Unwrap promise types to their awaited return values. */
type Await<T> = T extends { then(onfulfilled?: (value: infer U) => unknown): unknown; } ? U : T;

/** Rate limit information returned from the `limitBy` callback. */
type LimitGetter<T> = (result: T) => { 
  /** If true, the request hit the rate limit unexpectedly and failed. */
  wasRateLimited: boolean,
  /** The number of requests remaining until rate limiting. */
  remaining: number, 
  /** The epoch time at which the bucket should reset. */
  resetAt: number, 
  /** The epoch time at which the global limit should reset, if any. */
  globalReset?: number,
  /** The group bucket to link this specific bucket to, if any. */
  groupBucket?: string
}

/**
 * A simple request rate limiter.
 */
export class RateLimiter {
  private buckets: {[name:string]: { remaining: number, resetAt: number }} = {}
  private queue: {[bucket:string]: { callback: () => any, resolve: (res: any) => void, limitBy: LimitGetter<any> }[]} = {}
  private groupedBuckets: {[bucket:string]: string} = {}

  /**
   * Limit a request by the given bucket.
   * 
   * @param bucket The rate limit bucket to apply.
   * @param callback The function to call to make the request.
   * @param limitBy A callback to retrieve rate limiting information; will be passed the result of `callback`.
   */
  limit<T>(bucket: string, callback: () => T, limitBy: LimitGetter<Await<T>>): Promise<T> {
    return new Promise(resolve => {
      this.queue[bucket] ?? (this.queue[bucket] = [])
      this.queue[bucket].push({ callback, resolve, limitBy })
      this.flushQueue(bucket)
    })
  }

  /** Bucket-specific lock for `flushQueue`. */
  private queueLock: {[bucket:string]: number} = {}
  /** The epoch time at which the global rate limit resets. */
  private globalReset?: number

  /**
   * Flush queued requests from the given bucket.
   * Returns early if the given bucket is already being flushed.
   * @param bucket The bucket to flush.
   */
  private async flushQueue(bucket: string) {
    if(this.queueLock[bucket]) return
    this.queueLock[bucket] = +new Date

    this.buckets[bucket] ?? (this.buckets[bucket] = { remaining: 999, resetAt: +new Date })

    let queuedBucket = this.buckets[bucket]
    let groupedBucket = this.groupedBuckets[bucket] && this.buckets[this.groupedBuckets[bucket]]
    
    while(this.queue[bucket].length) {
      if(queuedBucket.remaining <= 0 && queuedBucket.resetAt > +new Date)
        await new Promise(r => setTimeout(r, queuedBucket.resetAt - +new Date + 2000))
      if(groupedBucket && groupedBucket.remaining <= 0 && groupedBucket.resetAt > +new Date)
        await new Promise(r => setTimeout(r, (groupedBucket as {resetAt:number}).resetAt - +new Date + 2000))
      if(this.globalReset) {
        await new Promise(r => setTimeout(r, this.globalReset! - +new Date + 2000))
        this.globalReset = 0
      }

      let queued = this.queue[bucket].shift(),
          result = await queued?.callback(),
          limits = queued?.limitBy(result)

      // Handle request failure and retry, or resolve the request's promise
      if(!limits?.wasRateLimited) {
        queued?.resolve(result)
      } else {
        if(!bucket.includes('reactions')) 
          console.log(`${bucket} is being rate limited!`)
        this.queue[bucket].push(queued!)
        queuedBucket.remaining = 0
      }

      // Update rate limits with information from limitBy
      queuedBucket.remaining = limits?.remaining ?? queuedBucket.remaining
      queuedBucket.resetAt = limits?.resetAt ?? queuedBucket.resetAt
      
      if(groupedBucket) {
        groupedBucket.remaining = limits?.remaining ?? groupedBucket.remaining
        groupedBucket.resetAt = limits?.resetAt ?? groupedBucket.resetAt
      }

      if(limits?.globalReset)
        this.globalReset = Math.max(limits.globalReset, this.globalReset ?? 0)
      if(limits?.groupBucket)
        this.groupedBuckets[bucket] = limits.groupBucket
    }

    delete this.queueLock[bucket]
  }
}
