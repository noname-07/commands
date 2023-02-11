const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, ButtonInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('modal')
    .setDescription('this is a modal'),
    async execute(interaction, client) {

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setLabel('Create Modal')
            .setStyle(ButtonStyle.Secondary),
        )
 
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Modal & Support")
        .setDescription(`Click the button below to talk to staff (create a ticket)`)
 
        await interaction.reply({ embeds: [embed], components: [button] });

        const collector = await interaction.channel.createModalComponentCollector();

        collector.on('collect', async i => {

            await i.update({ embeds: [embed], components: [button] });

        const modal = new ModalBuilder()
        .setTitle('Test Modal')
        .setCustomId('modal')

        const name = new TextInputBuilder()
        .setCustomId('name')
        .setRequired(true)
        .setLabel('Provide us with your name')
        .setStyle(TextInputStyle.Short);

        const about = new TextInputBuilder()
        .setCustomId('about')
        .setRequired(true)
        .setLabel('provide us with a short essay about you')
        .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(name)
        const secondActionRow = new ActionRowBuilder().addComponents(about)

        modal.addComponents(firstActionRow, secondActionRow)
        interaction.showModal(modal)
        })
    }
}