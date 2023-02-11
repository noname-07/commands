const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Bekomme Infos über den Server"),
    
    async execute(interaction) {

        const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setTitle("membercount")
        .addFields({ name: "Members:", value: `${interaction.guild.memberCount}`})
        return await interaction.reply({embeds: [embed]})
    }
}

