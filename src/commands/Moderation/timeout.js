const {SlashCommandBuilder, PermissionsBitField, Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Versetze einen User ins Timeout")
    .addUserOption(option =>
        option
        .setName("target")
        .setDescription("Welcher User soll ins timeout?")
        .setRequired(true))
    .addIntegerOption(option =>
        option
        .setName("duration")
        .setDescription("Wie lange soll der User ins Timeout?")
        .setRequired(true))
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("Grund des Timeouts (can be empty)")),

    async execute(interaction, client) {
        const timeUser = interaction.options.getUser("target");
        const duration = interaction.options.getInteger("duration");

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: "Du kannst diesen Befehl nicht ausführen!", ephemeral: true});

        if (interaction.member === timeUser) return await interaction.reply({ content: "Du kannst dich selbst nicht ins Timeout versetzen!", ephemeral: true});
        
        if (duration > 60400) return await interaction.reply({content: "Bitte sage mir eine Zahl zwischen 1 und 60400!", ephemeral: true});

        let reason = interaction.options.getString("reason") || "Kein Grund angegeben!";

        const embed = new EmbedBuilder()
        .setDescription(` :white_check_mark: ${timeUser} wurde ins Timeout versetzt für ${duration} sekunden! | Grund: ${reason}`)
        .setColor("Green")

        const dmEmbed = new EmbedBuilder()
        .setTitle("Du wurdest ins Timeout Versetzt!")
        .setDescription(`Du wurdest in ${message.guild.name} ins Timeout versetzt für ${duration} Sekunden. | Grund: ${reason}`)

        timeUser.timeout(duration * 1000, reason);

        return await interaction.reply({ embeds: [embed], ephemeral: true});

        timeUser.send({ embeds: [dmEmbed]});
    }
}
