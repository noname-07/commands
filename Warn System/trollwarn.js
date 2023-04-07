const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('trollwarn')
    .setDescription('Warne einen User')
    .addUserOption(option => option
        .setName('target')
        .setDescription('target for trollwarn')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("reason")
        .setDescription("trollreason")
        .setRequired(true)),

    async execute (interaction) {
        const errEmbed = new EmbedBuilder()
        .setTitle("ERROR")
        .setColor("Red")
        .setDescription("Missing Permissions: Kick Members")
        .setTimestamp()

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "Du kannst diesen Befehl nicht ausführen!", ephemeral: true});

        const { options, guildId, user } = interaction;

        const target = options.getUser('target');
        const reason = options.getString("reason");

        
        const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:white_check_mark: Du wurdest getrollwarnt in ${interaction.guild.name} | ${reason}`)

        const embed2 = new EmbedBuilder()
        .setColor("Green")
        .setDescription(` :white_check_mark: ${target.tag} wurde gewarnt | ${reason} `)

        target.send({ embeds: [embed] }).catch(err => {
            return;
        })

        interaction.reply({ embeds: [embed2], ephemeral: true })
    }
}