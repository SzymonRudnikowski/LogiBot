const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { supportLink } = require('../../constants');

module.exports = {
    name: "support",
    aliases: ["help"],
    cooldown: 1000,//1 second = 1000 ms / cooldown will be disabled if you will put 0.
    run: async (client, message, args) => {
        const supportEmbed = {
            color: 0x0099ff,
            title: 'LogiBot Discord Support Server:',
            description: `[Join the LogiBot support server : )](${ supportLink })`
        }
        
        message.reply({ embeds: [supportEmbed] });
    
    }
};