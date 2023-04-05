const { Client, GatewayIntentBits } = require('discord.js')
const { MessageContent, GuildMessages, Guilds } = GatewayIntentBits
const config = require('./settings')

// The configs vars
let channel = config.discordChannelId
const token = config.token


// create new discord client that can see what servers the bot is in, as well as the messages in those servers
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] })
client.login(token)

// load mineflayer
const mineflayer = require('mineflayer')

// bot options
const options = {
    host: config.host,
    port: config.port,
    username: config.username,
    auth: config.auth
}

// Join minecraft server
const bot = mineflayer.createBot(options)
bot.on('spawn', () => {
    console.log(`Mineflayer bot logged in as ${bot.username}`);
})

// When discord client is ready, send login message
client.once('ready', (c) => {
    console.log(`Discord bot logged in as ${c.user.tag}`)
    channel = client.channels.cache.get(channel)
    if (!channel) {
        console.log(`I could not find the channel (${process.argv[3]})!`)
        process.exit(1)
    }
})

client.on('messageCreate', (message) => {
    // Only handle messages in specified channel
    if (message.channel.id !== channel.id) return
    // Ignore messages from the bot itself
    if (message.author.id === client.user.id) return

    // Then send the message
    bot.chat(`#${message.channel.name} - ${message.author.username}: ${message.content}`)
})

// Redirect in-game messages to Discord channel
bot.on('chat', (username, message) => {
    // Ignore messages from the bot itsef
    if (username === bot.username) return

    channel.send(`${username}: ${message}`)
})