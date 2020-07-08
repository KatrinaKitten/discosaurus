import { RateLimiter } from "../util/ratelimits.ts"
import { objectEntries } from '../util/functions.ts'

const apiBase = 'https://discord.com/api/'
const rateLimiter = new RateLimiter()

/**
 * Make a request to Discord's API.
 * This should almost never be called directly! Use generated methods for specific endpoints instead.
 * 
 * @param token The bot token to authenticate with.
 * @param method The HTTP method to use.
 * @param path The endpoint path in Discord's API, prefilled with any path parameters.
 * @param queryData Parameters to be serialized as a query string.
 * @param bodyData Parameters to be passed in the request body.
 */
export async function makeRequest(
  token: string, 
  method: 'get'|'post'|'put'|'patch'|'delete', 
  path: string, 
  bucket: string,
  queryData?: {[k:string]: any}, 
  bodyData?: object
) {
  let body = bodyData && JSON.stringify(bodyData)
  let url = apiBase+path+'?'+new URLSearchParams(objectEntries(queryData||{}).map(([k,v]) => [k,encodeURI(v.toString())])).toString()

  let resp = await rateLimiter.limit(bucket, () => fetch(url, {
    method: method.toUpperCase(),
    headers: {
      'Authorization': `Bot ${token.trim()}`,
      'Content-Type': 'application/json',
      'X-RateLimit-Precision': 'millisecond',
      'User-Agent': 'DiscordBot (discosaurus, 0.1.0)'
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

export * from '../generated/endpoints.ts'

/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
export function modifyGuildChannelPositions(
  token: string, 
  guild_id: string,
  positions: { id: string, position: number|null }[]
) {
  return makeRequest(
    token, 'patch', `/guilds/${guild_id}/channels`, `/guilds/${guild_id}/channels`, 
    undefined, 
    positions
  )
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions */
export function modifyGuildRolePositions(
  token: string, 
  guild_id: string,
  positions: { id: string, position: number|null }[]
) {
  return makeRequest(
    token, 'patch', `/guilds/${guild_id}/roles`, `/guilds/${guild_id}/roles`, 
    undefined, 
    positions
  )
}

import { default as bindToken } from '../generated/endpoints.ts'
export default function boundTo(token: string) { return {
  ...bindToken(token),
  /** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
  modifyGuildChannelPositions: modifyGuildChannelPositions.bind(null, token),
  /** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions */
  modifyGuildRolePositions: modifyGuildRolePositions.bind(null, token),
}}
