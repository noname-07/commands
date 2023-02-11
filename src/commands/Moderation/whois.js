const {SlashCommandBuilder, EmbedBuilder,  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("whois")
    .setDescription("Bekomme Infos uber einen User")
    .addUserOption(option =>
        option
        .setName("target")
        .setDescription("Von wem willst du die Infos?")
        .setRequired(true)
    ),

    async execute(interaction) {
       
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.tag;
        

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: tag, iconURL: icon})
        .setThumbnail(icon)
        .addFields({ name: "Member", value: `${user}`, inline: false})
        .addFields({ name: "Roles", value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false})
        .addFields({ name: "Joined Server", value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true})
        .addFields({ name: "Joined Discord", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true})
        .setFooter({ text: `User ID: ${user.id}`, inline: false})
        .setTimestamp()

        await interaction.reply({embeds: [embed] });

    }
}