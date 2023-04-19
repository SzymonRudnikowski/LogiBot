const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { inviteLink } = require('../../constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite the LogiBot to your server!"),
    // more advanced guide: https://discordjs.guide/slash-commands/advanced-creation.html
    run: async (client, interaction) => {
        const inviteEmbed = {
            color: 0x0099ff,
            title: 'LogiBot invitation link:',
            description: `[Add me to your server : )](${ inviteLink })`
        }
        
        interaction.reply({ embeds: [inviteEmbed] });
    }
};

