const Discord = require("discord.js")
module.exports = {
    event: "ready",
    run: async (a, client) => {
        console.log(`${client.user.tag}`)
        const activities = [
            { name: `over TeaFluff`, type: Discord.ActivityType.Watching }, //[1]
            { name: `Music`, type: Discord.ActivityType.Listening }, //[2]
          ];

          setInterval(() => {
            const status = activities[Math.floor(Math.random() * activities.length)]
             client.user.setActivity(`${status.name}`, { type: status.type },);
          }, 10000)
    }
}