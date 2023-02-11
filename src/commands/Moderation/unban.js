const {EmbedBuilder, PermissionsBitField, Permissions, PermissionFlagsBits, SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban einen User")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option =>
        option.setName("userid")
        .setDescription("Die ID des Users der entbannt werden soll")
        .setRequired(true)
        ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const userId = interaction.options.getString("userid");

        try{ 
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
            .setDescription(`${userId} wurde erfolgreich unbanned`)
            .setColor("Green");

            await interaction.reply({
                embeds: [embed],
            });
        } catch(err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`Please provide a valid member ID.`)
                .setColor("Orange")

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
}