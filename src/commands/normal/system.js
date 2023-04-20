const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { findOneSystem } = require("@eve-data/systems");
const { stripIndents } = require('common-tags');
const { round } = require("lodash");


module.exports = {
    name: "system",
    aliases: ["systems"],
    cooldown: 1000,//1 second = 1000 ms / cooldown will be disabled if you will put 0.
    run: async (client, message, args) => {

        if (!args || args.length < 1) return message.reply("You must provide a system name.");

        const system = args[0];
        const req = findOneSystem({ name: system });
        const secClass = req.securityClass;
        const secStat = round(req.securityStatus, 3);
        const effect = req.effect;
        const classWH = req.whClass;

        const getSecEmoji = (secClass) => {
            let emoji = undefined;
            
            if (secClass == 'HIGH') {
                emoji = '🟢'
            } 
            if (secClass == 'WH') {
                emoji = '🎇'
            }
            if (secClass == 'LOW') {
                emoji = '🟠'
            }
            if (secClass == 'NULL') {
                emoji = '🔴'
            }

            return emoji;
        };

        const checkIfWH = (effect) => {
            if (effect == null) {
                return 'Not a WH';
            } else {
                return effect.name;
            }

        };

        const checkIfWH2 = (classWH) => {
            if (classWH == null) {
                return 'Not a WH';
            } else {
                return classWH;
            }

        };


        const systemEmbed = {
            color: 0x0099ff,
            title: `System ${req.name}`,
            fields: [
                {
                    name: 'Security',
                    value: stripIndents`
                        ${ getSecEmoji(secClass) } **Security Class:** ${ req.securityClass }
                        ${ getSecEmoji(secClass) } **Security Status:** ${ secStat }
                    `,
                    inline: false,
                },
                {
                    name: 'WH Data:',
                    value: stripIndents`
                        **🔆 Class:** ${ checkIfWH2(classWH) }
                        **🔥 Effect:** ${ checkIfWH(effect) }
                        **📌 Statics:** ${ req.staticConnections }
                    `,
                    inline: false,
                },
                {
                    name: 'Region:',
                    value: stripIndents`
                       **🗺️ Region:** ${ req.region.name }
                       **🌌 Constelation:** ${ req.constellation.name }
                    `,
                    inline: false,
                },
            ],
            footer: {
                text: 'Made with ❤️ by Szymi#9690',
            },
        }
        
        message.reply({ embeds: [systemEmbed] });
        console.log(req);
    }
};