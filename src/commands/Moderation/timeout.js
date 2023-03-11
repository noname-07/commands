const {SlashCommandBuilder, PermissionsBitField, Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("timeout a user")
    .addUserOption(option =>
        option
        .setName("target")
        .setDescription("target")
        .setRequired(true))
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("reason for the timeout")),

    async execute(interaction, client) {
        const tmember = interaction.options.getMember('target');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: "NO PERMISSION", ephemeral: true});

        if (interaction.member === tmember) return await interaction.reply({ content: "Cant timeout yourself", ephemeral: true});

        const reason = interaction.options.getString("reason") || "NO REASON";

        tmember.timeout(6000_000, reason).catch(err => {
            return;
        });

        const embed = new EmbedBuilder()
        .setDescription(` :white_check_mark: ${tmember} has been timeouted | Grund: ${reason}`)
        .setColor("Green")

        const dmEmbed = new EmbedBuilder()
        .setTitle("Du wurdest ins Timeout Versetzt!")
        .setDescription(`you have been timeouted ${interaction.guild.name} | Grund: ${reason}`)

        tmember.send({ embeds: [dmEmbed]}).catch(err => {
            return;
        });

        return await interaction.reply({ embeds: [embed], ephemeral: true}).catch(err => {
            return;
        });

        
    }
}
