const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const warningSchema = require('../../Schemas.js/warnsSchema');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('warns a user')
    .addUserOption(option => option
        .setName('target')
        .setDescription('Who do you want to warn?')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("reason")
        .setDescription("reason of the warn")
        .setRequired(true)),

    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "NO PERMS!", ephemeral: true});

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
        .setDescription(`:white_check_mark: You have been warned in ${interaction.guild.name} | ${reason}`)

        const embed2 = new EmbedBuilder()
        .setColor("Green")
        .setDescription(` :white_check_mark: ${target.tag} has been warned | ${reason} `)

        target.send({ embeds: [embed] }).catch(err => {
            return;
        })

        interaction.reply({ embeds: [embed2] })
    }
}