const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow


class FindeMe {
    
    constructor(bot) {
        this.bot = bot
        bot.loadPlugin(pathfinder)
    }

    followPlayer(playerName) {
        const player = this.bot.players[playerName]
        const mcData = require('minecraft-data')(this.bot.version)
        const movements = new Movements(this.bot, mcData)

        if (!player) {
            this.bot.chat(`Player ${playerName} not found`)
            return
        }

        this.bot.pathfinder.setMovements(movements)

        const goal = new GoalFollow(player.entity, 1)
        this.bot.pathfinder.setGoal(goal, true)
    }

    stopFollow() {
        this.bot.pathfinder.setGoal(null)
    }

    getCoords() {

        let posX = this.bot.entity.position.x.toFixed(2)
        let posY = this.bot.entity.position.y.toFixed(2)
        let posZ = this.bot.entity.position.z.toFixed(2)

        this.bot.chat(`Je suis en X: ${posX} Y: ${posY} Z: ${posZ}.`);
    }

    distance(botX, botY, botZ, playerX, playerY, playerZ) {
        const dx = botX - playerX;
        const dy = botY - playerY;
        const dz = botZ - playerZ;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    getDistance(playerName) {
        const player = this.bot.players[playerName]

        if (!player) {
            this.bot.chat(`Player ${playerName} not found`)
            return
        }

        const botX = this.bot.entity.position.x.toFixed(2)
        const botY = this.bot.entity.position.y.toFixed(2)
        const botZ = this.bot.entity.position.z.toFixed(2)
        const playerX = player.entity.position.x.toFixed(2)
        const playerY = player.entity.position.y.toFixed(2)
        const playerZ = player.entity.position.z.toFixed(2)

        const diffDistance = this.distance(botX, botY, botZ, playerX, playerY, playerZ)

        // Make a switch case for the distance
        switch (true) {
            case diffDistance > 10:
                this.bot.chat(`Je suis à ${Math.floor(diffDistance)} blocs de toi.`)
                break;
            case diffDistance > 5:
                this.bot.chat(`Je suis à ${Math.floor(diffDistance)} blocs de toi.`)
                break;
            case diffDistance > 2:
                this.bot.chat(`Je suis à ${Math.floor(diffDistance)} blocs de toi.`)
                break;
            default:
                this.bot.chat(`Je suis à côté de toi.`)
                break;
        }

    }


}


module.exports.FindeMe = FindeMe;