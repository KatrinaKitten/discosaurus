
export type User = null

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
