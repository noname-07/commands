const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Random Number 1, 1, 3, 4, 5, 6"),

    async execute (interaction) {
        const Nums = [ "1", "2", "3", "4", "5", "6"];
        const ball = Math.floor(Math.random() * Nums.length);

        const embed = new EmbedBuilder()
        .setTitle("dice")
        .addFields(
            {name: "Number:", value: `${ball}`, inline: true},
            {name: "Requested by:", value: `<@${interaction.user.id}>`}
        )
        .setColor("Green")

        return interaction.reply({
            embeds: [embed]
        })
    }
}