const { EmbedBuilder } = require("discord.js");

module.exports = {
    event: "interactionCreate",
    run: async (interaction, client) => {
        if (!interaction.isStringSelectMenu()) return;
    if (!interaction.customId.startsWith("help_")) return;
    let owner_id = interaction.customId.split("_")[1];
    if (interaction.member.id !== owner_id)
      return interaction.reply({
        content: "You are not the owner of this help menu.",
        ephemeral: true,
      });
    let category = interaction.values[0].split("_")[1];
    // Get all the commands
    let Ccommands = Array.from(client.commands.values());
    let commands = Ccommands.filter((command) => {
      return command.category === category;
    });
    // Now edit the message to show the commands
    let embed = new EmbedBuilder()
      .setColor("Blurple")
      .setTitle("Help | " + category);
    // For each command in the category, add it to the embed
    let toBuildString = "";
    for (let i = 0; i < commands.length; i++) {
      let command = commands[i];
      toBuildString += `**${command.name}** - ${command.description} ${
        command.permissions ? `\`[${command.permissions.join(", ")}]\`` : ""
      } ${command.voicechannel ? "VC Only" : ""}\n`;
    }
    embed.setDescription(toBuildString);
    // Send the embed
    await interaction.deferUpdate();
    await interaction.message.edit({
      embeds: [embed],
    });
    }
}