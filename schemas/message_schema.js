const { Schema, model, models } = require('mongoose');

const messageSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    messageCount: {
        type: Number,
        required: true,
    }
});

const name = "messageSchema";

module.exports = models[name] || model(name, messageSchema);