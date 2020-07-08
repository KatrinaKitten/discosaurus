import { User } from "./users.ts"
import { GuildMember } from "./guilds.ts"
import { ChannelType } from "./channels.ts"

export enum MessageType {
  DEFAULT,
  RECIPIENT_ADD,
  RECIPIENT_REMOVE,
  CALL,
  CHANNEL_NAME_CHANGE,
  CHANNEL_ICON_CHANGE,
  CHANNEL_PINNED_MESSAGE,
  GUILD_MEMBER_JOIN,
  USER_PREMIUM_GUILD_SUBSCRIPTION,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3,
  CHANNEL_FOLLOW_ADD,
  GUILD_DISCOVERY_DISQUALIFIED = 14,
  GUILD_DISCOVERY_REQUALIFIED
}

export enum MessageFlags {
  CROSSPOSTED            = 1 << 0,
  IS_CROSSPOST           = 1 << 1,
  SUPPRESS_EMBEDS        = 1 << 2,
  SOURCE_MESSAGE_DELETED = 1 << 3,
  URGENT                 = 1 << 4,
}

export type Message = {
  id: string
  channel_id: string
  guild_id?: string
  author: User | { id: string, username: string, avatar: string }
  member?: GuildMember
  content: string
  timestamp: string
  edited_timestamp: string|null
  tts: boolean
  mention_everyone: boolean
  mentions: (User & { member?: GuildMember })[]
  mention_roles: string[]
  mention_channels?: { id: string, guild_id: string, name: string, type: ChannelType }[]
  attachments: any[] // TODO: implement
  embeds: Embed[]
  reactions?: any[] // TODO: implement
  nonce?: string|number
  pinned: boolean
  webhook_id?: string
  type: MessageType
  activity?: any[] // TODO: implement
  application?: any[] // TODO: implement
  message_reference?: any[] // TODO: implement
  flags?: MessageFlags
}

export type Embed = {
  title?: string
  type?: string
  description?: string
  url?: string
  timestamp?: string
  color?: number

  footer?: {
    text: string
    icon_url?: string
    proxy_icon_url?: string
  }

  image?: {
    url?: string
    proxy_url?: string
    height?: number
    width?: number
  }

  thumbnail?: {
    url?: string
    proxy_url?: string
    height?: number
    width?: number
  }

  video?: {
    url?: string
    height?: number
    width?: number
  }

  provider?: {
    name?: string
    url?: string
  }

  author?: {
    name?: string
    url?: string
    icon_url?: string
    proxy_icon_url?: string
  }

  fields?: {
    name: string
    value: string
    inline?: boolean
  }[]
}

export type Emoji = {
  id: string|null
  name: string|null
  roles?: string[]
  user?: User
  require_colons?: boolean
  managed?: boolean
  animated?: boolean
  available?: boolean
}
