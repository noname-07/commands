const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const reportSchema = require('../../Schemas.js/rep');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("report")
    .setDescription(`Report Command`),
    async execute (interaction) {
 
        reportSchema.findOne({ Guild: interaction.guild.id}, async (err, data) => {
 
            if (!data) {
                return await interaction.reply({ content: "The roport system hasnt created yet", ephemeral: true})
            }
 
            if (data) {
                const modal = new ModalBuilder()
                .setTitle("Report")
                .setCustomId(`modal`)
 
                const contact = new TextInputBuilder()
                .setCustomId('contact')
                .setRequired(true)
                .setLabel(`Your contact`)
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
                .setLabel(`Your Problem`)
                .setPlaceholder("Describe")
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
 
 
