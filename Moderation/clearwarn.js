const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const warningSchema = require('../../Schemas.js/warnsSchema');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clearwarn')
    .setDescription('Warne einen User')
    .addUserOption(option => option
        .setName('target')
        .setDescription('Von wem willst du die Warns sehen?')
        .setRequired(true)
    )
    ,

    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "Du kannst diesen Befehl nicht ausführen!", ephemeral: true});


        const { options, guildId, user } = interaction;

        const target = options.getUser('target');
       
        

        const embed = new EmbedBuilder()
        
        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: target.tag}, async (err, data) => {

           if (err) throw err;

           if (data) {
            await warningSchema.findOneAndDelete({ GuildID: guildId, UserID: target.id, UserTag: target.tag})

            embed.setColor("Green")
            .setDescription(`:white_check_mark: Die Warns von ${target.tag} wurden gelöscht!`)

            interaction.reply({ embeds: [embed] });
           } else {
            interaction.reply({ content: `${target.tag} hat keine Warns!`, ephemeral: true})
           }
        });

        
    }
}