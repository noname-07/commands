const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const reportSchema = require('../../Schemas.js/rep');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("report-disable")
    .setDescription(`This disables the repot system`),
    async execute (interaction) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You dont have permission to remove report", ephemeral: true})
 
        const { channel, guildId , options } = interaction;
        const repChannel = options.getChannel('channel');
 
        const embed = new EmbedBuilder()
 
        reportSchema.deleteMany({ Guild: guildId}, async (err, data) => {
            embed.setColor("Blue")
            .setDescription(`:white_check_mark: The report system has been removed`)
 
            return await interaction.reply({ embeds: [embed] });
        })
    }
}