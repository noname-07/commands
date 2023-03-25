const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription("Get help"),
    
    async execute (interaction) {

        const embed = new EmbedBuilder()
        .setTitle("Click here for a list of all commands!")
        .setURL("https://www.toowake.de/aurabot/")
        .setDescription("This link would open the Browser with a list of all commands")
        
        return interaction.reply({ embeds: [embed]}).catch(err => {
            return;
        });
    }
}