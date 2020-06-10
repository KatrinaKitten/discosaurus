import { Signaler } from "../util/signals.ts";
import * as Events from "../types/events.ts"
import { Channel } from "../types/channels.ts";
import { Guild, GuildMember } from "../types/guilds.ts";
import { Message } from "../types/messages.ts";
import { User, Presence } from "../types/users.ts";
import { VoiceState } from "../types/voice.ts";

/** External interface for an opened gateway. */
export class GatewayInterface extends Signaler {
  /** Updates the client's presence information. */
  updateStatus(status: { since: number|null, game: { name: string, type: number }|null, status: string, afk: boolean }) {
    return this.emit('__gateway_updateStatus', status)
  }

  /** Updates the client's voice connection information for the given guild. */
  updateVoiceState(state: { guild_id: string, channel_id: string|null, self_mute: boolean, self_deaf: boolean }) {
    return this.emit('__gateway_updateVoiceState', state)
  }

  /** Requests an extended list of guild members for the given guild. */
  requestGuildMembers(request: { guild_id: string, query?: string, limit: number, presences?: boolean, user_ids?: string|string[], nonce?: string }) {
    return this.emit('__gateway_requestGuildMembers', request)
  }

  /** Closes the gateway. */
  close() { return this.emit('__gateway_close') }

  /// SECTION: `connect` overloads

  connect(name: 'ready',                         handler: (event: Events.ReadyEvent) => void): void
  connect(name: 'resumed',                       handler: () => void): void

  connect(name: 'channel_create',                handler: (event: Channel) => void): void
  connect(name: 'channel_update',                handler: (event: Channel) => void): void
  connect(name: 'channel_delete',                handler: (event: Channel) => void): void
  connect(name: 'channel_pins_update',           handler: (event: Events.ChannelPinsUpdateEvent) => void): void

  connect(name: 'guild_create',                  handler: (event: Guild) => void): void
  connect(name: 'guild_update',                  handler: (event: Guild) => void): void
  connect(name: 'guild_delete',                  handler: (event: Guild) => void): void
  connect(name: 'guild_ban_add',                 handler: (event: Events.GuildBanEvent) => void): void
  connect(name: 'guild_ban_remove',              handler: (event: Events.GuildBanEvent) => void): void
  connect(name: 'guild_emojis_update',           handler: (event: Events.GuildEmojisUpdateEvent) => void): void
  connect(name: 'guild_integrations_update',     handler: (event: Events.GuildIntegrationsUpdateEvent) => void): void

  connect(name: 'guild_member_add',              handler: (event: GuildMember & {guild_id:string}) => void): void
  connect(name: 'guild_member_remove',           handler: (event: Events.GuildMemberRemoveEvent) => void): void
  connect(name: 'guild_member_update',           handler: (event: Events.GuildMemberUpdateEvent) => void): void
  connect(name: 'guild_members_chunk',           handler: (event: Events.GuildMembersChunkEvent) => void): void

  connect(name: 'guild_role_create',             handler: (event: Events.GuildRoleEvent) => void): void
  connect(name: 'guild_role_update',             handler: (event: Events.GuildRoleEvent) => void): void
  connect(name: 'guild_role_delete',             handler: (event: Events.GuildRoleDeleteEvent) => void): void

  connect(name: 'invite_create',                 handler: (event: Events.InviteCreateEvent) => void): void
  connect(name: 'invite_delete',                 handler: (event: Events.InviteDeleteEvent) => void): void

  connect(name: 'message_create',                handler: (event: Message) => void): void
  connect(name: 'message_update',                handler: (event: Partial<Message> & { id: string, channel_id: string }) => void): void
  connect(name: 'message_delete',                handler: (event: Events.MessageDeleteEvent) => void): void
  connect(name: 'message_delete_bulk',           handler: (event: Events.MessageDeleteBulkEvent) => void): void

  connect(name: 'message_reaction_add',          handler: (event: Events.MessageReactionAddEvent) => void): void
  connect(name: 'message_reaction_remove',       handler: (event: Events.MessageReactionRemoveEvent) => void): void
  connect(name: 'message_reaction_remove_all',   handler: (event: Events.MessageReactionRemoveAllEvent) => void): void
  connect(name: 'message_reaction_remove_emoji', handler: (event: Events.MessageReactionRemoveEmojiEvent) => void): void

  connect(name: 'presence_update',               handler: (event: Presence) => void): void
  connect(name: 'typing_start',                  handler: (event: Events.TypingStartEvent) => void): void
  connect(name: 'user_update',                   handler: (event: User) => void): void

  connect(name: 'voice_state_update',            handler: (event: VoiceState) => void): void
  connect(name: 'voice_server_update',           handler: (event: Events.VoiceServerUpdateEvent) => void): void

  connect(name: 'webhooks_update',               handler: (event: Events.WebhookUpdateEvent) => void): void

  connect(name: 'any',  handler: (event: any, name: string) => void): void
  connect(name: string, handler: (...args: any[]) => any): void
  connect(name: string, handler: (...args: any[]) => any) { super.connect(name, handler) }
}
