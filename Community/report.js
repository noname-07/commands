const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const reportSchema = require('../../Schemas.js/rep');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("report")
    .setDescription(`Report Command`),
    async execute (interaction) {
 
        reportSchema.findOne({ Guild: interaction.guild.id}, async (err, data) => {
 
            if (!data) {
                return await interaction.reply({ content: "Das Report System uwurde noch nicht erstellt!", ephemeral: true})
            }
 
            if (data) {
                const modal = new ModalBuilder()
                .setTitle("Report")
                .setCustomId(`modal`)
 
                const contact = new TextInputBuilder()
                .setCustomId('contact')
                .setRequired(true)
                .setLabel(`Sende und deinen kontakt`)
                .setPlaceholder("Discord is usually best")
                .setStyle(TextInputStyle.Short)
 
                const issue = new TextInputBuilder()
                .setCustomId('issue')
                .setRequired(true)
                .setLabel(`Was willst du uns sagen?`)
                .setPlaceholder("Member, Server Problem...Oder was anderes?")
                .setStyle(TextInputStyle.Short)
 
                const description = new TextInputBuilder()
                .setCustomId('description')
                .setRequired(true)
                .setLabel(`Beschreibe uns dein Problem`)
                .setPlaceholder("Bitte beschreibe es so gut wie es geht!")
                .setStyle(TextInputStyle.Paragraph)
 
                const firstActionRow = new ActionRowBuilder().addComponents(contact)
                const secondActionRow = new ActionRowBuilder().addComponents(issue)
                const thirdActionRow = new ActionRowBuilder().addComponents(description)
 
                modal.addComponents(firstActionRow, secondActionRow, thirdActionRow)
 
                interaction.showModal(modal)
 
            }
        })
 
    }
}
 
 
