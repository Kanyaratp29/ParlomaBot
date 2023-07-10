const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('random number')
		.addStringOption((option) =>
		option
		.setName("from")
		.setDescription("The number you want to start in random.")
		.setRequired(true))
		.addStringOption((option) =>
		option
		.setName("to")
		.setDescription("The last number you want in random.")
		.setRequired(true)),
	async execute(interaction) {
		const startNumber = parseInt(interaction.options.getString("from"));
  		const endNumber = parseInt(interaction.options.getString("to"));
		const numberLength = endNumber - startNumber + 1;
		const numbers = [];

		for(i = startNumber; i <= endNumber; i++){
			numbers.push(i);
		}

		const randomIndex = Math.floor(Math.random() * numberLength);
		const randomNumber = numbers[randomIndex];

		// await interaction.reply(randomNumber);
		await interaction.reply({ content: String(randomNumber), ephemeral: true });
	},
};