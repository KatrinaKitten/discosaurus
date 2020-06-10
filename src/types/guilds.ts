import { User, Presence } from "./users.ts"
import { Role } from "./roles.ts"
import { Emoji } from "./messages.ts"
import { VoiceState } from "./voice.ts"
import { Channel } from "./channels.ts"

export enum ExplicitContentFilter { DISABLED, MEMBERS_WITHOUT_ROLES, ALL_MEMBERS }
export enum MessageNotificationLevel { ALL_MESSAGES, ONLY_MENTIONS }
export enum VerificationLevel { NONE, LOW, MEDIUM, HIGH, VERY_HIGH }
export enum SystemChannelFlags { SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0, SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1 }
export enum MFALevel { NONE, ELEVATED }

export type Guild = {
  id: string
  name: string
  icon: string|null
  splash: string|null
  discovery_splash: string|null
  owner?: boolean
  owner_id: string
  permissions?: number
  region: string
  afk_channel_id: string|null
  afk_timeout: number
  verification_level: VerificationLevel
  default_message_nofications: MessageNotificationLevel
  explicit_content_filter: ExplicitContentFilter
  roles: Role[]
  emojis: Emoji[]
  features: string[]
  mfa_level: MFALevel
  application_id: string|null
  widget_enabled?: boolean
  widget_channel_id?: string|null
  system_channel_id: string|null
  system_channel_flags: SystemChannelFlags
  rules_channel_id: string|null
  joined_at?: string
  large?: boolean
  unavailable?: boolean
  member_count?: number
  voice_states?: VoiceState[]
  members?: GuildMember[]
  channels?: Channel[]
  presences?: Presence[]
  max_presences?: number|null
  max_members?: number
  vanity_url_code: string|null
  description: string|null
  banner: string|null
  premium_tier: number
  premium_subscription_count?: number
  preferred_locale: string
  public_updates_channel_id: string|null
  max_video_channel_users?: number
  approximate_member_count?: number
  approximate_presence_count?: number
}

export type GuildMember = {
  user?: User
  nick: string|null
  roles: string[]
  joined_at: string
  premium_since?: string|null
  deaf: boolean
  mute: boolean
}

export type GuildBan = {
  reason: string|null
  user: User
}

export enum ServerIntegrationExpireBehavior { REMOVE_ROLE, KICK }
export type ServerIntegration = {
  id: string
  name: string
  type: string
  enabled: boolean
  syncing: boolean
  role_id: string
  enable_emoticons?: boolean
  expire_behavior: ServerIntegrationExpireBehavior
  expire_grace_period: number
  user: User
  account: {
    id: string
    name: string
  }
  synced_at: string
}
