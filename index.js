const mineflayer = require('mineflayer');
const mcData = require('minecraft-data')('1.19')
const { FindeMe } = require('./parts/pathfinding/findeme.js');
const config = require('./settings')

// Creation d'un bot Minecraft avec l'adresse IP et le nom d'utilisateur spécifiés
const bot = mineflayer.createBot(options)

// Création d'une instance FinderMe pour chercher un joueur
const findMe = new FindeMe(bot, mcData);

// Ecoute des messages de chat du joueur
bot.on('chat', (username, message) => {
    // Si le message vient du bot, on ignore
    if (username === bot.username) return

    switch (message) {
        // Si le message contient « suis moi » suivi du nom du bot, on suit le joueur spécifié   
        case bot.username + ' suis moi':
            findMe.followPlayer(config.playername)
            break;
        case bot.username + ' coords':
            findMe.getCoords()
            break;
        case bot.username + ' distance':
            findMe.getDistance(config.playername)
            break;
        default:
            break;
    }
})