const {EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription("Stats von dem Bot"),

    async execute (interaction) {
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Stats")
        .addFields({name:"Last Update:", value:"`21.01.2023`", inline:true})
        .addFields({name:"Discord JS:", value:"`V14`", inline:true})
        .addFields({name:"Language:", value:"`German/Deutsch`", inline:true})
        .addFields({name:"Owner:", value:"<@931870926797160538>", inline:true})
        .addFields({name:"Support:", value:"https://dsc.gg/coding-de", inline:true})
        
        await interaction.reply({embeds: [embed]})
    }
}