const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { sso } = require('../../sso');

module.exports = {
    name: "auth",
    aliases: ["authenticate"],
    cooldown: 1000,//1 second = 1000 ms / cooldown will be disabled if you will put 0.
    run: async (client, message, args) => {
        sso();
        console.log('command sso run');
    }
 };