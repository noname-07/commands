const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, PermissionsBitField} = require('discord.js');
const levelSchema = require('../../Schemas.js/level');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('xp-reset-server')
    .setDescription('Reset a servsers XP'),

    async execute (interaction) {

        const errEmbed = new EmbedBuilder()
        .setTitle("ERROR")
        .setColor("Red")
        .setDescription("Missing Permissions: Manage Threads")
        .setTimestamp()
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ embeds: [errEmbed], ephemeral: true });
        const { guildid } = interaction;

        if(interaction.user.id != "931870926797160538") {
            return interaction.reply({ content: "You are not the Owner of this Bot!", ephemeral: "true"})
        }

        levelSchema.deleteMany({ Guild: guildid}, async (err, data) => {

            const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`:white_check_mark: The XP System has been resetted succesfull`)

            await interaction.reply({ embeds: [embed] });
        }).catch(err => {
            return;
        });

    }
}