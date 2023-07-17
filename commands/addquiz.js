const { SlashCommandBuilder } = require("discord.js");
const Quiz = require("../schemas/question_schema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addquiz")
    .setDescription("Add the question and answer to the quiz.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question of the quiz.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("answer")
        .setDescription("The answer of the quiz.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const question = interaction.options.getString("question");
    const answer = interaction.options.getString("answer");
    const username = interaction.user.username;

    try {
      const existingQuestion = await Quiz.findOne({ question });
      if (existingQuestion) {
        await interaction.reply("Already have this question!");
          return;
      }
      const newQuiz = await Quiz.create({
        question : question,
        answer : answer,
        username : username,
      })
      await interaction.reply("Successfully added quiz!");
    } catch (error) {
    //   console.error("Error adding quiz:", error);
      await interaction.reply("Failed to add quiz. Please try again later.");
    }
  },
};
