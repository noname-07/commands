
const { PermsissionsBitField, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a Member!')
    .addUserOption(option => option.setName('target').setDescription('kick member').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('reason for the kick')),
    async execute (interaction, client) {
        const errEmbed = new EmbedBuilder()
        .setTitle("ERROR")
        .setColor("Red")
        .setDescription("Missing Permissions: Kick Members")
        .setTimestamp()

        const kickUser = interaction.options.getUser('target');
        const kickMember = await interaction.guild.members.fetch(kickUser.id);
        const channel =interaction.channel;

        if (!interaction.member.permissions.has(PermsissionsBitField.Flags.KickMembers)) return await interaction.reply({ emeds: [errEmbed], ephemeral: true});
        if (!kickMember) return await interaction.reply({ content: "This user isnt on this server", ephemeral: true});
        if (!kickMember.kickable) return await interaction.reply({ content: "You cant ban this user!", ephemeral: true});

        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason given!";

        const dmEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("YOU HAVE BEEN KICKED")
        .setDescription(`You are not longer on *${interaction.guild.name}*  | reason: ${reason}`)

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Erfolgreich gekickt!")
        .setDescription(` :white_check_mark: ${kickUser.tag} has been kicked | reason: ${reason}`)

        await kickMember.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        });

        await kickMember.kick({ reason: reason}).catch(err => {
            interaction.reply({ content: "There was an problem!", ephemeral: true});
        });
        
        await interaction.reply({ embeds: [embed] });
    }
}