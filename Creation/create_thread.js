const {SlashCommandBuilder, ThreadManager, ThreadChannel, PermissionsBitField, EmbedBuilder} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
    .setName('create-thread')
    .setDescription('create a thread')
    .addStringOption(option => option
        .setName('name')
        .setDescription('Name of the thread')
        .setRequired(true)
    ),

    async execute (interaction) {
    
        const errEmbed = new EmbedBuilder()
        .setTitle("ERROR")
        .setColor("Red")
        .setDescription("Missing Permissions: Create Public Threads")
        .setTimestamp()

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.CreatePublicThreads)) return await interaction.reply({embeds: [errEmbed], ephemeral: true});


    const { options } = interaction;

    const name = options.getString('name');

    const thread = await interaction.channel.threads.create({
        name: `${name}`,
        autoArchiveDuration: 60,
    }).catch(err => {
        return;
    });
    
    await interaction.reply({content: `Created thread: ${thread.name} succesfull!`}).catch(err => {
        return;
    });
}
}