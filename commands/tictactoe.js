const { SlashCommandBuilder } = require('discord.js');
const TicTacToe = require('discord-tictactoe');

const game = new TicTacToe({ language: 'en', commandOptionName: 'user' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tictactoe')
		.setDescription('Play tic tac toe with AI!'),
	async execute(interaction) {
		game.handleInteraction(interaction);
	},
};