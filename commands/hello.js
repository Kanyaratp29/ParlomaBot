const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Say hi!'),
	async execute(interaction) {
		await interaction.reply('Hi! How are you today?');
	},
};