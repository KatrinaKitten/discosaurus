import { GuildMember } from "./guilds.ts"
import { Role } from "./roles.ts"

export type ReadyEvent = {
  v: number
  user: any // TODO: implement
  private_channels: []
  guilds: any[] // TODO: implement
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
  user: any // TODO: implement
}

export type GuildEmojisUpdateEvent = {
  guild_id: string
  emojis: any[] // TODO: implement
}

export type GuildIntegrationsUpdateEvent = {
  guild_id: string
}

export type GuildMemberRemoveEvent = {
  guild_id: string
  user: any // TODO: implement
}

export type GuildMemberUpdateEvent = {
  guild_id: string
  roles: string[]
  user: any // TODO: implement
  nick?: string|null
  premium_since?: string
}

export type GuildMembersChunkEvent = {
  guild_id: string
  members: GuildMember[]
  chunk_index: number
  chunk_count: number
  not_found?: any[]
  presences?: any[] // TODO: implement
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
  inviter?: any // TODO: implement
  max_age: number
  max_uses: number
  target_user?: any // TODO: implement
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
