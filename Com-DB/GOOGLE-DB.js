const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('sheetdb')
    .setDescription('sheet db tutorial')
    .addStringOption(option => option.setName("name").setDescription(`This is a name`).setRequired(true))
    .addStringOption(option => option.setName("age").setDescription(`This is a age`).setRequired(true))
    .addStringOption(option => option.setName("email").setDescription(`This is a email`).setRequired(true)),
    async execute(interaction) {
 
        await interaction.reply({ content: `This is working`,ephemeral: true });
 
        const name = interaction.options.getString("name");
        const age = interaction.options.getString("age");
        const email = interaction.options.getString("email");
 
        axios.post('your sheet db url here', {
            data: {
                name: `${name}`,
                age: `${age}`,
                email: `${email}`
            }
        })
    }
}