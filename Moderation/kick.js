
const { PermsissionsBitField, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a Member!')
    .addUserOption(option => option.setName('target').setDescription('Der User den ich kicken soll').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Grund für das Kicken dieses Users')),
    async execute (interaction, client) {

        const kickUser = interaction.options.getUser('target');
        const kickMember = await interaction.guild.members.fetch(kickUser.id);
        const channel =interaction.channel;

        if (!interaction.member.permissions.has(PermsissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "Du musst die Berechtigung haben, User zu kicken!", ephemeral: true});
        if (!kickMember) return await interaction.reply({ content: "Dieser User ist nicht auf diesem Server!", ephemeral: true});
        if (!kickMember.kickable) return await interaction.reply({ content: "Du kannst diesen User nicht bannen, bitte wende dich an einen Admin!", ephemeral: true});

        let reason = interaction.options.getString('reason');
        if (!reason) reason = "Kein Grund angegeben!";

        const dmEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Du wurdest gekickt!")
        .setDescription(`Du wurdest von dem Server *${interaction.guild.name}* gekickt. | Grund: ${reason}`)

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Erfolgreich gekickt!")
        .setDescription(` :white_check_mark: ${kickUser.tag} wurde erfolgreich gekickt! | Grund: ${reason}`)

        await kickMember.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        });

        await kickMember.kick({ reason: reason}).catch(err => {
            interaction.reply({ content: "Es gab ein Problem!", ephemeral: true});
        });
        
        await interaction.reply({ embeds: [embed] });
    }
}