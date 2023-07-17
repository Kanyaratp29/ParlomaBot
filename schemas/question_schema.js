const { Schema, model, models } = require('mongoose');

const quizSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

const name = "quizs";

module.exports = models[name] || model('Quiz', quizSchema);

const QuizModel = model('Quiz', quizSchema);