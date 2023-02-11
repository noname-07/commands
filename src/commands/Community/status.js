const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Bot Status'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle("Status")
        .setDescription("Bot Status")
        .addFields({ name: "Hosting:", value:"GermanHub"})
        .addFields({ name: "Coding Language:", value:"JavaScript"})
        .addFields({ name: "Discord JS:", value: "Discord JS v14"})
        .addFields({ name: "Creator:", value: "toowake#0001"})
        .addFields({ name: "Status:", value: "online"})
        .addFields({ name: "Problems:", value: "Keine Probleme gefunden!"})


        await interaction.reply({ embeds: [embed]})
    } 
}