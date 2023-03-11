const {SlashCommandBuilder, EmbedBuilder, Permissions, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('untimeout')
    .setDescription('untimeout a user')
    .addUserOption( option => 
        option
        .setName("target")
        .setDescription("target")
        .setRequired(true)),

    async execute(interaction, client) {
       const timeUser = interaction.options.getUser("target");

       if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: "NO PERMS!", ephemeral: true});

       if (interaction.member === timeUser) return await interaction.reply({content: "You cant untimeout yourself LOL", ephemeral: true});

       if (!timeUser.kickable) return await interaction.reply({ content: "You cant untimeout this user", ephemeral: true});

       const embed = new EmbedBuilder()
       .setColor("Green")
       .setDescription(` :white_check_mark: ${timeUser} has been untimeouted`)

       const dmEmbed = new EmbedBuilder()
       .setColor("Green")
       .setDescription(`You have been untimeouted in ${interaction.guild.name}.`)

       timeUser.timeout(null);

       return await interaction.reply({ embeds: [embed]});

       timeUser.send({embeds: [dmEmbed]});
    } 
}