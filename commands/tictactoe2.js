const { Client, Intents, MessageEmbed, MessageButton, MessageActionRow, SlashCommandBuilder } = require('discord.js');

// Tic Tac Toe game class
class TicTacToe {
    constructor() {
      this.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      this.player = "X";
    }
  
    drawBoard() {
      return (
        `${this.board[0]} | ${this.board[1]} | ${this.board[2]}\n` +
        `${this.board[3]} | ${this.board[4]} | ${this.board[5]}\n` +
        `${this.board[6]} | ${this.board[7]} | ${this.board[8]}`
      );
    }
  
    makeMove(position) {
      if (this.board[position] == " ") {
        this.board[position] = this.player;
        if (this.player == "X") {
          this.player = "O";
        } else {
          this.player = "X";
        }
        return true;
      } else {
        return false;
      }
    }
  
    checkWinner() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let combo of winningCombinations) {
        if (
          this.board[combo[0]] == this.board[combo[1]] &&
          this.board[combo[1]] == this.board[combo[2]] &&
          this.board[combo[0]] != " "
        ) {
          return true;
        }
      }
      return false;
    }
  }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tictactoe2')
		.setDescription('Start a game of Tic Tac Toe.'),
	async execute(interaction) {
      // Tic Tac Toe game instance
      const game = new TicTacToe();
  
      await interaction.reply({
        content: "Welcome to Tic Tac Toe! To make a move, click on a button below.\n" +
          "The game board is:\n" +
          `${game.drawBoard()}`,
        components: [
          new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId('1')
                .setLabel(game.board[0])
                .setStyle('PRIMARY')
                .setDisabled(game.board[0] !== ' '),
              new MessageButton()
                .setCustomId('2')
                .setLabel(game.board[1])
                .setStyle('PRIMARY')
                .setDisabled(game.board[1] !== ' '),
              new MessageButton()
                .setCustomId('3')
                .setLabel(game.board[2])
                .setStyle('PRIMARY')
                .setDisabled(game.board[2] !== ' '),
            ),
          new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId('4')
                .setLabel(game.board[3])
                .setStyle('PRIMARY')
                .setDisabled(game.board[3] !== ' '),
              new MessageButton()
                .setCustomId('5')
                .setLabel(game.board[4])
                .setStyle('PRIMARY')
                .setDisabled(game.board[4] !== ' '),
              new MessageButton()
                .setCustomId('6')
                .setLabel(game.board[5])
                .setStyle('PRIMARY')
                .setDisabled(game.board[5] !== ' '),
            ),
          new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId('7')
                .setLabel(game.board[6])
                .setStyle('PRIMARY')
                .setDisabled(game.board[6] !== ' '),
              new MessageButton()
                .setCustomId('8')
                .setLabel(game.board[7])
                .setStyle('PRIMARY')
                .setDisabled(game.board[7] !== ' '),
              new MessageButton()
                .setCustomId('9')
                .setLabel(game.board[8])
                .setStyle('PRIMARY')
                .setDisabled(game.board[8] !== ' '),
            ),
        ],
      });
      const filter = (i) => i.customId >= 1 && i.customId <= 9;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
  
      collector.on('collect', async (buttonInteraction) => {
        const position = parseInt(buttonInteraction.customId) - 1;
  
        if (game.makeMove(position)) {
            if (game.checkWinner()) {
              const winner = game.player === 'X' ? 'O' : 'X';
              await interaction.update({
                content: `Congratulations, ${winner} won the game!`,
                components: []
              });
              delete ongoingGames[interaction.message.id];
            } else if (game.board.indexOf(' ') === -1) {
              await interaction.update({
                content: `Game over! The game is tied.`,
                components: []
              });
              delete ongoingGames[interaction.message.id];
            } else {
              game.switchPlayer();
              await interaction.update({
                content: `It is now ${game.player}'s turn.`,
                components: [
                  new MessageActionRow()
                    .addComponents(
                      new MessageButton()
                        .setCustomId('1')
                        .setLabel(game.board[0])
                        .setStyle('PRIMARY')
                        .setDisabled(game.board[0] !== ' '),
                      new MessageButton()
                        .setCustomId('2')
                        .setLabel(game.board[1])
                        .setStyle('PRIMARY')
                        .setDisabled(game.board[1] !== ' '),
                      new MessageButton()
                        .setCustomId('3')
                        .setLabel(game.board[2])
                        .setStyle('PRIMARY')
                        .setDisabled(game.board[2] !== ' '),
                    ),
                  new MessageActionRow()
                    .addComponents(
                      new MessageButton()
                        .setCustomId('4')
                        .setLabel(game.board[3])
                        .setStyle('PRIMARY')
                        .setDisabled(game.board[3] !== ' '),
                      new MessageButton()
                        .setCustomId('5')
                        .setLabel(game.board[4])
                        .setStyle('PRIMARY')
                        .setDisabled(game.board[4] !== ' '),
                      new MessageButton()
                        .setCustomId('6')
                        .setLabel(game.board[5])
                        .setStyle('PRIMARY')
                        .setDisabled(game.board[5] !== ' '),
                    ),
                  new MessageActionRow()
                    .addComponents(
                      new MessageButton()
                        .setCustomId('7')
                        .setLabel(game.board[6])
                        .setStyle('PRIMARY')
                        .setDisabled(game.board[6] !== ' '),
                      new MessageButton()
                        .setCustomId('8')
                        .setLabel(game.board[7])
                        .setStyle('PRIMARY')
                        .setDisabled(game.board[7] !== ' '),
                      new MessageButton()
                        .setCustomId('9')
                        .setLabel(game.board[8])
                        .setStyle('PRIMARY')
                        .setDisabled(game.board[8] !== ' '),
                    ),
                ],
              });
            }
          }
        })
	},
};