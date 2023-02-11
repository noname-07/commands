
const {EmbedBuilder, PermissionsBitField, Permissions, PermissionFlagsBits, SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banne jemanden von diesem Server')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option => 
        option.setName("target")
        .setDescription("Ziel des Banns")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("reason")
        .setDescription("Grund des Banns")
        ),

    async execute(interaction) {
        const {channel, options} = interaction; 

        const user = interaction.options.getUser("target");
        const reason = interaction.options.getString(" reason") || `Kein Grund angegeben!`;

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Du kannst das nicht tun weil ${user.username} einen höheren Rang hat!`)
            .setColor("Red");

        if (member.roles.highest.postion >= interaction.member.roles.highest.postion)
            return interaction.reply({ embeds: [embed], ephemeral: true});

        await member.ban({reason});

        const embed = new EmbedBuilder()
            .setDescription(`Ich habe  ${user} erfolgreich gebannt. | reason: ${reason}`)
            .setColor("Green")
            .setTimestamp()

        await interaction.reply({
            embeds: [embed]
        });

    }

}
