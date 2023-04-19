const { EmbedBuilder, PermissionsBitField, version } = require("discord.js");
const { stripIndents } = require('common-tags');
const { BYTES_IN_KIB } = require('../../constants');
const { msToHumanReadableTime } = require('../../util');

const discordVersion = version.indexOf('dev') < 0 ? version : version.slice(0, version.indexOf('dev') + 3);
const discordVersionDocLink = `https://discord.js.org/#/docs/discord.js/v${ discordVersion.split('.')[0] }/general/welcome`;
const nodeVersionDocLink = `https://nodejs.org/docs/latest-${ process.version.split('.')[0] }.x/api/#`;

module.exports = {
    name: "stats",
    aliases: ["statistics"],
    cooldown: 10000,//1 second = 1000 ms / cooldown will be disabled if you will put 0.
    run: async (client, message, args) => {

        //Latency of the bot.
        const latency = Math.round(client.ws.ping);
        const sent = await message.reply({
            content: 'Pinging...',
            fetchReply: true
          });
        const fcLatency = sent.createdTimestamp - message.createdTimestamp;

        // Utility function for getting appropriate status emojis for ping.
        const getMsEmoji = (ms) => {
            let emoji = undefined;
    
            for (const [ key, value ] of Object.entries({
            250: '🟢',
            500: '🟡',
            1000: '🟠'
            })) if (ms <= key) {
            emoji = value;
            break;
            }
            return (emoji ??= '🔴');
        };

        //Memory variables.
        const memoryUsage = process.memoryUsage();
        const memoryUsedInMB = memoryUsage.heapUsed / BYTES_IN_KIB / BYTES_IN_KIB;
        const memoryAvailableInMB = memoryUsage.heapTotal
          / BYTES_IN_KIB / BYTES_IN_KIB;
        const objCacheSizeInMB = memoryUsage.external / BYTES_IN_KIB / BYTES_IN_KIB;

        // Replying to the message with our embed data.
        const statsEmbed = {
            color: 0x0099ff,
            title: 'Bot statics',
            author: {
                name: `${ client.user.tag }`,
                icon_url: client.user.displayAvatarURL(),
            },
            fields: [
                {
                    name: 'Latency',
                    value: stripIndents`
                      ${ getMsEmoji(latency) } **API Latency:** ${ latency } ms
                      ${ getMsEmoji(fcLatency) } **Full Circle Latency:** ${ fcLatency } ms
                    `,
                    inline: true
                },
                /* -> Optional space if u feel like adding one.
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                */
                {
                    name: 'Memory',
                    value: stripIndents`
                      💾 **Memory Usage:** ${ memoryUsedInMB.toFixed(2) }/${ memoryAvailableInMB.toFixed(2) } MB 
                      ♻️ **Cache Size:** ${ objCacheSizeInMB.toFixed(2) } MB
                    `,
                    inline: true
                },
                {
                    name: 'Uptime',
                    value: stripIndents`**📊 I've been online for ${ msToHumanReadableTime(Date.now() - client.readyTimestamp) }**`,
                    inline: false
                },
                {
                    name: 'System',
                    value: stripIndents`
                      ⚙️ **Discord.js Version:** [v${ discordVersion }](${ discordVersionDocLink })
                      ⚙️ **Node Version:** [${ process.version }](${ nodeVersionDocLink })
                    `,
                    inline: true
                },
                {
                    name: 'Stats',
                    value: stripIndents`
                      👪 **Servers:** ${ client.guilds.cache.size.toLocaleString('en-US') }
                      🙋 **Users:** ${ client.guilds.cache.reduce((previousValue, currentValue) => previousValue += currentValue.memberCount, 0).toLocaleString('en-US') }
                    `,
                    inline: true
                }
            ],
            footer: {
                text: 'Made with ❤️ by Szymi#9690',
            },
        };
        message.reply({ embeds: [statsEmbed] });
    }
 };