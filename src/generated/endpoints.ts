import { makeRequest } from '../network/api.ts'
import { AuditLogEvent } from '../types/audit_log.ts'
import { Channel, ChannelType } from '../types/channels.ts'
import { Embed } from '../types/messages.ts'
import { ExplicitContentFilter, MessageNotificationLevel, VerificationLevel } from '../types/guilds.ts'
import { PermissionOverwrite } from '../types/permissions.ts'
import { Role } from '../types/roles.ts'

/** https://discord.com/developers/docs/topics/gateway#get-gateway */
export function getGateway(
  requestFunc: typeof makeRequest,
  token: string
) {
  return requestFunc(
    token, 'get', `/gateway`, `/gateway`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/topics/gateway#get-gateway-bot */
export function getGatewayBot(
  requestFunc: typeof makeRequest,
  token: string
) {
  return requestFunc(
    token, 'get', `/gateway/bot`, `/gateway/bot`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log */
export function getGuildAuditLog(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  user_id: string|undefined = undefined,
  action_type: AuditLogEvent|undefined = undefined
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/audit-logs`, `/guilds/${guild_id}/audit-logs`,
    {user_id,action_type},
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#get-channel */
export function getChannel(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string
) {
  return requestFunc(
    token, 'get', `/channels/${channel_id}`, `/channels/${channel_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#modify-channel */
export function modifyChannel(
  requestFunc: typeof makeRequest,
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
  return requestFunc(
    token, 'patch', `/channels/${channel_id}`, `/channels/${channel_id}`,
    undefined,
    {name,type,position,topic,nsfw,rate_limit_per_user,bitrate,user_limit,permission_overwrites,parent_id}
  )
}

/** https://discord.com/developers/docs/resources/channel#deleteclose-channel */
export function deleteChannel(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string
) {
  return requestFunc(
    token, 'delete', `/channels/${channel_id}`, `/channels/${channel_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages */
export function getChannelMessages(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  around: string|undefined = undefined,
  before: string|undefined = undefined,
  after: string|undefined = undefined,
  limit: number|undefined = undefined
) {
  return requestFunc(
    token, 'get', `/channels/${channel_id}/messages`, `/channels/${channel_id}/messages`,
    {around,before,after,limit},
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#get-channel-message */
export function getChannelMessage(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  message_id: string
) {
  return requestFunc(
    token, 'get', `/channels/${channel_id}/messages/${message_id}`, `/channels/${channel_id}/messages/{message_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#create-message */
export function createMessage(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  content: string,
  nonce: string|number|undefined = undefined,
  tts: boolean = false,
  embed: Embed|undefined = undefined,
  allowed_mentions: { parse?: ('roles'|'users'|'everyone')[], users?: string[], roles?: string[] }|undefined = undefined
) {
  return requestFunc(
    token, 'post', `/channels/${channel_id}/messages`, `/channels/${channel_id}/messages`,
    undefined,
    {content,nonce,tts,embed,allowed_mentions}
  )
}

/** https://discord.com/developers/docs/resources/channel#create-reaction */
export function createReaction(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  message_id: string,
  emoji: string
) {
  return requestFunc(
    token, 'put', `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`, `/channels/${channel_id}/messages/{message_id}/reactions/{emoji}/@me`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#delete-own-reaction */
export function deleteOwnReaction(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  message_id: string,
  emoji: string
) {
  return requestFunc(
    token, 'delete', `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`, `/channels/${channel_id}/messages/{message_id}/reactions/{emoji}/@me`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#delete-user-reaction */
export function deleteUserReaction(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  message_id: string,
  emoji: string,
  user_id: string
) {
  return requestFunc(
    token, 'delete', `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/${user_id}`, `/channels/${channel_id}/messages/{message_id}/reactions/{emoji}/{user_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#get-reactions */
export function getReactions(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  message_id: string,
  emoji: string,
  before: string|undefined = undefined,
  after: string|undefined = undefined,
  limit: number|undefined = undefined
) {
  return requestFunc(
    token, 'get', `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}`, `/channels/${channel_id}/messages/{message_id}/reactions/{emoji}`,
    {before,after,limit},
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#delete-all-reactions */
export function deleteAllReactions(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  message_id: string
) {
  return requestFunc(
    token, 'delete', `/channels/${channel_id}/messages/${message_id}/reactions`, `/channels/${channel_id}/messages/{message_id}/reactions`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji */
export function deleteAllReactionsForEmoji(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  message_id: string,
  emoji: string
) {
  return requestFunc(
    token, 'delete', `/channels/${channel_id}/messages/${message_id}/reactions/${emoji}`, `/channels/${channel_id}/messages/{message_id}/reactions/{emoji}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#edit-message */
export function editMessage(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  message_id: string,
  content: string|undefined = undefined,
  embed: Embed|undefined = undefined,
  allowed_mentions: { parse?: ('roles'|'users'|'everyone')[], users?: string[], roles?: string[] }|undefined = undefined,
  flags: number|undefined = undefined
) {
  return requestFunc(
    token, 'patch', `/channels/${channel_id}/messages/${message_id}`, `/channels/${channel_id}/messages/{message_id}`,
    undefined,
    {content,embed,allowed_mentions,flags}
  )
}

/** https://discord.com/developers/docs/resources/channel#delete-message */
export function deleteMessage(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  message_id: string
) {
  return requestFunc(
    token, 'delete', `/channels/${channel_id}/messages/${message_id}`, `/channels/${channel_id}/messages/{message_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#bulk-delete-messages */
export function bulkDeleteMessages(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string
) {
  return requestFunc(
    token, 'post', `/channels/${channel_id}/messages/bulk-delete`, `/channels/${channel_id}/messages/bulk-delete`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#edit-channel-permissions */
export function editChannelPermissions(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  overwrite_id: string,
  allow: number,
  deny: number,
  type: string
) {
  return requestFunc(
    token, 'put', `/channels/${channel_id}/permissions/${overwrite_id}`, `/channels/${channel_id}/permissions/{overwrite_id}`,
    undefined,
    {allow,deny,type}
  )
}

/** https://discord.com/developers/docs/resources/channel#get-channel-invites */
export function getChannelInvites(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string
) {
  return requestFunc(
    token, 'get', `/channels/${channel_id}/invites`, `/channels/${channel_id}/invites`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#create-channel-invite */
export function createChannelInvite(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  max_age: number = 86400,
  max_uses: number = 0,
  temporary: boolean = false,
  unique: boolean = false,
  target_user: string|undefined = undefined,
  target_user_type: number|undefined = undefined
) {
  return requestFunc(
    token, 'post', `/channels/${channel_id}/invites`, `/channels/${channel_id}/invites`,
    undefined,
    {max_age,max_uses,temporary,unique,target_user,target_user_type}
  )
}

/** https://discord.com/developers/docs/resources/channel#delete-channel-permission */
export function deleteChannelPermission(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  overwrite_id: string
) {
  return requestFunc(
    token, 'delete', `/channels/${channel_id}/permissions/${overwrite_id}`, `/channels/${channel_id}/permissions/{overwrite_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#trigger-typing-indicator */
export function triggerTypingIndicator(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string
) {
  return requestFunc(
    token, 'post', `/channels/${channel_id}/typing`, `/channels/${channel_id}/typing`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#get-pinned-messages */
export function getPinnedMessages(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string
) {
  return requestFunc(
    token, 'get', `/channels/${channel_id}/pins`, `/channels/${channel_id}/pins`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#add-pinned-channel-message */
export function addPinnedChannelMessage(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  message_id: string
) {
  return requestFunc(
    token, 'put', `/channels/${channel_id}/pins/${message_id}`, `/channels/${channel_id}/pins/{message_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#delete-pinned-channel-message */
export function deletePinnedChannelMessage(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  message_id: string
) {
  return requestFunc(
    token, 'delete', `/channels/${channel_id}/pins/${message_id}`, `/channels/${channel_id}/pins/{message_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/channel#group-dm-add-recipient */
export function groupDMAddRecipient(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  user_id: string,
  access_token: string,
  nick: string = ''
) {
  return requestFunc(
    token, 'put', `/channels/${channel_id}/recipients/${user_id}`, `/channels/${channel_id}/recipients/{user_id}`,
    undefined,
    {access_token,nick}
  )
}

/** https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient */
export function groupDMRemoveRecipient(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  user_id: string
) {
  return requestFunc(
    token, 'delete', `/channels/${channel_id}/recipients/${user_id}`, `/channels/${channel_id}/recipients/{user_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/emoji#list-guild-emojis */
export function listGuildEmojis(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/emojis`, `/guilds/${guild_id}/emojis`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/emoji#get-guild-emoji */
export function getGuildEmoji(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  emoji_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/emojis/${emoji_id}`, `/guilds/${guild_id}/emojis/{emoji_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export function createGuildEmoji(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  name: string,
  image: string,
  roles: string[] = []
) {
  return requestFunc(
    token, 'post', `/guilds/${guild_id}/emojis`, `/guilds/${guild_id}/emojis`,
    undefined,
    {name,image,roles}
  )
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export function modifyGuildEmoji(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  emoji_id: string,
  name: string,
  roles: string[] = []
) {
  return requestFunc(
    token, 'patch', `/guilds/${guild_id}/emojis/${emoji_id}`, `/guilds/${guild_id}/emojis/{emoji_id}`,
    undefined,
    {name,roles}
  )
}

/** https://discord.com/developers/docs/resources/emoji#delete-guild-emoji */
export function deleteGuildEmoji(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  emoji_id: string
) {
  return requestFunc(
    token, 'delete', `/guilds/${guild_id}/emojis/${emoji_id}`, `/guilds/${guild_id}/emojis/{emoji_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#create-guild */
export function createGuild(
  requestFunc: typeof makeRequest,
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
  return requestFunc(
    token, 'post', `/guilds`, `/guilds`,
    undefined,
    {name,region,icon,verification_level,default_message_notifications,explicit_content_filter,roles,channels,afk_channel_id,afk_timeout,system_channel_id}
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild */
export function getGuild(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  with_counts: boolean = false
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}`, `/guilds/${guild_id}`,
    {with_counts},
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild-preview */
export function getGuildPreview(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/preview`, `/guilds/${guild_id}/preview`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#modify-guild */
export function modifyGuild(
  requestFunc: typeof makeRequest,
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
  return requestFunc(
    token, 'patch', `/guilds/${guild_id}`, `/guilds/${guild_id}`,
    undefined,
    {name,region,verification_level,default_message_notifications,explicit_content_filter,afk_channel_id,afk_timeout,icon,owner_id,splash,banner,system_channel_id,rules_channel_id,public_updates_channel_id,preferred_locale}
  )
}

/** https://discord.com/developers/docs/resources/guild#delete-guild */
export function deleteGuild(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'delete', `/guilds/${guild_id}`, `/guilds/${guild_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild-channels */
export function getGuildChannels(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/channels`, `/guilds/${guild_id}/channels`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#create-guild-channel */
export function createGuildChannel(
  requestFunc: typeof makeRequest,
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
  return requestFunc(
    token, 'post', `/guilds/${guild_id}/channels`, `/guilds/${guild_id}/channels`,
    undefined,
    {name,type,topic,bitrate,user_limit,rate_limit_per_user,position,permission_overwrites,parent_id,nsfw}
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild-member */
export function getGuildMember(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  user_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/members/${user_id}`, `/guilds/${guild_id}/members/{user_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#list-guild-members */
export function listGuildMembers(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/members`, `/guilds/${guild_id}/members`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#add-guild-member */
export function addGuildMember(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  user_id: string,
  access_token: string,
  nick: string|undefined = undefined,
  roles: string[]|undefined = undefined,
  mute: boolean|undefined = undefined,
  deaf: boolean|undefined = undefined
) {
  return requestFunc(
    token, 'put', `/guilds/${guild_id}/members/${user_id}`, `/guilds/${guild_id}/members/{user_id}`,
    undefined,
    {access_token,nick,roles,mute,deaf}
  )
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-member */
export function modifyGuildMember(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  user_id: string,
  nick: string|undefined = undefined,
  roles: string[]|undefined = undefined,
  mute: boolean|undefined = undefined,
  deaf: boolean|undefined = undefined,
  channel_id: string|undefined = undefined
) {
  return requestFunc(
    token, 'patch', `/guilds/${guild_id}/members/${user_id}`, `/guilds/${guild_id}/members/{user_id}`,
    undefined,
    {nick,roles,mute,deaf,channel_id}
  )
}

/** https://discord.com/developers/docs/resources/guild#modify-current-user-nick */
export function modifyCurrentUserNick(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  nick: string|undefined = undefined
) {
  return requestFunc(
    token, 'patch', `/guilds/${guild_id}/members/@me/nick`, `/guilds/${guild_id}/members/@me/nick`,
    undefined,
    {nick}
  )
}

/** https://discord.com/developers/docs/resources/guild#add-guild-member-role */
export function addGuildMemberRole(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  user_id: string,
  role_id: string
) {
  return requestFunc(
    token, 'put', `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`, `/guilds/${guild_id}/members/{user_id}/roles/{role_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#remove-guild-member-role */
export function removeGuildMemberRole(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  user_id: string,
  role_id: string
) {
  return requestFunc(
    token, 'delete', `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`, `/guilds/${guild_id}/members/{user_id}/roles/{role_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#remove-guild-member */
export function removeGuildMember(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  user_id: string
) {
  return requestFunc(
    token, 'delete', `/guilds/${guild_id}/members/${user_id}`, `/guilds/${guild_id}/members/{user_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild-bans */
export function getGuildBans(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/bans`, `/guilds/${guild_id}/bans`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild-ban */
export function getGuildBan(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  user_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/bans/${user_id}`, `/guilds/${guild_id}/bans/{user_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#create-guild-ban */
export function createGuildBan(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  user_id: string,
  delete_message_days: number|undefined = undefined,
  reason: string|undefined = undefined
) {
  return requestFunc(
    token, 'put', `/guilds/${guild_id}/bans/${user_id}`, `/guilds/${guild_id}/bans/{user_id}`,
    {delete_message_days,reason},
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#remove-guild-ban */
export function removeGuildBan(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  user_id: string
) {
  return requestFunc(
    token, 'delete', `/guilds/${guild_id}/bans/${user_id}`, `/guilds/${guild_id}/bans/{user_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild-roles */
export function getGuildRoles(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/roles`, `/guilds/${guild_id}/roles`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#create-guild-role */
export function createGuildRole(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  name: string|undefined = undefined,
  permissions: number|undefined = undefined,
  color: number|undefined = undefined,
  hoist: boolean|undefined = undefined,
  mentionable: boolean|undefined = undefined
) {
  return requestFunc(
    token, 'post', `/guilds/${guild_id}/roles`, `/guilds/${guild_id}/roles`,
    undefined,
    {name,permissions,color,hoist,mentionable}
  )
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role */
export function modifyGuildRole(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  role_id: string,
  name: string|undefined = undefined,
  permissions: number|undefined = undefined,
  color: number|undefined = undefined,
  hoist: boolean|undefined = undefined,
  mentionable: boolean|undefined = undefined
) {
  return requestFunc(
    token, 'patch', `/guilds/${guild_id}/roles/${role_id}`, `/guilds/${guild_id}/roles/{role_id}`,
    undefined,
    {name,permissions,color,hoist,mentionable}
  )
}

/** https://discord.com/developers/docs/resources/guild#delete-guild-role */
export function deleteGuildRole(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  role_id: string
) {
  return requestFunc(
    token, 'delete', `/guilds/${guild_id}/roles/${role_id}`, `/guilds/${guild_id}/roles/{role_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
export function getGuildPruneCount(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  days: number|undefined = undefined,
  include_roles: string[]|undefined = undefined
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/prune`, `/guilds/${guild_id}/prune`,
    {days,include_roles},
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
export function beginGuildPrune(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  days: number|undefined = undefined,
  compute_prune_count: boolean|undefined = undefined,
  include_roles: string[]|undefined = undefined
) {
  return requestFunc(
    token, 'post', `/guilds/${guild_id}/prune`, `/guilds/${guild_id}/prune`,
    {days,compute_prune_count,include_roles},
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild-voice-regions */
export function getGuildVoiceRegions(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/regions`, `/guilds/${guild_id}/regions`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild-invites */
export function getGuildInvites(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/invites`, `/guilds/${guild_id}/invites`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild-integrations */
export function getGuildIntegrations(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/integrations`, `/guilds/${guild_id}/integrations`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#create-guild-integration */
export function createGuildIntegration(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  type: string,
  id: string
) {
  return requestFunc(
    token, 'post', `/guilds/${guild_id}/integrations`, `/guilds/${guild_id}/integrations`,
    undefined,
    {type,id}
  )
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-integration */
export function modifyGuildIntegration(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  integration_id: string,
  expire_behavior: number|undefined = undefined,
  expire_grace_period: number|undefined = undefined,
  enable_emoticons: boolean|undefined = undefined
) {
  return requestFunc(
    token, 'patch', `/guilds/${guild_id}/integrations/${integration_id}`, `/guilds/${guild_id}/integrations/{integration_id}`,
    undefined,
    {expire_behavior,expire_grace_period,enable_emoticons}
  )
}

/** https://discord.com/developers/docs/resources/guild#delete-guild-integration */
export function deleteGuildIntegration(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  integration_id: string
) {
  return requestFunc(
    token, 'delete', `/guilds/${guild_id}/integrations/${integration_id}`, `/guilds/${guild_id}/integrations/{integration_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#sync-guild-integration */
export function syncGuildIntegration(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  integration_id: string
) {
  return requestFunc(
    token, 'post', `/guilds/${guild_id}/integrations/${integration_id}/sync`, `/guilds/${guild_id}/integrations/{integration_id}/sync`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild-widget */
export function getGuildWidget(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/widget`, `/guilds/${guild_id}/widget`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-widget */
export function modifyGuildWidget(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string,
  enabled: boolean|undefined = undefined,
  channel_id: string|undefined = undefined
) {
  return requestFunc(
    token, 'patch', `/guilds/${guild_id}/widget`, `/guilds/${guild_id}/widget`,
    undefined,
    {enabled,channel_id}
  )
}

/** https://discord.com/developers/docs/resources/guild#get-guild-vanity-url */
export function getGuildVanityURL(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/vanity-url`, `/guilds/${guild_id}/vanity-url`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/invite#get-invite */
export function getInvite(
  requestFunc: typeof makeRequest,
  token: string,
  invite_code: string,
  with_counts: boolean|undefined = undefined
) {
  return requestFunc(
    token, 'get', `/invites/${invite_code}`, `/invites/${invite_code}`,
    {with_counts},
    undefined
  )
}

/** https://discord.com/developers/docs/resources/invite#delete-invite */
export function deleteInvite(
  requestFunc: typeof makeRequest,
  token: string,
  invite_code: string
) {
  return requestFunc(
    token, 'delete', `/invites/${invite_code}`, `/invites/${invite_code}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/user#get-current-user */
export function getCurrentUser(
  requestFunc: typeof makeRequest,
  token: string
) {
  return requestFunc(
    token, 'get', `/users/@me`, `/users/@me`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/user#get-user */
export function getUser(
  requestFunc: typeof makeRequest,
  token: string,
  user_id: string
) {
  return requestFunc(
    token, 'get', `/users/${user_id}`, `/users/${user_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/user#modify-current-user */
export function modifyCurrentUser(
  requestFunc: typeof makeRequest,
  token: string,
  username: string|undefined = undefined,
  avatar: string|undefined = undefined
) {
  return requestFunc(
    token, 'patch', `/users/@me`, `/users/@me`,
    undefined,
    {username,avatar}
  )
}

/** https://discord.com/developers/docs/resources/user#get-current-user-guilds */
export function getCurrentUserGuilds(
  requestFunc: typeof makeRequest,
  token: string,
  before: string|undefined = undefined,
  after: string|undefined = undefined,
  limit: number|undefined = undefined
) {
  return requestFunc(
    token, 'get', `/users/@me/guilds`, `/users/@me/guilds`,
    {before,after,limit},
    undefined
  )
}

/** https://discord.com/developers/docs/resources/user#leave-guild */
export function leaveGuild(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'delete', `/users/@me/guilds/${guild_id}`, `/users/@me/guilds/${guild_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/user#create-dm */
export function createDM(
  requestFunc: typeof makeRequest,
  token: string,
  recipient_id: string
) {
  return requestFunc(
    token, 'post', `/users/@me/channels`, `/users/@me/channels`,
    undefined,
    {recipient_id}
  )
}

/** https://discord.com/developers/docs/resources/user#get-user-connections */
export function getUserConnections(
  requestFunc: typeof makeRequest,
  token: string
) {
  return requestFunc(
    token, 'get', `/users/@me/connections`, `/users/@me/connections`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/user#get-user-connections */
export function listVoiceRegions(
  requestFunc: typeof makeRequest,
  token: string
) {
  return requestFunc(
    token, 'get', `/voice/regions`, `/voice/regions`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/webhook#create-webhook */
export function createWebhook(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string,
  name: string,
  avatar: string|null = null
) {
  return requestFunc(
    token, 'post', `/channels/${channel_id}/webhooks`, `/channels/${channel_id}/webhooks`,
    undefined,
    {name,avatar}
  )
}

/** https://discord.com/developers/docs/resources/webhook#get-channel-webhooks */
export function getChannelWebhooks(
  requestFunc: typeof makeRequest,
  token: string,
  channel_id: string
) {
  return requestFunc(
    token, 'get', `/channels/${channel_id}/webhooks`, `/channels/${channel_id}/webhooks`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/webhook#get-guild-webhooks */
export function getGuildWebhooks(
  requestFunc: typeof makeRequest,
  token: string,
  guild_id: string
) {
  return requestFunc(
    token, 'get', `/guilds/${guild_id}/webhooks`, `/guilds/${guild_id}/webhooks`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/webhook#get-webhook */
export function getWebhook(
  requestFunc: typeof makeRequest,
  token: string,
  webhook_id: string
) {
  return requestFunc(
    token, 'get', `/webhooks/${webhook_id}`, `/webhooks/${webhook_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/webhook#get-webhook-with-token */
export function getWebhookWithToken(
  requestFunc: typeof makeRequest,
  token: string,
  webhook_id: string,
  webhook_token: string
) {
  return requestFunc(
    token, 'get', `/webhooks/${webhook_id}/${webhook_token}`, `/webhooks/${webhook_id}/{webhook_token}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/webhook#modify-webhook */
export function modifyWebhook(
  requestFunc: typeof makeRequest,
  token: string,
  webhook_id: string,
  name: string|undefined = undefined,
  avatar: string|undefined = undefined,
  channel_id: string|undefined = undefined
) {
  return requestFunc(
    token, 'patch', `/webhooks/${webhook_id}`, `/webhooks/${webhook_id}`,
    undefined,
    {name,avatar,channel_id}
  )
}

/** https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token */
export function modifyWebhookWithToken(
  requestFunc: typeof makeRequest,
  token: string,
  webhook_id: string,
  webhook_token: string,
  name: string|undefined = undefined,
  avatar: string|undefined = undefined,
  channel_id: string|undefined = undefined
) {
  return requestFunc(
    token, 'patch', `/webhooks/${webhook_id}/${webhook_token}`, `/webhooks/${webhook_id}/{webhook_token}`,
    undefined,
    {name,avatar,channel_id}
  )
}

/** https://discord.com/developers/docs/resources/webhook#delete-webhook */
export function deleteWebhook(
  requestFunc: typeof makeRequest,
  token: string,
  webhook_id: string
) {
  return requestFunc(
    token, 'delete', `/webhooks/${webhook_id}`, `/webhooks/${webhook_id}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token */
export function deleteWebhookWithToken(
  requestFunc: typeof makeRequest,
  token: string,
  webhook_id: string,
  webhook_token: string
) {
  return requestFunc(
    token, 'delete', `/webhooks/${webhook_id}/${webhook_token}`, `/webhooks/${webhook_id}/{webhook_token}`,
    undefined,
    undefined
  )
}

/** https://discord.com/developers/docs/resources/webhook#execute-webhook */
export function executeWebhook(
  requestFunc: typeof makeRequest,
  token: string,
  webhook_id: string,
  webhook_token: string,
  wait: boolean|undefined = undefined,
  content: string|undefined = undefined,
  username: string|undefined = undefined,
  avatar_url: string|undefined = undefined,
  tts: boolean|undefined = undefined,
  file: string|undefined = undefined,
  embeds: Embed[]|undefined = undefined,
  allowed_mentions: { parse?: ('roles'|'users'|'everyone')[], users?: string[], roles?: string[] }|undefined = undefined
) {
  return requestFunc(
    token, 'post', `/webhooks/${webhook_id}/${webhook_token}`, `/webhooks/${webhook_id}/{webhook_token}`,
    {wait},
    {content,username,avatar_url,tts,file,embeds,allowed_mentions}
  )
}

export default function boundTo(requestFunc: typeof makeRequest, token: string) { return {
  /** https://discord.com/developers/docs/topics/gateway#get-gateway */
  getGateway: getGateway.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/topics/gateway#get-gateway-bot */
  getGatewayBot: getGatewayBot.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log */
  getGuildAuditLog: getGuildAuditLog.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#get-channel */
  getChannel: getChannel.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#modify-channel */
  modifyChannel: modifyChannel.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#deleteclose-channel */
  deleteChannel: deleteChannel.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#get-channel-messages */
  getChannelMessages: getChannelMessages.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#get-channel-message */
  getChannelMessage: getChannelMessage.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#create-message */
  createMessage: createMessage.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#create-reaction */
  createReaction: createReaction.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#delete-own-reaction */
  deleteOwnReaction: deleteOwnReaction.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#delete-user-reaction */
  deleteUserReaction: deleteUserReaction.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#get-reactions */
  getReactions: getReactions.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#delete-all-reactions */
  deleteAllReactions: deleteAllReactions.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji */
  deleteAllReactionsForEmoji: deleteAllReactionsForEmoji.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#edit-message */
  editMessage: editMessage.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#delete-message */
  deleteMessage: deleteMessage.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#bulk-delete-messages */
  bulkDeleteMessages: bulkDeleteMessages.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#edit-channel-permissions */
  editChannelPermissions: editChannelPermissions.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#get-channel-invites */
  getChannelInvites: getChannelInvites.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#create-channel-invite */
  createChannelInvite: createChannelInvite.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#delete-channel-permission */
  deleteChannelPermission: deleteChannelPermission.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#trigger-typing-indicator */
  triggerTypingIndicator: triggerTypingIndicator.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#get-pinned-messages */
  getPinnedMessages: getPinnedMessages.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#add-pinned-channel-message */
  addPinnedChannelMessage: addPinnedChannelMessage.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#delete-pinned-channel-message */
  deletePinnedChannelMessage: deletePinnedChannelMessage.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#group-dm-add-recipient */
  groupDMAddRecipient: groupDMAddRecipient.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient */
  groupDMRemoveRecipient: groupDMRemoveRecipient.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/emoji#list-guild-emojis */
  listGuildEmojis: listGuildEmojis.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/emoji#get-guild-emoji */
  getGuildEmoji: getGuildEmoji.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
  createGuildEmoji: createGuildEmoji.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
  modifyGuildEmoji: modifyGuildEmoji.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/emoji#delete-guild-emoji */
  deleteGuildEmoji: deleteGuildEmoji.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#create-guild */
  createGuild: createGuild.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild */
  getGuild: getGuild.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild-preview */
  getGuildPreview: getGuildPreview.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#modify-guild */
  modifyGuild: modifyGuild.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#delete-guild */
  deleteGuild: deleteGuild.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild-channels */
  getGuildChannels: getGuildChannels.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#create-guild-channel */
  createGuildChannel: createGuildChannel.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild-member */
  getGuildMember: getGuildMember.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#list-guild-members */
  listGuildMembers: listGuildMembers.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#add-guild-member */
  addGuildMember: addGuildMember.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#modify-guild-member */
  modifyGuildMember: modifyGuildMember.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#modify-current-user-nick */
  modifyCurrentUserNick: modifyCurrentUserNick.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#add-guild-member-role */
  addGuildMemberRole: addGuildMemberRole.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#remove-guild-member-role */
  removeGuildMemberRole: removeGuildMemberRole.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#remove-guild-member */
  removeGuildMember: removeGuildMember.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild-bans */
  getGuildBans: getGuildBans.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild-ban */
  getGuildBan: getGuildBan.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#create-guild-ban */
  createGuildBan: createGuildBan.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#remove-guild-ban */
  removeGuildBan: removeGuildBan.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild-roles */
  getGuildRoles: getGuildRoles.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#create-guild-role */
  createGuildRole: createGuildRole.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#modify-guild-role */
  modifyGuildRole: modifyGuildRole.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#delete-guild-role */
  deleteGuildRole: deleteGuildRole.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
  getGuildPruneCount: getGuildPruneCount.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
  beginGuildPrune: beginGuildPrune.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild-voice-regions */
  getGuildVoiceRegions: getGuildVoiceRegions.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild-invites */
  getGuildInvites: getGuildInvites.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild-integrations */
  getGuildIntegrations: getGuildIntegrations.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#create-guild-integration */
  createGuildIntegration: createGuildIntegration.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#modify-guild-integration */
  modifyGuildIntegration: modifyGuildIntegration.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#delete-guild-integration */
  deleteGuildIntegration: deleteGuildIntegration.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#sync-guild-integration */
  syncGuildIntegration: syncGuildIntegration.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild-widget */
  getGuildWidget: getGuildWidget.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#modify-guild-widget */
  modifyGuildWidget: modifyGuildWidget.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/guild#get-guild-vanity-url */
  getGuildVanityURL: getGuildVanityURL.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/invite#get-invite */
  getInvite: getInvite.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/invite#delete-invite */
  deleteInvite: deleteInvite.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/user#get-current-user */
  getCurrentUser: getCurrentUser.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/user#get-user */
  getUser: getUser.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/user#modify-current-user */
  modifyCurrentUser: modifyCurrentUser.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/user#get-current-user-guilds */
  getCurrentUserGuilds: getCurrentUserGuilds.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/user#leave-guild */
  leaveGuild: leaveGuild.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/user#create-dm */
  createDM: createDM.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/user#get-user-connections */
  getUserConnections: getUserConnections.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/user#get-user-connections */
  listVoiceRegions: listVoiceRegions.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/webhook#create-webhook */
  createWebhook: createWebhook.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/webhook#get-channel-webhooks */
  getChannelWebhooks: getChannelWebhooks.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/webhook#get-guild-webhooks */
  getGuildWebhooks: getGuildWebhooks.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/webhook#get-webhook */
  getWebhook: getWebhook.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/webhook#get-webhook-with-token */
  getWebhookWithToken: getWebhookWithToken.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/webhook#modify-webhook */
  modifyWebhook: modifyWebhook.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token */
  modifyWebhookWithToken: modifyWebhookWithToken.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/webhook#delete-webhook */
  deleteWebhook: deleteWebhook.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token */
  deleteWebhookWithToken: deleteWebhookWithToken.bind(null, requestFunc, token),
  /** https://discord.com/developers/docs/resources/webhook#execute-webhook */
  executeWebhook: executeWebhook.bind(null, requestFunc, token),
}}
