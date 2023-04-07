# minebot

This is a simple Minecraft bot created using [mineflayer](https://github.com/PrismarineJS/mineflayer) that can be controlled using [Discord.js](https://discord.js.org/) and performs actions such as mining and collecting blocks.

### Installation

1. Clone or download this repository.
2. Install [Node.js](https://nodejs.org/en/) if you haven't already.
3. Open a terminal in the repository folder and run `npm install` to install the required dependencies.
4. Rename `config.example.js` to `config.js` and fill in the required fields. (In the root folder & ./parts/discord/config.example.js)
5. Run the bot by executing `node index.js`.

### Dependencies

This bot requires the following dependencies:

- [discord.js](https://www.npmjs.com/package/discord.js) (`^14.9.0`)
- [minecraft-data](https://www.npmjs.com/package/minecraft-data) (`^3.31.0`)
- [mineflayer](https://www.npmjs.com/package/mineflayer) (`^4.8.1`)
- [mineflayer-collectblock](https://www.npmjs.com/package/mineflayer-collectblock) (`^1.4.1`)
- [mineflayer-pathfinder](https://www.npmjs.com/package/mineflayer-pathfinder) (`^2.4.2`)
- [mineflayer-web-inventory](https://www.npmjs.com/package/mineflayer-web-inventory) (`^1.8.4`)
- [vec-3](https://www.npmjs.com/package/vec3) (`^0.1.8`)
- [js-yaml](https://www.npmjs.com/package/js-yaml) (`^4.1.0`)