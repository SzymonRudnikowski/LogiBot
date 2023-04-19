const { ActivityType } = require("discord.js")
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    let activities = [ `Developed by Szymi#9690`, `${client.user.username}`, `Markets` ], i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: ActivityType.Listening }), 22000);
}};
