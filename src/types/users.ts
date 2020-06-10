import { ServerIntegration } from "./guilds.ts"

export type User = {
  id: string
  username: string
  discriminator: string
  avatar: string|null
  bot?: boolean
  system?: boolean
  mfa_enabled?: boolean
  locale?: string
  verified?: boolean
  email?: string|null
  flags?: UserFlags
  premium_type?: NitroType
  public_flags?: UserFlags
}

export enum NitroType { NONE, NITRO_CLASSIC, NITRO }
export enum UserFlags {
  DISCORD_EMPLOYEE = 1 << 0,
  DISCORD_PARTNER  = 1 << 1,
  HYPESQUAD_EVENTS = 1 << 2,
  BUG_HUNTER_L1    = 1 << 3,
  HOUSE_BRAVERY    = 1 << 6,
  HOUSE_BRILLIANCE = 1 << 7,
  HOUSE_BALANCE    = 1 << 8,
  EARLY_SUPPORTER  = 1 << 9,
  TEAM_USER        = 1 << 10,
  SYSTEM           = 1 << 12,
  BUG_HUNTER_L2    = 1 << 14,
  VERIFIED_BOT     = 1 << 16,
  VERIFIED_BOT_DEV = 1 << 17
}

export enum UserConnectionVisibility { NONE, EVERYONE }
export type UserConnection = {
  id: string
  name: string
  type: string
  revoked?: boolean
  integrations?: ServerIntegration[]
  verified: boolean
  friend_sync: boolean
  show_activity: boolean
  visibility: UserConnectionVisibility
}

export type Presence = {
  user: User
  roles: string[]
  game: null|Activity
  guild_id: string
  status: string
  activities: Activity[]
  client_status: {
    desktop?: string
    mobile?: string
    web?: string
  },
  premium_since?: string
  nick?: string|null
}

export enum ActivityType { PLAYING, STREAMING, LISTENING, CUSTOM }
export enum ActivityFlags {
  INSTANCE     = 1 << 0,
  JOIN         = 1 << 1,
  SPECTATE     = 1 << 2,
  JOIN_REQUEST = 1 << 3,
  SYNC         = 1 << 4,
  PLAY         = 1 << 5
}

export type Activity = {
  name: string
  type: ActivityType
  url?: string|null
  created_at: number
  timestamps?: {
    start?: number
    end?: number
  }
  application_id?: string
  details?: string|null
  state?: string|null
  emoji?: null|{
    name: string
    id?: string
    animated?: boolean
  }
  party?: {
    id?: string
    size?: [number, number]
  }
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
  secrets?: {
    join?: string
    spectate?: string
    match?: string
  }
  instance?: boolean
  flags?: ActivityFlags
}
