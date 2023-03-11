const {EmbedBuilder, PermissionsBitField, Permissions, PermissionFlagsBits, SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("unban a user")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option =>
        option.setName("userid")
        .setDescription("uban id")
        .setRequired(true)
        ),

    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ content: "You can not unban members!", ephemeral: true});
        const {channel, options} = interaction;

        const userId = interaction.options.getString("userid");

        try{ 
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
            .setDescription(`${userId} has been unbanned`)
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