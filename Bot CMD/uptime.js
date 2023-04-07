const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription(`Shows the uptime of the Bot`),

    async execute (interaction, client) {
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60

        const embed = new EmbedBuilder()
        .setTitle(`Uptime of: ${client.user.username}`)
        .setColor("Green")
        .setTimestamp()
        .addFields({ name: "Days: ", value: `${days}`, inline: false})
        .addFields({ name: "Hours: ", value: `${hours}`, inline: false})
        .addFields({ name: "Minutes: ", value: `${minutes}`, inline: false})
        .addFields({ name: "Seconds: ", value: `${seconds}`, inline: false})

        interaction.reply({ embeds: [embed] });

    }
}