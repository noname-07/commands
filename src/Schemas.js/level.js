const { model, Schema } = require('mongoose');

let levelSchema = new Schema({
    GuildID: String,
    User: String,
    XP: Number,
    Level: Number
})

module.exports = model('level', levelSchema);