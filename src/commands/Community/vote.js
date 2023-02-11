const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Vote für den Bot!'),

    async execute (interaction) {
        const embed = new EmbedBuilder()
        .setTitle('Click here to vote!')
        .setColor("D71559")
        .setURL("https://top.gg/bot/1046468420037787720/vote")

        await interaction.reply({ embeds: [embed] })
    }
}