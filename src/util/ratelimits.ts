
type Await<T> = T extends { then(onfulfilled?: (value: infer U) => unknown): unknown; } ? U : T;
type LimitGetter<T> = (result: T) => { 
  wasRateLimited: boolean,
  remaining: number, 
  resetAt: number, 
  globalReset?: number,
  groupBucket?: string
}

export class RateLimiter {
  private buckets: {[name:string]: { remaining: number, resetAt: number }} = {}
  private queue: {[bucket:string]: { callback: () => any, resolve: (res: any) => void, limitBy: LimitGetter<any> }[]} = {}
  private groupedBuckets: {[bucket:string]: string} = {}

  limit<T>(bucket: string, callback: () => T, limitBy: LimitGetter<Await<T>>): Promise<T> {
    return new Promise(resolve => {
      this.queue[bucket] ?? (this.queue[bucket] = [])
      this.queue[bucket].push({ callback, resolve, limitBy })
      this.flushQueue(bucket)
    })
  }

  private queueLock: {[bucket:string]: number} = {}
  private globalReset?: number

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

      if(!limits?.wasRateLimited) {
        queued?.resolve(result)
      } else {
        console.log(`${bucket} is being rate limited!`)
        this.queue[bucket].push(queued!)
        queuedBucket.remaining = 0
      }

      queuedBucket.remaining = limits?.remaining ?? queuedBucket.remaining
      queuedBucket.resetAt = limits?.resetAt ?? queuedBucket.resetAt

      if(limits?.globalReset)
        this.globalReset = Math.max(limits.globalReset, this.globalReset ?? 0)
      if(limits?.groupBucket)
        this.groupedBuckets[bucket] = limits.groupBucket
    }

    delete this.queueLock[bucket]
  }
}
