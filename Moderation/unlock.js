const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('unlock a channel')
    .addChannelOption(option => option.setName('channel').setDescription('The channel you want to unlock').addChannelTypes(ChannelType.GuildText).setRequired(true)),
    async execute(interaction) {
        const errEmbed = new EmbedBuilder()
        .setTitle("ERROR")
        .setColor("Red")
        .setDescription("Missing Permissions: Manage Channels")
        .setTimestamp()
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ embeds: [errEmbed], ephemeral: true});
 
        let channel = interaction.options.getChannel('channel');
 
        channel.permissionOverwrites.create(interaction.guild.id, {SendMessages: true})
 
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark: ${channel} has been unlocked by a administrator`) 
 
        await interaction.reply({ embeds: [embed] });
    }
}
