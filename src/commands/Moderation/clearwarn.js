const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const warningSchema = require('../../Schemas.js/warnsSchema');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clearwarn')
    .setDescription('clear a users warns')
    .addUserOption(option => option
        .setName('target')
        .setDescription('target')
        .setRequired(true)
    )
    ,

    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "There was an error", ephemeral: true});


        const { options, guildId, user } = interaction;

        const target = options.getUser('target');
       
        

        const embed = new EmbedBuilder()
        
        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: target.tag}, async (err, data) => {

           if (err) throw err;

           if (data) {
            await warningSchema.findOneAndDelete({ GuildID: guildId, UserID: target.id, UserTag: target.tag})

            embed.setColor("Green")
            .setDescription(`:white_check_mark:  ${target.tag} has no more warns!`)

            interaction.reply({ embeds: [embed] });
           } else {
            interaction.reply({ content: `${target.tag} has no warns yet`, ephemeral: true})
           }
        });

        
    }
}