const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { supportLink } = require('../../constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("Discord server related to the bot support."),
    // more advanced guide: https://discordjs.guide/slash-commands/advanced-creation.html
    run: async (client, interaction) => {
        const supportEmbed = {
            color: 0x0099ff,
            title: 'LogiBot Discord Support Server:',
            description: `[Join the LogiBot support server : )](${ supportLink })`
        }
        
        interaction.reply({ embeds: [supportEmbed] });
    }
};