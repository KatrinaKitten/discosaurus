import * as WS from "https://deno.land/std@0.55.0/ws/mod.ts"
import { Signaler } from "../util/signals.ts";
import { getGateway } from "../generated/endpoints.ts";

/** Opcodes which can be sent or recieved by the gateway. */
enum Opcode {
  DISPATCH,
  HEARTBEAT,
  IDENTIFY,
  PRESENCE_UPDATE,
  VOICE_STATE_UPDATE,
  RESUME = 6,
  RECONNECT,
  REQUEST_GUILD_MEMBERS,
  INVALID_SESSION,
  HELLO,
  HEARTBEAT_ACK
}

/** Gateway intents */
export enum Intent {
  GUILDS                   = 1 << 0,
  GUILD_MEMBERS            = 1 << 1,
  GUILD_BANS               = 1 << 2,
  GUILD_EMOJIS             = 1 << 3,
  GUILD_INTEGRATIONS       = 1 << 4,
  GUILD_WEBHOOKS           = 1 << 5,
  GUILD_INVITES            = 1 << 6,
  GUILD_VOICE_STATES       = 1 << 7,
  GUILD_PRESENCES          = 1 << 8,
  GUILD_MESSAGES           = 1 << 9,
  GUILD_MESSAGE_REACTIONS  = 1 << 10,
  GUILD_MESSAGE_TYPING     = 1 << 11,
  DIRECT_MESSAGES          = 1 << 12,
  DIRECT_MESSAGE_REACTIONS = 1 << 13,
  DIRECT_MESSAGE_TYPING    = 1 << 14,

  MESSAGES                 = GUILD_MESSAGES | DIRECT_MESSAGES,
  MESSAGE_REACTIONS        = GUILD_MESSAGE_REACTIONS | DIRECT_MESSAGE_REACTIONS
}

/** External interface for an opened gateway. */
class GatewayInterface extends Signaler {
  updateStatus(status: { since: number|null, game: { name: string, type: number }|null, status: string, afk: boolean }) {
    return this.emit('__gateway_updateStatus', status)
  }

  updateVoiceState(state: { guild_id: string, channel_id: string|null, self_mute: boolean, self_deaf: boolean }) {
    return this.emit('__gateway_updateVoiceState', state)
  }

  requestGuildMembers(request: { guild_id: string, query?: string, limit: number, presences?: boolean, user_ids?: string|string[], nonce?: string }) {
    return this.emit('__gateway_requestGuildMembers', request)
  }
}

/**
 * Opens and connects to the Discord gateway.
 * 
 * @param token The token to use when connecting to Discord.
 * @param gatewayVersion The gateway version to use (default: 6)
 * @returns A `Signaler` which emits events recieved from the gateway.
 */
export async function openGateway(token: string, intents?: number, { gatewayVersion = 6 } = {}) {
  const gatewayUrl = (await getGateway(token).then(r => r.json())).url + `?v=${gatewayVersion}&encoding=json`,
        dispatcher = new GatewayInterface
  
  async function gateway(resumeInfo?: { sessionId: string, seq: number|null }) {
    const socket = await WS.connectWebSocket(gatewayUrl)
    var heartbeat = 0, acked = true,
        seq = resumeInfo?.seq ?? null, 
        sessionId = resumeInfo?.sessionId ?? ''

    const send = (msg: object) => socket.send(JSON.stringify(msg))
    const sendHeartbeat = () => {
      if(acked) { 
        send({ op: Opcode.HEARTBEAT, d: seq })
        acked = false
      } else {
        socket.close(2000, 'Did not recieve heartbeat ack')
        clearInterval(heartbeat)
      }
    }

    dispatcher.clear('__gateway_updateStatus')
    dispatcher.connect('__gateway_updateStatus', (status: any) => send({
      op: Opcode.PRESENCE_UPDATE,
      d: status
    }))

    dispatcher.clear('__gateway_updateVoiceState')
    dispatcher.connect('__gateway_updateVoiceState', (state: any) => send({
      op: Opcode.VOICE_STATE_UPDATE,
      d: state
    }))
    
    dispatcher.clear('__gateway_requestGuildMembers')
    dispatcher.connect('__gateway_requestGuildMembers', (request: any) => send({
      op: Opcode.REQUEST_GUILD_MEMBERS,
      d: request
    }))

    for await(const msg of socket) {
      if(WS.isWebSocketPingEvent(msg)) continue
      if(WS.isWebSocketPongEvent(msg)) continue
      if(WS.isWebSocketCloseEvent(msg)) return console.log(msg)

      const m = JSON.parse(msg as string)
      switch(m.op) {
        case Opcode.HELLO:
          heartbeat = setInterval(sendHeartbeat, m.d.heartbeat_interval)
          if(!resumeInfo) send({
            op: Opcode.IDENTIFY,
            d: {
              token: `Bot ${token.trim()}`,
              properties: {
                $os: Deno.build.os,
                $browser: 'discosaurus',
                $device: 'discosaurus'
              },
              intents: intents
            }
          }); else send({
            op: Opcode.RESUME,
            d: {
              token: `Bot ${token.trim()}`,
              session_id: sessionId,
              seq: seq
            }
          })
          break
        
        case Opcode.HEARTBEAT:
          send({ op: Opcode.HEARTBEAT, d: seq })
          break
        case Opcode.HEARTBEAT_ACK:
          acked = true
          break
        
        case Opcode.RECONNECT:
          if(heartbeat) clearInterval(heartbeat)
          socket.close(1000)
          setTimeout(gateway, 0, { sessionId, seq })
          break
        case Opcode.INVALID_SESSION:
          if(heartbeat) clearInterval(heartbeat)
          socket.close(1000)
          setTimeout(gateway, 5000, m.d && { sessionId, seq })
          break
        
        case Opcode.DISPATCH:
          if(m.t === 'READY') sessionId = m.d.session_id
          if(m.s) seq = m.s
          dispatcher.emit(m.t?.toLowerCase(), m.d)
          break
      }
    }

    dispatcher.emit('disconnect')
  }

  gateway()
  return dispatcher
}
