const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder} = require('discord.js');
const levelSchema = require('../../Schemas.js/level');
const Canvacord = require('canvacord');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`rank`)
    .setDescription('Schaue deinen Rank an oder den einens anderen Members!')
    .addUserOption(option => option
        .setName(`user`)
        .setDescription(`Target Member`)
        .setRequired(false)),
    async execute (interaction) {

        const { options, user,  guild} = interaction;

        const Member = options.getMember('user')  || user;

        const member = guild.members.cache.get(Member.id);

        const Data = await levelSchema.findOne({ Guild: guild.id, User: member.id});

        const embed = new EmbedBuilder()
        .setColor("Purple")
        .setDescription(`:white_check_mark: ${member} hat noch kein XP!`)

        if (!Data) return await interaction.reply({ embeds: [embed] });

        await interaction.deferReply();

        const Required = Data.Level * Data.Level * 20 + 20;

        const rank = new Canvacord.Rank()
        .setAvatar(member.displayAvatarURL({ forseStatic: true}))
        .setBackground("IMAGE", `https://cdn.discordapp.com/attachments/1020191472470982688/1063786171861323836/image.png`)
        .setCurrentXP(Data.XP)
        .setRequiredXP(Required)
        .setRank(1, "Rank", false)
        .setLevel(Data.Level, "Level")
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)

        const card = await rank.build();

        const attachment = new AttachmentBuilder(card, { name: "rank.png" });

        const embed2 = new EmbedBuilder()
        .setColor("Purple")
        .setTitle(`${member.user.username}'s Level/Rank`)
        .setImage("attachment://rank.png")

        await interaction.editReply({ embeds: [embed2], files: [attachment]});
    }
}