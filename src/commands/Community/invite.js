
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('invites')
    .setDescription('Schaue wie viele Invites ein User hat')
    .addUserOption(option => option.setName('user').setDescription('Von wem soll ich dir die invites sagen?')),
    async execute(interaction, message) {
        const user = interaction.options.getUser('user')
        let invites = await interaction.guild.invites.fetch()
        let userInvites = invites.filter(u => u.inviter && u.inviter.id === user.id);

        let i = 0;
        userInvites.forEach(inv => i +- inv.uses);

        const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setDescription(` :white_check_mark: ${user.tag} hat **${i}** invites!`)

        await interaction.reply({ embeds: [embed] });
    }
}