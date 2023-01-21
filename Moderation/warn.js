const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const warningSchema = require('../../Schemas.js/warnsSchema');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warne einen User')
    .addUserOption(option => option
        .setName('target')
        .setDescription('Wen willst du warnen?')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("reason")
        .setDescription("Grund des Warns")
        .setRequired(true)),

    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "Du kannst diesen Befehl nicht ausführen!", ephemeral: true});

        const { options, guildId, user } = interaction;

        const target = options.getUser('target');
        const reason = options.getString("reason");
        
        

        const userTag = `${target.username}#${target.discriminator}`;

        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: target.tag}, async (err, data) => {

            if (err) throw err;

            if (!data) {
                data = new warningSchema({
                    GuildID: guildId,
                    UserID: target.id,
                    UserTag: userTag,
                    Content: [
                        {
                            ExecuterId: user.id,
                            ExecuterTag: user.tag,
                            Reason: reason
                        }
                    ],
                }); 
            } else {
                const warnContent = {
                    ExecuterId: user.id,
                    ExecuterTag: user.tag,
                    Reason: reason
                }
                data.Content.push(warnContent);
            }
            data.save()
        });

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:white_check_mark: Du wurdest gewarn in ${interaction.guild.name} | ${reason}`)

        const embed2 = new EmbedBuilder()
        .setColor("Green")
        .setDescription(` :white_check_mark: ${target.tag} wurde gewarnt | ${reason} `)

        target.send({ embeds: [embed] }).catch(err => {
            return;
        })

        interaction.reply({ embeds: [embed2] })
    }
}