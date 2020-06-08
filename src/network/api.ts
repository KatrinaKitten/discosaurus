import { RateLimiter } from "../util/ratelimits.ts"
import { objectEntries } from '../util/functions.ts'

const apiBase = 'https://discord.com/api/'
const rateLimiter = new RateLimiter()

export async function makeRequest(
  token: string, 
  method: 'get'|'post'|'put'|'patch'|'delete', 
  path: string, 
  queryData?: {[k:string]: any}, 
  bodyData?: object
) {
  let url = apiBase+path
  let body = bodyData && JSON.stringify(bodyData)
  url += '?'+new URLSearchParams(objectEntries(queryData||{}).map(([k,v]) => [k,encodeURI(v.toString())])).toString()

  let resp = await rateLimiter.limit(path, () => fetch(url, {
    method: method.toUpperCase(),
    headers: {
      'Authorization': `Bot ${token.trim()}`,
      'Content-Type': 'application/json',
      'X-RateLimit-Precision': 'millisecond'
    },
    body: body
  }), resp => ({
    wasRateLimited: resp.status === 429,
    remaining: +resp.headers.get('X-RateLimit-Remaining')!,
    resetAt: +resp.headers.get('X-RateLimit-Reset')!*1000,
    globalReset: !!resp.headers.get('X-RateLimit-Global') ? +new Date + +resp.headers.get('Retry-After')!*1000 : undefined,
    groupBucket: resp.headers.get('X-RateLimit-Bucket') ?? undefined
  }))

  if(!resp.ok) throw `HTTP Error ${resp.status}: ${resp.statusText}\n${resp.url}`
  return resp
}
