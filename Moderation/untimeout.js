const {SlashCommandBuilder, EmbedBuilder, Permissions, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('untimeout')
    .setDescription('Hole einen User aus dem timeout')
    .addUserOption( option => 
        option
        .setName("target")
        .setDescription("Wen soll ich aus dem Timeout holen?")
        .setRequired(true)),

    async execute(interaction, client) {
       const timeUser = interaction.options.getUser("target");

       if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: "Du hast nicht die Berechtigung diesen Befehl auszuführen!", ephemeral: true});

       if (interaction.member === timeUser) return await interaction.reply({content: "Du kannst dich selbst nicht aus dem Timeout holen!", ephemeral: true});

       if (!timeUser.kickable) return await interaction.reply({ content: "Du kannst diese Person nicht timeouten, bitte wende dich an einen Moderator oder einen Admin!", ephemeral: true});

       const embed = new EmbedBuilder()
       .setColor("Green")
       .setDescription(` :white_check_mark: ${timeUser} wurde aus dem Timeout geholt!`)

       const dmEmbed = new EmbedBuilder()
       .setColor("Green")
       .setDescription(`Du wurdest aus dem Timeout geholt in ${interaction.guild.name}.`)

       timeUser.timeout(null);

       return await interaction.reply({ embeds: [embed]});

       timeUser.send({embeds: [dmEmbed]});
    } 
}