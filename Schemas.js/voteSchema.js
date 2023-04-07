const { model, Schema } = require("mongoose");
 
let voteSchema = new Schema({
    Up: String,
    Down: String,
    User: String,
    Guild: String,
})
 
module.exports = model("voteSchema", voteSchema);