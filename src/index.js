require("dotenv").config();
const Discord = require("discord.js");
const { WebhookClient, EmbedBuilder } = require("discord.js");
const client = new Discord.Client({
    intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates", "GuildMembers", "GuildPresences", "DirectMessages"],
    partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction],
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, Discord);
})
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
let distube = new DisTube(client, {
    leaveOnStop: false,
    leaveOnFinish: true,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true,
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin(),
    ],
});
client.player = distube
module.exports = client;
const errorChannel = new WebhookClient({ url: `${process.env.errorLogWebhook}` });
client.login(process.env.token);
process.on('unhandled`Rejection', async (reason, p) => {
    return errorChannel.send({
        embeds: [
            new EmbedBuilder()
                .setTitle("New unhandledRejection encounted")
                .setDescription(`\`\`\`${reason.stack}\`\`\``)
                .setFooter({text: "cheeka music"})
                .setColor("#f09999")
        ]
    })
});
process.on('uncaughtException', (reason, origin) => {
    return errorChannel.send({
        embeds: [
            new EmbedBuilder()
                .setTitle("New unhandledRejection encounted")
                .setDescription(`\`\`\`${reason.stack}\`\`\``)
                .setFooter({text: "cheeka music"})
                .setColor("#f09999")
        ],
    })
});
process.on('uncaughtExceptionMonitor', (reason, origin) => {
    return errorChannel.send({
        embeds: [
            new EmbedBuilder()
                .setTitle("New unhandledRejection encounted")
                .setDescription(`\`\`\`${reason.stack}\`\`\``)
                .setFooter({text: "cheeka music"})
                .setColor("#f09999")
        ],
    })
})

distube.on("finish", queue => queue.textChannel.send("Queue ended, leaving voice channel...").then(msg => {
    setTimeout(() => {
      msg.delete()
    }, 5000) 
  }));
  
  