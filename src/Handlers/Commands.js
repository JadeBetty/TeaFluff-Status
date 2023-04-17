module.exports = async (client) => {
	const fs = require('fs');

	const commandFolders = fs.readdirSync('./src/Commands').forEach(folder => {
		// let commands = filesConfig(`./src/commands/${folder}`, ".js");
		let commands = fs
			.readdirSync(`./src/Commands/${folder}`)
			.filter(file => file.endsWith('.js'));

		commands.forEach(f => {
			const command = require(`../Commands/${folder}/${f}`);
			client.commands.set(command.name, command);
		});
	});

	console.log(`Successfully loaded ${client.commands.size} commands!`);
}