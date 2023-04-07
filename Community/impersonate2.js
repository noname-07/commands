const { SlashCommandBuilder, ChannelType, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("impersonate-2")
    .setDescription("impersonate a user with a webhook")
    .addUserOption(option => option
        .setName("user")
        .setDescription("The user you want to impersonate")
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("message")
        .setDescription("the message")
        .setRequired(true)
    )
    .addChannelOption(option => option
        .setName("channel")
        .setDescription("Send this Message to a random channel")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),

    async execute (interaction) {
        //define member and message
        const member = interaction.options.getUser("user");
        const message = interaction.options.getString("message");
        const channelx = interaction.options.getChannel("channel");

        //if member downst have the permission
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.createWebhook)) return await interaction.reply({
            content: "You cant use this command, please try </impersonate:1093210767412695040>"
        })

        //if includes everone or here
        if (message.includes('@everyone') || message.includes('@here')) return await interaction.reply({ 
            content: `You cannot mention everyone/here with this command`, 
            ephemeral: true
        });

        //create the webhook and message, and then delete webhook
        await channelx.createWebhook({
            name: member.username,
            avatar: member.displayAvatarURL({ dynamic: true })
        }).then((webhook) => {
            webhook.send({content: message});
            setTimeout(() => {
                webhook.delete();
            }, 3000)
        });

        //send an ephemeral message to verify that the webhook send this message
        await interaction.reply({
            content: `<@${member.id}> has been impersonated below! Channel: <#${channelx.id}>`,
            ephemeral: true
        });
    }
}