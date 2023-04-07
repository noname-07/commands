const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a poll")
    .addStringOption(option => option
        .setName("question")
        .setDescription("Question")
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("option-1")
        .setDescription("The first option")
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("option-2")
        .setDescription("Option 2")
        .setRequired(true)
    )
    .addChannelOption(option => option
        .setName("channel")
        .setDescription("Optional: The Channel for the Poll")
        .addChannelTypes(
            ChannelType.GuildAnnouncement,
            ChannelType.GuildText)
        ),

    async execute (interaction, client) {

        const channelx = interaction.options.getChannel("channel") || interaction.channel;
        const channel = client.channels.cache.get(`${channelx.id}`);
        const question = interaction.options.getString("question");
        const op1 = interaction.options.getString("option-1");
        const op2 = interaction.options.getString("option-2");
        const errEmbed = new EmbedBuilder()
        .setTitle("ERROR")
        .setColor("Red")
        .setDescription("Missing Permissions: Manage Channels")
        .setTimestamp()
        const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`${question}`)
        .addFields({ name:"👍Option 1:" , value: `${op1}`, inline: false })
        .addFields({ name:"👎Option 2:", value: `${op2}`, inline: false })
        .addFields({ name:"Moderator:", value: `<@${interaction.user.id}>`, inline: false })
        .setTimestamp()

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ embeds: [errEmbed], ephemeral: true});

        channel.send({
            embeds: [embed]
        }).then(embedMessage => {
            embedMessage.react("👍")
            embedMessage.react("👎")
        }).catch(err => {
            return;
        });

        await interaction.reply({
            content: `Poll created in ${channel}`,
            ephemeral: true
        }); 
        
        
    }
}