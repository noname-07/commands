const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, PermissionsBitField} = require('discord.js');
const levelSchema = require('../../Schemas.js/level');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('xp-reset-server')
    .setDescription('Setze das XP von dem Server auf 0!'),

    async execute (interaction) {

        const perm = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:white_check_mark: Du kannst diesen Befehl nicht ausführen!`)
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ embeds: [perm], ephemeral: true });
        const { guildid } = interaction;

        levelSchema.deleteMany({ Guild: guildid}, async (err, data) => {

            const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`:white_check_mark: Das XP System wurde erfolgreich zurückgesetzt! (Dieser Befehl kann nicht Rückgängig gemacht werden)`)

            await interaction.reply({ embeds: [embed] });
        })

    }
}