const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('random number'),
	async execute(interaction) {
        const number = ["1","2","3","4","5","6","7","8","9","10"]
		await interaction.reply(number[Math.floor(Math.random()*number.length)]);
	},
};