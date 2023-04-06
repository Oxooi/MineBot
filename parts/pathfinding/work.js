const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow

class Work {
    constructor(bot) {
        this.bot = bot
        bot.loadPlugin(pathfinder)
    }

    async GoMineXTimes(blockName, miningTimes) {
        const mcData = require('minecraft-data')(this.bot.version);  // Get Minecraft data
        const movements = new Movements(this.bot, mcData);  // Set up movement options
        let count = 0;  // Keep track of how many blocks have been mined

        // Check if the specified block name exists
        if (!mcData.blocksByName[blockName]) {
            this.bot.chat(`The block ${blockName} does not exist.`);
            return;
        }

        // Try to find the block and mine it the specified number of times
        while (count < miningTimes) {
            // Try to find the block nearby
            const block = this.bot.findBlock({
                matching: mcData.blocksByName[blockName].id,  // Find block by its ID
                maxDistance: 500  // Set the maximum distance to search for the block
            });

            if (!block) {  // If block cannot be found
                this.bot.chat(`I do not see any ${blockName} nearby`);
                return;
            }

            // Set up pathfinder to move towards the block
            this.bot.pathfinder.setMovements(movements);
            const goal = new goals.GoalBlock(block.position.x, block.position.y, block.position.z);
            this.bot.pathfinder.setGoal(goal, true);

            this.bot.on('goal_reached', () => {
                this.bot.chat('I am on the block');
            });

            // Mine the block
            const oldBlockType = mcData.blocksByName[blockName].id;  // Set the block to be mined
            const newBlockType = mcData.blocksByName['air'].id;  // Set the block to replace the mined block

            const onBlockUpdate = (oldBlock, newBlock) => {
                if (oldBlock.type === oldBlockType && newBlock.type === newBlockType) {  // If block has been successfully mined
                    count++;  // Increment the counter
                    this.bot.removeListener('blockUpdate', onBlockUpdate);  // Stop listening for block updates
                }
            };
            this.bot.on('blockUpdate', onBlockUpdate);

            await new Promise((resolve) => setTimeout(resolve, 1000));  // Wait for 1 second before checking for nearby blocks

            // Check if there are any blocks nearby
            const nearbyBlock = this.bot.findBlock({
                matching: mcData.blocksByName[blockName].id,
                maxDistance: 20  // Set the maximum distance to search for the block
            });

            if (!nearbyBlock) {  // If no nearby blocks are found
                this.bot.chat(`There are no more nearby ${blockName} blocks, stopping mining.`);
                return;
            }
        }

        this.bot.chat(`I have mined ${count} ${blockName} blocks`);
        count = 0;  // Reset the counter
    }



}




module.exports.Work = Work;