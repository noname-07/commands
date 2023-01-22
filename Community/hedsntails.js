const {SlashCommandBuilder, EmbedBuilder, Embed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription("werfe einen Coin")
    .addStringOption(option => option
        .setName("antwort")
        .setDescription("Kopf oder Zahl?")
        .setRequired(true)),

    async execute (interaction, client) {
        await interaction.deferReply()
        const { options } = interaction;

        const answer = options.getString("antwort")
        const choice = ["Kopf", "Zahl"]
        const text = Math.floor(Math.random() * choice.length);

        const embed1 = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Du hast verloren!")
        .addFields({name: "Deine Antwort:", value:`🪙 ${answer}`, inline: true})
        .addFields({name: "Meine Antwort:", value:`🪙 ${choice[text]}`, inline: true})

        const embed2 = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Du hast gewonnen!")
        .addFields({name: "Deine Antwort:", value:`🪙 ${answer}`, inline: true})
        .addFields({name: "Meine Antwort:", value:`🪙 ${choice[text]}`, inline: true})

        if (answer == choice[text]) {
            await interaction.followUp({embeds: [embed2]})
        }

        if (answer !== choice[text]) {
            await interaction.followUp({embeds: [embed1]})
        }

    

    
    }
}