const  {SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("create-webhook")
    .setDescription("create a webhook")
    .addStringOption(option => option
        .setName("name")
        .setDescription("Name of the webhook")
        .setRequired(false)
    ),

    async execute (interaction) {
        const name = interaction.options.getString("name") || `${interaction.user.username}'s webhook`;

        const errEmbed = new EmbedBuilder()
        .setTitle("ERROR")
        .setColor("Red")
        .setDescription("Missing Permissions: Manage Webhooks")
        .setTimestamp()

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageWebhooks)) return interaction.reply({
            embeds: [errEmbed],
            ephemeral: true
        });

        interaction.channel.createWebhook({
            name: name,
            avatar: 'https://i.imgur.com/AfFp7pu.png',
        })
            .then(webhook => console.log(webhook))
            .catch(err => {
                return;
            });

        return interaction.reply({ content: `created webhook: ${name}`})
    }
}