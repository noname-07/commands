const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const reportSchema = require('../../Schemas.js/rep');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("report-setup")
    .setDescription(`This sets up the repot system`)
    .addChannelOption(option => option.setName('channel').setDescription(`The channel you want the reports to be sent to`).addChannelTypes(ChannelType.GuildText).setRequired(true)),
    async execute (interaction, client) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You dont have perms to set this up!", ephemeral: true})
 
        const { channel, guildId , options } = interaction;
        const repChannel = options.getChannel('channel');
 
        const embed = new EmbedBuilder()
 
        reportSchema.findOne({ Guild: guildId}, async (err, data) => {
 
            if (!data) {
                await reportSchema.create({
                    Guild: guildId,
                    Channel: repChannel.id
                })
 
                embed.setColor("Blue")
                .setDescription(`:white_check_mark:  All submitted reports will be sent in ${repChannel}`)
            } else if (data) {
                const c = client.channels.cache.get(data.Channel);
                embed.setColor("Blue")
                .setDescription(`:white_check_mark: Your report channel has already been set to ${c}`)
            }
 
            return await interaction.reply({ embeds: [embed] });
        })
    }
}
 
