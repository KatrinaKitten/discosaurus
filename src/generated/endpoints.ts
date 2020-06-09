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

export function createGuild(
  token: string,
  name: string,
  region: string|undefined = undefined,
  icon: string|undefined = undefined,
  verification_level: VerificationLevel|undefined = undefined,
  default_message_notifications: MessageNotificationLevel|undefined = undefined,
  explicit_content_filter: ExplicitContentFilter|undefined = undefined,
  roles: Role[]|undefined = undefined,
  channels: Partial<Channel>[]|undefined = undefined,
  afk_channel_id: string|undefined = undefined,
  afk_timeout: number = 300,
  system_channel_id: string|undefined = undefined
) {
  return makeRequest(
    token, 'post', `/guilds`,
    undefined,
    {name,region,icon,verification_level,default_message_notifications,explicit_content_filter,roles,channels,afk_channel_id,afk_timeout,system_channel_id}
  )
}

export function getGuild(
  token: string,
  guild_id: string,
  with_counts: boolean = false
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}`,
    {with_counts},
    undefined
  )
}

export function getGuildPreview(
  token: string,
  guild_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/preview`,
    undefined,
    undefined
  )
}

export function modifyGuild(
  token: string,
  guild_id: string,
  name: string,
  region: string|null = null,
  verification_level: VerificationLevel|null = null,
  default_message_notifications: MessageNotificationLevel|null = null,
  explicit_content_filter: ExplicitContentFilter|null = null,
  afk_channel_id: string|null = null,
  afk_timeout: number = 300,
  icon: string|null = null,
  owner_id: string,
  splash: string|null = null,
  banner: string|null = null,
  system_channel_id: string|null = null,
  rules_channel_id: string|null = null,
  public_updates_channel_id: string|null = null,
  preferred_locale: string|null = null
) {
  return makeRequest(
    token, 'patch', `/guilds/${guild_id}`,
    undefined,
    {name,region,verification_level,default_message_notifications,explicit_content_filter,afk_channel_id,afk_timeout,icon,owner_id,splash,banner,system_channel_id,rules_channel_id,public_updates_channel_id,preferred_locale}
  )
}

export function deleteGuild(
  token: string,
  guild_id: string
) {
  return makeRequest(
    token, 'delete', `/guilds/${guild_id}`,
    undefined,
    undefined
  )
}

export function getGuildChannels(
  token: string,
  guild_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/channels`,
    undefined,
    undefined
  )
}

export function createGuildChannel(
  token: string,
  guild_id: string,
  name: string,
  type: ChannelType|undefined = undefined,
  topic: string|undefined = undefined,
  bitrate: number|undefined = undefined,
  user_limit: number|undefined = undefined,
  rate_limit_per_user: number|undefined = undefined,
  position: number|undefined = undefined,
  permission_overwrites: PermissionOverwrite[]|undefined = undefined,
  parent_id: string|undefined = undefined,
  nsfw: boolean|undefined = undefined
) {
  return makeRequest(
    token, 'post', `/guilds/${guild_id}/channels`,
    undefined,
    {name,type,topic,bitrate,user_limit,rate_limit_per_user,position,permission_overwrites,parent_id,nsfw}
  )
}

export function getGuildMember(
  token: string,
  guild_id: string,
  user_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/members/${user_id}`,
    undefined,
    undefined
  )
}

export function listGuildMembers(
  token: string,
  guild_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/members`,
    undefined,
    undefined
  )
}

export function addGuildMember(
  token: string,
  guild_id: string,
  user_id: string,
  access_token: string,
  nick: string|undefined = undefined,
  roles: string[]|undefined = undefined,
  mute: boolean|undefined = undefined,
  deaf: boolean|undefined = undefined
) {
  return makeRequest(
    token, 'put', `/guilds/${guild_id}/members/${user_id}`,
    undefined,
    {access_token,nick,roles,mute,deaf}
  )
}

export function modifyGuildMember(
  token: string,
  guild_id: string,
  user_id: string,
  nick: string|undefined = undefined,
  roles: string[]|undefined = undefined,
  mute: boolean|undefined = undefined,
  deaf: boolean|undefined = undefined,
  channel_id: string|undefined = undefined
) {
  return makeRequest(
    token, 'patch', `/guilds/${guild_id}/members/${user_id}`,
    undefined,
    {nick,roles,mute,deaf,channel_id}
  )
}

export function modifyCurrentUserNick(
  token: string,
  guild_id: string,
  nick: string|undefined = undefined
) {
  return makeRequest(
    token, 'patch', `/guilds/${guild_id}/members/@me/nick`,
    undefined,
    {nick}
  )
}

export function addGuildMemberRole(
  token: string,
  guild_id: string,
  user_id: string,
  role_id: string
) {
  return makeRequest(
    token, 'put', `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`,
    undefined,
    undefined
  )
}

export function removeGuildMemberRole(
  token: string,
  guild_id: string,
  user_id: string,
  role_id: string
) {
  return makeRequest(
    token, 'delete', `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`,
    undefined,
    undefined
  )
}

export function removeGuildMember(
  token: string,
  guild_id: string,
  user_id: string
) {
  return makeRequest(
    token, 'delete', `/guilds/${guild_id}/members/${user_id}`,
    undefined,
    undefined
  )
}

export function getGuildBans(
  token: string,
  guild_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/bans`,
    undefined,
    undefined
  )
}

export function getGuildBan(
  token: string,
  guild_id: string,
  user_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/bans/${user_id}`,
    undefined,
    undefined
  )
}

export function createGuildBan(
  token: string,
  guild_id: string,
  user_id: string,
  delete_message_days: number|undefined = undefined,
  reason: string|undefined = undefined
) {
  return makeRequest(
    token, 'put', `/guilds/${guild_id}/bans/${user_id}`,
    {delete_message_days,reason},
    undefined
  )
}

export function removeGuildBan(
  token: string,
  guild_id: string,
  user_id: string
) {
  return makeRequest(
    token, 'delete', `/guilds/${guild_id}/bans/${user_id}`,
    undefined,
    undefined
  )
}

export function getGuildRoles(
  token: string,
  guild_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/roles`,
    undefined,
    undefined
  )
}

export function createGuildRole(
  token: string,
  guild_id: string,
  name: string|undefined = undefined,
  permissions: number|undefined = undefined,
  color: number|undefined = undefined,
  hoist: boolean|undefined = undefined,
  mentionable: boolean|undefined = undefined
) {
  return makeRequest(
    token, 'post', `/guilds/${guild_id}/roles`,
    undefined,
    {name,permissions,color,hoist,mentionable}
  )
}

export function modifyGuildRole(
  token: string,
  guild_id: string,
  role_id: string,
  name: string|undefined = undefined,
  permissions: number|undefined = undefined,
  color: number|undefined = undefined,
  hoist: boolean|undefined = undefined,
  mentionable: boolean|undefined = undefined
) {
  return makeRequest(
    token, 'patch', `/guilds/${guild_id}/roles/${role_id}`,
    undefined,
    {name,permissions,color,hoist,mentionable}
  )
}

export function deleteGuildRole(
  token: string,
  guild_id: string,
  role_id: string
) {
  return makeRequest(
    token, 'delete', `/guilds/${guild_id}/roles/${role_id}`,
    undefined,
    undefined
  )
}

export function getGuildPruneCount(
  token: string,
  guild_id: string,
  days: number|undefined = undefined,
  include_roles: string[]|undefined = undefined
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/prune`,
    {days,include_roles},
    undefined
  )
}

export function beginGuildPrune(
  token: string,
  guild_id: string,
  days: number|undefined = undefined,
  compute_prune_count: boolean|undefined = undefined,
  include_roles: string[]|undefined = undefined
) {
  return makeRequest(
    token, 'post', `/guilds/${guild_id}/prune`,
    {days,compute_prune_count,include_roles},
    undefined
  )
}

export function getGuildVoiceRegions(
  token: string,
  guild_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/regions`,
    undefined,
    undefined
  )
}

export function getGuildInvites(
  token: string,
  guild_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/invites`,
    undefined,
    undefined
  )
}

export function getGuildIntegrations(
  token: string,
  guild_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/integrations`,
    undefined,
    undefined
  )
}

export function createGuildIntegration(
  token: string,
  guild_id: string,
  type: string,
  id: string
) {
  return makeRequest(
    token, 'post', `/guilds/${guild_id}/integrations`,
    undefined,
    {type,id}
  )
}

export function modifyGuildIntegration(
  token: string,
  guild_id: string,
  integration_id: string,
  expire_behavior: number|undefined = undefined,
  expire_grace_period: number|undefined = undefined,
  enable_emoticons: boolean|undefined = undefined
) {
  return makeRequest(
    token, 'patch', `/guilds/${guild_id}/integrations/${integration_id}`,
    undefined,
    {expire_behavior,expire_grace_period,enable_emoticons}
  )
}

export function deleteGuildIntegration(
  token: string,
  guild_id: string,
  integration_id: string
) {
  return makeRequest(
    token, 'delete', `/guilds/${guild_id}/integrations/${integration_id}`,
    undefined,
    undefined
  )
}

export function syncGuildIntegration(
  token: string,
  guild_id: string,
  integration_id: string
) {
  return makeRequest(
    token, 'post', `/guilds/${guild_id}/integrations/${integration_id}/sync`,
    undefined,
    undefined
  )
}

export function getGuildWidget(
  token: string,
  guild_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/widget`,
    undefined,
    undefined
  )
}

export function modifyGuildWidget(
  token: string,
  guild_id: string,
  enabled: boolean|undefined = undefined,
  channel_id: string|undefined = undefined
) {
  return makeRequest(
    token, 'patch', `/guilds/${guild_id}/widget`,
    undefined,
    {enabled,channel_id}
  )
}

export function getGuildVanityURL(
  token: string,
  guild_id: string
) {
  return makeRequest(
    token, 'get', `/guilds/${guild_id}/vanity-url`,
    undefined,
    undefined
  )
}

