const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, PermissionsBitField} = require('discord.js');
const levelSchema = require('../../Schemas.js/level');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('xp-reset-user')
    .setDescription('Setze das XP von einem User auf 0!')
    .addUserOption(option => option
        .setName('target')
        .setDescription('Ziel dieses Commands')
        .setRequired(true)),

    async execute (interaction) {

        const perm = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:white_check_mark: Du kannst diesen Befehl nicht ausführen!`)
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ embeds: [perm], ephemeral: true });
        const { guildid } = interaction;
        const target = interaction.options.getUser('target');

        levelSchema.deleteMany({ GuildID: guildid, User: target.id}, async (err, data) => {

            const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`:white_check_mark: ${target.tag}'s XP wurde zurückgesetzt! (Dieser Befehl kann nicht Rückgängig gemacht werden)`)

            await interaction.reply({ embeds: [embed] });
        })

    }
}