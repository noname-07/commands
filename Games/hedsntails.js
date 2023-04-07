const {SlashCommandBuilder, EmbedBuilder, Embed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription("Heads or Tails?")
    .addStringOption(option => option
        .setName("answer")
        .setDescription("head or tail")
        .setRequired(true)
        .addChoices(
            {name: "head", value: "head"},
            {name: "tail", value: "tail"}
        )),

    async execute (interaction, client) {
        await interaction.deferReply()
        const { options } = interaction;

        const answer = options.getString("answer")
        const choice = ["head", "tail"]
        const text = Math.floor(Math.random() * choice.length);

        const embed1 = new EmbedBuilder()
        .setColor("Red")
        .setTitle("YOU LOST!")
        .addFields({name: "Your answer:", value:`🪙 ${answer}`, inline: true})
        .addFields({name: "My answer:", value:`🪙 ${choice[text]}`, inline: true})

        const embed2 = new EmbedBuilder()
        .setColor("Green")
        .setTitle("YOU WON!")
        .addFields({name: "Your answer:", value:`🪙 ${answer}`, inline: true})
        .addFields({name: "My answer:", value:`🪙 ${choice[text]}`, inline: true})

        if (answer == choice[text]) {
            await interaction.followUp({embeds: [embed2]})
        }

        if (answer !== choice[text]) {
            await interaction.followUp({embeds: [embed1]})
        }

    

    
    }
}