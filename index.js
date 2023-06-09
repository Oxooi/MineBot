const mineflayer = require('mineflayer');
const mcData = require('minecraft-data')('1.19');
const { FindeMe } = require('./parts/pathfinding/findeme.js');
const { Work } = require('./parts/pathfinding/work.js');
const { BotInventory } = require('./parts/inventory/inventory.js');
const { Waypoints } = require('./parts/pathfinding/waypoints.js');
const config = require('./config');
const fs = require('fs');
const yaml = require('js-yaml');
const { log } = require('console');

// Create a Minecraft bot with the specified IP address and username
const bot = mineflayer.createBot(config);

// Create a FinderMe instance to search for players
const findMe = new FindeMe(bot, mcData);
const work = new Work(bot);
const waypoints = new Waypoints(bot);
const botInventory = new BotInventory(bot);

// Listen for bot connection
bot.on('spawn', () => {

    // Create a config file for the bot
    const botName = bot.username
    const fileName = (`${botName}.yml`)
    const filePath = (`./bots/${fileName}`)

    try {
        // If the file don't exists,  create it
        if (!fs.existsSync(filePath)) {
            // Create a new file
            fs.appendFile(filePath, '', function (err) {
                if (err) throw err;
                console.log(`File ${fileName} created`);
            });
        } else {
            // If the file exists, log it
            console.log(`File ${fileName} loaded`);
        }
    } catch (error) {
        console.error(error)
    }
})


// Listen for chat messages and handle commands
bot.on('chat', (username, message) => {

    // Create a config file for the bot
    const botName = bot.username
    const fileName = (`${botName}.yml`)
    const filePath = (`./bots/${fileName}`)

    // Split the chat message into arguments
    const args = message.split(' ');

    // Ignore the message if it was sent by the bot itself
    if (username === bot.username) {
        return;
    }

    // Handle commands
    switch (args[1]) {

        // Mine the specified block a certain number of times
        case 'mine':
            const count = args[2];
            const blockName = args[3];
            work.GoMineXTimes(blockName, count);
            break;

        // Follow a player, default to the sender if no player name is provided
        case 'follow':
            const playername = args[2] || username;
            findMe.followPlayer(playername);
            break;

        // Stop following any player being followed
        case 'stop':
            findMe.stopFollow();
            break;

        // Get the coordinates of the closest player being followed
        case 'coords':
            findMe.getCoords();
            break;

        // Get the distance between the bot and the specified player
        case 'distance':
            findMe.getDistance(config.playername);
            break;

        case 'sethome':
            waypoints.setHome(filePath);
            break;

        case 'gethome':
            waypoints.getHome(filePath);
            break;

        case 'inv':
            botInventory.displayInv(bot);
            break;

        // If the command is not recognized, do nothing
        default:
            break;
    }
});
