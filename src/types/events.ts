import { GuildMember, Guild } from "./guilds.ts"
import { Role } from "./roles.ts"
import { User, Presence } from "./users.ts"
import { Emoji } from "./messages.ts"

export type ReadyEvent = {
  v: number
  user: User
  private_channels: []
  guilds: Guild[]
  session_id: string
  shard?: [number, number]
}

export type ChannelPinsUpdateEvent = {
  guild_id?: string
  channel_id?: string
  last_pin_timestamp?: string
}

export type GuildBanEvent = {
  guild_id: string
  user: User
}

export type GuildEmojisUpdateEvent = {
  guild_id: string
  emojis: Emoji[] 
}

export type GuildIntegrationsUpdateEvent = {
  guild_id: string
}

export type GuildMemberRemoveEvent = {
  guild_id: string
  user: User
}

export type GuildMemberUpdateEvent = {
  guild_id: string
  roles: string[]
  user: User
  nick?: string|null
  premium_since?: string
}

export type GuildMembersChunkEvent = {
  guild_id: string
  members: GuildMember[]
  chunk_index: number
  chunk_count: number
  not_found?: any[]
  presences?: Presence[]
  nonce?: string
}

export type GuildRoleEvent = {
  guild_id: string
  role: Role
}

export type GuildRoleDeleteEvent = {
  guild_id: string
  role_id: string
}

export type InviteCreateEvent = {
  channel_id: string
  code: string
  created_at: string
  guild_id?: string
  inviter?: User
  max_age: number
  max_uses: number
  target_user?: User
  target_user_type?: number
  temporary: boolean
  uses: number
}

export type InviteDeleteEvent = {
  channel_id: string
  guild_id?: string
  code: string
}

export type MessageDeleteEvent = {
  id: string
  channel_id: string
  guild_id?: string
}

export type MessageDeleteBulkEvent = {
  ids: string[]
  channel_id: string
  guild_id?: string
}

export type MessageReactionAddEvent = {
  user_id: string
  channel_id: string
  message_id: string
  guild_id?: string
  member?: GuildMember
  emoji: Emoji
}

export type MessageReactionRemoveEvent = {
  user_id: string
  channel_id: string
  message_id: string
  guild_id?: string
  emoji: Emoji
}

export type MessageReactionRemoveAllEvent = {
  channel_id: string
  message_id: string
  guild_id?: string
}

export type MessageReactionRemoveEmojiEvent = {
  channel_id: string
  message_id: string
  guild_id?: string
  emoji: Emoji
}

export type TypingStartEvent = {
  channel_id: string
  guild_id?: string
  user_id: string
  timestamp: number
  member?: GuildMember
}

export type VoiceServerUpdateEvent = {
  token: string
  guild_id: string
  endpoint: string
}

export type WebhookUpdateEvent = {
  guild_id: string
  channel_id: string
}
