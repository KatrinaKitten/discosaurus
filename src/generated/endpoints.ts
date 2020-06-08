import { makeRequest } from '../network/api.ts'
import { Channel } from '../types/channels.ts'
import { Embed } from '../types/messages.ts'
import { PermissionOverwrite } from '../types/permissions.ts'
import { Role } from '../types/roles.ts'

/// SECTION: Enums
export enum AuditLogEvent {
  GUILD_UPDATE = 1,
  CHANNEL_CREATE = 10,
  CHANNEL_UPDATE = 11,
  CHANNEL_DELETE = 12,
  CHANNEL_OVERWRITE_CREATE = 13,
  CHANNEL_OVERWRITE_UPDATE = 14,
  CHANNEL_OVERWRITE_DELETE = 15,
  MEMBER_KICK = 20,
  MEMBER_PRUNE = 21,
  MEMBER_BAN_ADD = 22,
  MEMBER_BAN_REMOVE = 23,
  MEMBER_UPDATE = 24,
  MEMBER_ROLE_UPDATE = 25,
  MEMBER_MOVE = 26,
  MEMBER_DISCONNECT = 27,
  BOT_ADD = 28,
  ROLE_CREATE = 30,
  ROLE_UPDATE = 31,
  ROLE_DELETE = 32,
  INVITE_CREATE = 40,
  INVITE_UPDATE = 41,
  INVITE_DELETE = 42,
  WEBHOOK_CREATE = 50,
  WEBHOOK_UPDATE = 51,
  WEBHOOK_DELETE = 52,
  EMOJI_CREATE = 60,
  EMOJI_UPDATE = 61,
  EMOJI_DELETE = 62,
  MESSAGE_DELETE = 72,
  MESSAGE_BULK_DELETE = 73,
  MESSAGE_PIN = 74,
  MESSAGE_UNPIN = 75,
  INTEGRATION_CREATE = 80,
  INTEGRATION_UPDATE = 81,
  INTEGRATION_DELETE = 82
}

export enum ChannelType { GUILD_TEXT, DM, GUILD_VOICE, GROUP_DM, GUILD_CATEGORY, GUILD_NEWS, GUILD_STORE }
export enum ExplicitContentFilter { DISABLED, MEMBERS_WITHOUT_ROLES, ALL_MEMBERS }
export enum MessageNotificationLevel { ALL_MESSAGES, ONLY_MENTIONS }
export enum VerificationLevel { NONE, LOW, MEDIUM, HIGH, VERY_HIGH }

/// SECTION: Endpoints
export function getGuildAuditLog(
  token: string,
  guild_id: string,
  user_id: string|undefined = undefined,
  action_type: AuditLogEvent|undefined = undefined
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/audit-logs`,
    {user_id,action_type},
    undefined
  )
}

export function getChannel(
  token: string,
  channel_id: string
) {
  return makeRequest(
    token, 'get', `/channels/${channel_id}`,
    undefined,
    undefined
  )
}

export function modifyChannel(
  token: string,
  channel_id: string,
  name: string,
  type: ChannelType,
  position: number|null = null,
  topic: string|null = null,
  nsfw: boolean|null = null,
  rate_limit_per_user: number|null = null,
  bitrate: number|null = null,
  user_limit: number|null = null,
  permission_overwrites: PermissionOverwrite[]|null = null,
  parent_id: string|null = null
) {
  return makeRequest(
    token, 'patch', `/channels/${channel_id}`,
    undefined,
    {name,type,position,topic,nsfw,rate_limit_per_user,bitrate,user_limit,permission_overwrites,parent_id}
  )
}

export function deleteChannel(
  token: string,
  channel_id: string
) {
  return makeRequest(
    token, 'delete', `/channels/${channel_id}`,
    undefined,
    undefined
  )
}

export function getChannelMessages(
  token: string,
  channel_id: string,
  around: string|undefined = undefined,
  before: string|undefined = undefined,
  after: string|undefined = undefined,
  limit: number|undefined = undefined
) {
  return makeRequest(
    token, 'get', `/channels/${channel_id}/messages`,
    {around,before,after,limit},
    undefined
  )
}

export function getChannelMessage(
  token: string,
  channel_id: string,
  message_id: string
) {
  return makeRequest(
    token, 'get', `/channels/${channel_id}/messages/${message_id}`,
    undefined,
    undefined
  )
}

export function createMessage(
  token: string,
  channel_id: string,
  content: string,
  nonce: string|number|undefined = undefined,
  tts: boolean = false,
  embed: Embed|undefined = undefined,
  allowed_mentions: { parse?: ('roles'|'users'|'everyone')[], users?: string[], roles?: string[] }|undefined = undefined
) {
  return makeRequest(
    token, 'post', `/channels/${channel_id}/messages`,
    undefined,
    {content,nonce,tts,embed,allowed_mentions}
  )
}

export function createReaction(
  token: string,
  channel_id: string,
  message_id: string,
  emoji: string
) {
  return makeRequest(
    token, 'put', `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`,
    undefined,
    undefined
  )
}

export function deleteOwnReaction(
  token: string,
  channel_id: string,
  message_id: string,
  emoji: string
) {
  return makeRequest(
    token, 'delete', `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`,
    undefined,
    undefined
  )
}

export function deleteUserReaction(
  token: string,
  channel_id: string,
  message_id: string,
  emoji: string,
  user_id: string
) {
  return makeRequest(
    token, 'delete', `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/${user_id}`,
    undefined,
    undefined
  )
}

export function getReactions(
  token: string,
  channel_id: string,
  message_id: string,
  emoji: string,
  before: string|undefined = undefined,
  after: string|undefined = undefined,
  limit: number|undefined = undefined
) {
  return makeRequest(
    token, 'get', `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}`,
    {before,after,limit},
    undefined
  )
}

export function deleteAllReactions(
  token: string,
  channel_id: string,
  message_id: string
) {
  return makeRequest(
    token, 'delete', `/channels/${channel_id}/messages/${message_id}/reactions`,
    undefined,
    undefined
  )
}

export function deleteAllReactionsForEmoji(
  token: string,
  channel_id: string,
  message_id: string,
  emoji: string
) {
  return makeRequest(
    token, 'delete', `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}`,
    undefined,
    undefined
  )
}

export function editMessage(
  token: string,
  channel_id: string,
  message_id: string,
  content: string|undefined = undefined,
  embed: Embed|undefined = undefined,
  allowed_mentions: { parse?: ('roles'|'users'|'everyone')[], users?: string[], roles?: string[] }|undefined = undefined,
  flags: number|undefined = undefined
) {
  return makeRequest(
    token, 'patch', `/channels/${channel_id}/messages/${message_id}`,
    undefined,
    {content,embed,allowed_mentions,flags}
  )
}

export function deleteMessage(
  token: string,
  channel_id: string,
  message_id: string
) {
  return makeRequest(
    token, 'delete', `/channels/${channel_id}/messages/${message_id}`,
    undefined,
    undefined
  )
}

export function bulkDeleteMessages(
  token: string,
  channel_id: string
) {
  return makeRequest(
    token, 'post', `/channels/${channel_id}/messages/bulk-delete`,
    undefined,
    undefined
  )
}

export function editChannelPermissions(
  token: string,
  channel_id: string,
  overwrite_id: string,
  allow: number,
  deny: number,
  type: string
) {
  return makeRequest(
    token, 'put', `/channels/${channel_id}/permissions/${overwrite_id}`,
    undefined,
    {allow,deny,type}
  )
}

export function getChannelInvites(
  token: string,
  channel_id: string
) {
  return makeRequest(
    token, 'get', `/channels/${channel_id}/invites`,
    undefined,
    undefined
  )
}

export function createChannelInvite(
  token: string,
  channel_id: string,
  max_age: number = 86400,
  max_uses: number = 0,
  temporary: boolean = false,
  unique: boolean = false,
  target_user: string|undefined = undefined,
  target_user_type: number|undefined = undefined
) {
  return makeRequest(
    token, 'post', `/channels/${channel_id}/invites`,
    undefined,
    {max_age,max_uses,temporary,unique,target_user,target_user_type}
  )
}

export function deleteChannelPermission(
  token: string,
  channel_id: string,
  overwrite_id: string
) {
  return makeRequest(
    token, 'delete', `/channels/${channel_id}/permissions/${overwrite_id}`,
    undefined,
    undefined
  )
}

export function triggerTypingIndicator(
  token: string,
  channel_id: string
) {
  return makeRequest(
    token, 'post', `/channels/${channel_id}/typing`,
    undefined,
    undefined
  )
}

export function getPinnedMessages(
  token: string,
  channel_id: string
) {
  return makeRequest(
    token, 'get', `/channels/${channel_id}/pins`,
    undefined,
    undefined
  )
}

export function addPinnedChannelMessage(
  token: string,
  channel_id: string,
  message_id: string
) {
  return makeRequest(
    token, 'put', `/channels/${channel_id}/pins/${message_id}`,
    undefined,
    undefined
  )
}

export function deletePinnedChannelMessage(
  token: string,
  channel_id: string,
  message_id: string
) {
  return makeRequest(
    token, 'delete', `/channels/${channel_id}/pins/${message_id}`,
    undefined,
    undefined
  )
}

export function groupDMAddRecipient(
  token: string,
  channel_id: string,
  user_id: string,
  access_token: string,
  nick: string = ''
) {
  return makeRequest(
    token, 'put', `/channels/${channel_id}/recipients/${user_id}`,
    undefined,
    {access_token,nick}
  )
}

export function groupDMRemoveRecipient(
  token: string,
  channel_id: string,
  user_id: string
) {
  return makeRequest(
    token, 'delete', `/channels/${channel_id}/recipients/${user_id}`,
    undefined,
    undefined
  )
}

export function listGuildEmojis(
  token: string,
  guild_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/emojis`,
    undefined,
    undefined
  )
}

export function getGuildEmoji(
  token: string,
  guild_id: string,
  emoji_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/emojis/${emoji_id}`,
    undefined,
    undefined
  )
}

export function createGuildEmoji(
  token: string,
  guild_id: string,
  name: string,
  image: string,
  roles: string[] = []
) {
  return makeRequest(
    token, 'post', `/guilds/${guild_id}/emojis`,
    undefined,
    {name,image,roles}
  )
}

export function modifyGuildEmoji(
  token: string,
  guild_id: string,
  emoji_id: string,
  name: string,
  roles: string[] = []
) {
  return makeRequest(
    token, 'patch', `/guilds/${guild_id}/emojis/${emoji_id}`,
    undefined,
    {name,roles}
  )
}

export function deleteGuildEmoji(
  token: string,
  guild_id: string,
  emoji_id: string
) {
  return makeRequest(
    token, 'delete', `/guilds/${guild_id}/emojis/${emoji_id}`,
    undefined,
    undefined
  )
}
