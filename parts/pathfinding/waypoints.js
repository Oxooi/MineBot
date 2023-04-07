const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow
const fs = require('fs');
const yaml = require('js-yaml');

class Waypoints {

    constructor(bot) {
        this.bot = bot
        bot.loadPlugin(pathfinder)
    }

    setHome(filePath){

        const posX = this.bot.entity.position.x.toFixed(2)
        const posY = this.bot.entity.position.y.toFixed(2)
        const posZ = this.bot.entity.position.z.toFixed(2)

        const data = {
            home: {
                x: posX,
                y: posY,
                z: posZ,
            }
        };

        const yamlString = yaml.dump(data);
        fs.writeFileSync(filePath, yamlString);

    }

    getHome(filePath){
        
        const mcData = require('minecraft-data')(this.bot.version);  // Get Minecraft data
        const movements = new Movements(this.bot, mcData);  // Set up movement options

        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const data = yaml.load(fileContents);
        const xValue = data.home.x;
        const yValue = data.home.y;
        const zValue = data.home.z;

        this.bot.pathfinder.setMovements(movements);
        const goal = new goals.GoalBlock(xValue, yValue, zValue);
        this.bot.pathfinder.setGoal(goal, true);
        
    }

}


module.exports.Waypoints = Waypoints;