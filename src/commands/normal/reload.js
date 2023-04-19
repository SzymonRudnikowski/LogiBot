const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../../config.js");

module.exports = {
    name: "reload",
    aliases: ["refresh"],
    cooldown: 0,//1 second = 1000 ms / cooldown will be disabled if you will put 0.
    run: async (client, message, args) => {
        if (message.author.id != config.owner) return message.reply("You are not the developer of the bot! **Please contact Szymi#9690 if something is not working.**")

        if (!args || args.length < 1) return message.reply("Must provide a command name to reload.");
        const commandName = args[0];
        // Check if the command exists and is valid
        if (!client.commands.has(commandName)) {
          return message.reply("That command does not exist");
        }
        // the path is relative to the *current folder*, so just ./filename.js
        delete require.cache[require.resolve(`./${commandName}.js`)];
        // We also need to delete and reload the command from the client.commands Enmap
        client.commands.delete(commandName);
        const props = require(`./${commandName}.js`);
        client.commands.set(commandName, props);
        message.reply(`The command ${commandName} has been reloaded.`);
        console.log(`The command ${commandName} has been reloaded.`);
    }
 };
