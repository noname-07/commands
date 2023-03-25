
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('invites')
    .setDescription('Get a users invites')
    .addUserOption(option => option.setName('user').setDescription('target')),
    async execute(interaction, message) {
        const user = interaction.options.getUser('user')
        let invites = await interaction.guild.invites.fetch()
        let userInvites = invites.filter(u => u.inviter && u.inviter.id === user.id);

        let i = 0;
        userInvites.forEach(inv => i +- inv.uses);

        const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setDescription(` :white_check_mark: ${user.tag} has **${i}** invites!`)

        await interaction.reply({ embeds: [embed] });
    }
}