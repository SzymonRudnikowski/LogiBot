const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { inviteLink } = require('../../constants');

module.exports = {
    name: "invite",
    aliases: ["invitation"],
    cooldown: 10000,//1 second = 1000 ms / cooldown will be disabled if you will put 0.
    run: async (client, message, args) => {
        const inviteEmbed = {
            color: 0x0099ff,
            title: 'LogiBot invitation link:',
            description: `[Add me to your server : )](${ inviteLink })`
        }
        
        message.reply({ embeds: [inviteEmbed] });
    }
 };