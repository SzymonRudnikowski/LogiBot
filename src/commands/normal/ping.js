const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["pong"],
    cooldown: 10000,//1 second = 1000 ms / cooldown will be disabled if you will put 0.
    run: async (client, message, args) => {
      message.reply(`Pong 🏓`)
    }
 };
