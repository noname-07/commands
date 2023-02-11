const { PermissionsBitField, EmbedBuilder, ChannelType, ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder } = require("discord.js");
const ticketSchema = require("../../Schemas.js/ticketSchema");
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-disable")
        .setDescription("Disables the ticket system"),
    async execute(interaction) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You must be an admin to disable tickets!", ephemeral: true })
 
        ticketSchema.deleteMany({ Guild: interaction.guild.id }, async (err, data) => {
            await interaction.reply({ content: "Your ticket system has been removed", ephemeral: true})
        })
    }
}