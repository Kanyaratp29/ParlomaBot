// const { SlashCommandBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const Quiz = require("../schemas/question_schema.js");

// Load quiz questions from JSON file
const quizQuestions = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/quiz_questions.json')));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quiz')
    .setDescription('Take a random quiz question'),
  async execute(interaction) {
    const totalDocuments = await Quiz.countDocuments();
      const randomIndex = Math.floor(Math.random() * totalDocuments);
      const question = await Quiz.findOne().skip(randomIndex);

    await interaction.reply(question.question);
    // Wait for an answer from the user
    const filter = response => {
      return interaction.user.username === interaction.user.username;
    };
    interaction.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        const answer = collected.first().content.toLowerCase();
        if (answer === question.answer.toLowerCase()) {
          interaction.followUp('ถูกต้องจ้า เก่งมาก! :clap:');
        } else {
          interaction.followUp(`คำตอบก็คือ " ${question.answer} "`);
        }
      })
      .catch(() => {
        interaction.followUp('หมดเวลา!');
      });
  },
  // async execute(interaction) {
  //   // Pick a random question from the quizQuestions array
  //   const question = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  //   // Send the question to the user
  //   await interaction.reply(question.question);
  //   // Wait for an answer from the user
  //   const filter = response => {
  //     return interaction.user.username === interaction.user.username;
  //   };
  //   interaction.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
  //     .then(collected => {
  //       const answer = collected.first().content.toLowerCase();
  //       if (answer === question.answer.toLowerCase()) {
  //         interaction.followUp('ถูกต้องจ้า เก่งมาก! :clap:');
  //       } else {
  //         interaction.followUp(`คำตอบก็คือ " ${question.answer} "`);
  //       }
  //     })
  //     .catch(() => {
  //       interaction.followUp('หมดเวลา!');
  //     });
  // },
};
