const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, PermissionsBitField} = require('discord.js');
const levelSchema = require('../../Schemas.js/level');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('xp-reset-server')
    .setDescription('Reset a servsers XP'),

    async execute (interaction) {

        const perm = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:white_check_mark: YOU CANT EXECUTE THIS COMMAND`)
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ embeds: [perm], ephemeral: true });
        const { guildid } = interaction;

        levelSchema.deleteMany({ Guild: guildid}, async (err, data) => {

            const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`:white_check_mark: The XP System has been resetted succesfull`)

            await interaction.reply({ embeds: [embed] });
        })

    }
}