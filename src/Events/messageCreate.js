const { EmbedBuilder } = require("discord.js");

const config = require("../../config.json");

module.exports = {
    event: "messageCreate",
    run: async (message, client) => {

        if (
            message.author?.bot ||
            !message.guild ||
            !message.content.startsWith(config.prefix)
        )
            return;
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();
        const command =
            client.commands.get(cmd) ||
            client.commands.find((a) => a.aliases && a.aliases.includes(cmd))



        if (!command) {
            return console.log("No command founded.");
        }



        if (command.voicechannel) {
            if (!message?.member?.voice?.channelId) return message.reply(`Please connect to a voice channel first before using the ${command.name} command!`);
        }



        try {
            await command.run(client, message, args).then(async (res) => {
                if (command.deleteTrigger) {
                    setTimeout(async () => {
                        await message.delete().catch((err) => { console.error(err) });
                    }, 1000)
                }
            });
        } catch (err) {
            console.log(err);
        }

    }
}