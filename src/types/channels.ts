import { PermissionOverwrite } from "./permissions.ts";
import { User } from "./users.ts";

export enum ChannelType { GUILD_TEXT, DM, GUILD_VOICE, GROUP_DM, GUILD_CATEGORY, GUILD_NEWS, GUILD_STORE }

export type Channel = {
  id: string
  type: ChannelType
  guild_id?: string
  position?: number
  permission_overwrites?: PermissionOverwrite[]
  name?: string
  topic?: string|null
  nsfw?: boolean
  last_message_id?: string|null
  bitrate?: number
  user_limit?: number
  rate_limit_per_user?: number
  recipients?: User[]
  icon?: string|null
  owner_id?: string
  application_id?: string
  parent_id?: string|null
  last_pin_timestamp?: string
}
