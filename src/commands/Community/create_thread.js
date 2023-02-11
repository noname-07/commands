const {SlashCommandBuilder, ThreadManager, ThreadChannel} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
    .setName('create-thread')
    .setDescription('erstelle einen Thread')
    .addStringOption(option => option
        .setName('name')
        .setDescription('Name von dem Thread')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('reason')
        .setDescription('Warum erstellst du diesen Thres?')
        .setRequired(false)
    ),

    async execute (interaction) {

    const { options } = interaction;

    const name = options.getString('name');
    const reason = options.getString('reason');

    const thread = await channel.threads.create({
        name: `${name}`,
        autoArchiveDuration: 60,
        reason: `${reason}`,
    });
    
    await interaction.reply({content: `Created thread: ${thread.name}`, ephemeral: true});
}
}