const { SlashCommandBuilder } = require('discord.js');
const blackjack = require("discord-blackjack")

// cant play now
module.exports = {
	data: new SlashCommandBuilder()
		.setName('blackjack')
		.setDescription("🚫 Can't play this game now"),
	async execute(interaction) {
		blackjack(interaction);
	},
};