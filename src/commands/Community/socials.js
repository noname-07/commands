const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('socials')
    .setDescription('Link zu meinen Sozialen Netzwerken'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
        .setTitle("click here to go to my socials")
        .setURL("https://linktr.ee/toowake_")
        .setDescription("Thanks for your Support!")

        await interaction.reply({ embeds: [embed]})

    }
}