const { get } = require("axios")
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription(`Get a cat picture online!`),
    async execute (interaction) {
        get("https://aws.random.cat/meow").then(function (response) {
        const e = new EmbedBuilder()
        .setTitle("Your Cat!")
        .setColor("Red")
        .setImage(response.data.file)
 
        interaction.reply({embeds:[e]})
    })
    }
}