const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow


class Work {
    constructor(bot) {
        this.bot = bot
        bot.loadPlugin(pathfinder)
    }

    GoMine(block) {

    }

}


module.exports.Work = Work;