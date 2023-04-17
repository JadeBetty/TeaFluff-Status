const { EmbedBuilder } = require("discord.js");
module.exports = {
    event: "presenceUpdate",
    run: async (oP, nP, client) => {
        if(!oP) oP = "No status"
        if (oP.status === nP.status) return;
        if (nP.userId === "758617912566087681") {
            const channel = await nP.member.guild.channels.cache.get("1014017712609046631");
            if (nP.status === "online") {
                return channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(`TeaFluff Status has been changed`)
                        .setDescription(`> TeaFluff Status went from **${oP.status === null || oP.status === undefined ? "No Old Status" : oP.status}** to **${nP.status}**`)
                        .setColor("#a8f1b0")
                        .setTimestamp()
                    ]
                })
            } else if(nP.status === "offline") {
                return channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(`TeaFluff Status has been changed`)
                        .setDescription(`> TeaFluff Status went from **${oP.status === null || oP.status === undefined ? "No Old Status" : oP.status}** to **${nP.status}**`)
                        .setColor("#f09999")
                        .setTimestamp()
                    ]
                })
            }
        }
    }
} 