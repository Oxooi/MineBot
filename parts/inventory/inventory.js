const mineflayer = require('mineflayer')
const inventoryViewer = require('mineflayer-web-inventory') 

class BotInventory {
    constructor (bot) {
        this.bot = bot
    }

    displayInv(bot){
        inventoryViewer(bot)
    }
}


module.exports.BotInventory = BotInventory;