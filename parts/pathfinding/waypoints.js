const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow
const fs = require('fs');
const yaml = require('js-yaml');

class Waypoints {

    constructor(bot) {
        this.bot = bot;
        const mcData = require('minecraft-data')(bot.version);
        this.movements = new Movements(bot, mcData);  // Set up movement options
        bot.loadPlugin(pathfinder);  // Load pathfinding plugin
    }

    // Set the home waypoint and save it to a YAML file
    setHome(filePath) {

        const { x: posX, y: posY, z: posZ } = this.bot.entity.position.toFixed(2);  // Get current position
        const data = {
            home: {
                x: posX,
                y: posY,
                z: posZ,
            }
        };

        const yamlString = yaml.dump(data);  // Convert data to YAML string
        fs.writeFile(filePath, yamlString, (err) => {  // Write YAML string to file asynchronously
            if (err) throw err;
            console.log('The file has been saved!');
        });

    }

    // Load the home waypoint from a YAML file and navigate to it using pathfinding
    getHome(filePath) {

        const fileContents = fs.readFileSync(filePath, 'utf-8');  // Read YAML file contents
        const data = yaml.load(fileContents);  // Parse YAML data
        const { home: { x: xValue, y: yValue, z: zValue } } = data;  // Get x, y, z values for home waypoint

        this.bot.pathfinder.setMovements(this.movements);  // Set up pathfinding movements
        const goal = new goals.GoalBlock(xValue, yValue, zValue);  // Set the goal to the home waypoint
        this.bot.pathfinder.setGoal(goal, true);  // Start pathfinding

    }

}


module.exports.Waypoints = Waypoints;