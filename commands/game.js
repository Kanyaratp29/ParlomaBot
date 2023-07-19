const { SlashCommandBuilder } = require('discord.js');
const { Snake,Hangman, MatchPairs, Wordle, TwoZeroFourEight, FastType } = require("discord-gamecord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("game")
    .setDescription("Play game!")
    .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("Snake, Hangman, Match, Wordle, 2048, FastType")
      .setRequired(true)
    ),
  async execute(interaction) {
    const gameName = interaction.options.getString("name").toLowerCase();
    if(gameName == 'snake'){
      const Game = new Snake({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: "Snake Game",
            overTitle: "Game Over",
            color: "#5865F2",
          },
          emojis: {
            board: "⬛",
            food: "🍎",
            up: "⬆️",
            down: "⬇️",
            left: "⬅️",
            right: "➡️",
          },
          stopButton: "Stop",
          timeoutTime: 60000,
          snake: { head: "🟢", body: "🟩", tail: "🟢", over: "💀" },
          foods: ["🍎", "🍇", "🍊", "🫐", "🥕", "🥝", "🌽"],
          playerOnlyMessage: "Only {player} can use these buttons.",
        });
      Game.startGame();
      Game.on("gameOver", (result) => {
        console.log(result); // =>  { result... }
      });
    }
    if(gameName == 'hangman'){
      const Game = new Hangman({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: 'Hangman',
          color: '#5865F2'
        },
        hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
        // customWord: 'Gamecord',
        timeoutTime: 60000,
        // theme: 'nature',
        winMessage: 'You won! The word was **{word}**.',
        loseMessage: 'You lost! The word was **{word}**.',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });
      
      Game.startGame();
      Game.on('gameOver', result => {
        console.log(result);  // =>  { result... }
      });
    }
    if(gameName == 'match'){
      const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: 'Match Pairs',
          color: '#5865F2',
          description: '**Click on the buttons to match emojis with their pairs.**'
        },
        timeoutTime: 60000,
        emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
        winMessage: '**You won the Game! You turned a total of `{tilesTurned}` tiles.**',
        loseMessage: '**You lost the Game! You turned a total of `{tilesTurned}` tiles.**',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });
      
      Game.startGame();
      Game.on('gameOver', result => {
        console.log(result);  // =>  { result... }
      });
    }
    if(gameName == 'wordle'){
      const Game = new Wordle({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: 'Wordle',
          color: '#5865F2',
        },
        customWord: null,
        timeoutTime: 100000,
        winMessage: 'You won! The word was **{word}**.',
        loseMessage: 'You lost! The word was **{word}**.',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });
      
      Game.startGame();
      Game.on('gameOver', result => {
        console.log(result);  // =>  { result... }
      });
    }
    if(gameName == '2048'){
      const Game = new TwoZeroFourEight({
        message: interaction,
        isSlashGame: false,
        embed: {
          title: '2048',
          color: '#5865F2'
        },
        emojis: {
          up: '⬆️',
          down: '⬇️',
          left: '⬅️',
          right: '➡️',
        },
        timeoutTime: 60000,
        buttonStyle: 'PRIMARY',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });
      
      Game.startGame();
      Game.on('gameOver', result => {
        console.log(result);  // =>  { result... }
      });
    }
    if(gameName == 'fasttype'){
      const Game = new FastType({
        message: interaction,
        isSlashGame: false,
        embed: {
          title: 'Fast Type',
          color: '#5865F2',
          description: 'You have {time} seconds to type the sentence below.'
        },
        timeoutTime: 60000,
        sentence: 'Some really cool sentence to fast type.',
        winMessage: 'You won! You finished the type race in {time} seconds with wpm of {wpm}.',
        loseMessage: 'You lost! You didn\'t type the correct sentence in time.',
      });
      
      Game.startGame();
      Game.on('gameOver', result => {
        console.log(result);  // =>  { result... }
      });
    }
  },
};
