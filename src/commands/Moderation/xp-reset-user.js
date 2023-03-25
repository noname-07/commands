const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, PermissionsBitField} = require('discord.js');
const levelSchema = require('../../Schemas.js/level');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('xp-reset-user')
    .setDescription('Reset a users XP')
    .addUserOption(option => option
        .setName('target')
        .setDescription('target')
        .setRequired(true)),

    async execute (interaction) {

        const errEmbed = new EmbedBuilder()
        .setTitle("ERROR")
        .setColor("Red")
        .setDescription("Missing Permissions: Administrator")
        .setTimestamp()
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ embeds: [errEmbed], ephemeral: true });
        const { guildid } = interaction;
        const target = interaction.options.getUser('target');

        levelSchema.deleteMany({ GuildID: guildid, User: target.id}, async (err, data) => {

            const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`:white_check_mark: ${target.tag}'s XP has been resetted`)

            await interaction.reply({ embeds: [embed] });
        })

    }
}