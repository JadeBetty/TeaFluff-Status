
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
module.exports = {
  name: "help",
  category: "General",
  description: "Help",
  run: async (client, message, args) => {
     let commands = Array.from(client.commands.values());
    // Commands is a array of commands, commands consists of name, description, aliases, category
    // Group commands by each category
    let categories = commands.reduce((acc, command) => {
      if (!acc[command.category]) {
        acc[command.category] = [];
      }
      acc[command.category].push(command);
      return acc;
    }, {});
    let embed = new EmbedBuilder()
      .setColor('Blurple')
      .setTitle('Select category')
      .setDescription(
        'Please select a category from the selection menu given below to view commands.',
      );
    let cat = Object.keys(categories).map(category => {
      if(!category) category = `Default`;
      return {
        label: category,
        value: 'help_' + category,
      };
    });
    let menu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('help_' + message.member.id)
        .setPlaceholder('Nothing selected')
        .addOptions(cat),
    );
    // Send the message embed to the channel and attach a selection menu with all the categories.
    try {
      await message.reply({
        embeds: [embed],
        components: [menu],
      });
    } catch (e) {
      return;
    }
  }

}
