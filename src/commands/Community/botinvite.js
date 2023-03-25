const { SlashCommandBuilder, EmbedBuilder} = require('discord.js'); //required Builders

module.exports = {
    data: new SlashCommandBuilder() //create a new Slashcommand
    .setName("botinvite") //name of the command
    .setDescription("Get a Botinvite"), //description of the command

    async execute(interaction) { //if interaction then....
        const embed = new EmbedBuilder() //create a new embed
        .setColor("Green") //color of the embed
        .setTitle("Bot invite") //Title of the embed
        .setURL("https://discord.com/api/oauth2/authorize?client_id=1046468420037787720&permissions=8&scope=bot%20applications.commands") //URL of the Title
        .setDescription("Invite the Bot!") //Description of the embed

        await interaction.reply({ embeds: [embed]}); //if interaction then reply with the embed
    }
}