import { Client } from "../src/client.ts"

const token = await Deno.readTextFile('test/.auth')
const client = new Client(token)
const dinos = ['🦕','🦖','🐢','🦎','🐊']

client.connect('ready', event => {
  console.log(`Logged in as ${event.user.username}#${event.user.discriminator}`)
  client.updateStatus({ since: null, game: { name: 'with Deno', type: 0 }, status: 'online', afk: false })
})

client.connect('message_create', async message => {
  if(message.content.startsWith('saur.')) {
    switch(message.content.slice(5).split(' ',2)[0]) {
      case 'ping': 
        await client.api.createMessage(token, message.channel_id, `Pong! | ${+new Date - +new Date(message.timestamp)}ms`)
        break
      case 'dino':
        await client.api.createMessage(token, message.channel_id, dinos[Math.random()*dinos.length|0])
        break
    }
  }
})

client.login()
