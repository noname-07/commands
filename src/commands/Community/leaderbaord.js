const { SlashCommandBuilder, EmbedBuilder, AtachmentBuilder} = require('discord.js');
const levelSchema = require('../../Schemas.js/level');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Server XP Leaderboard'),

    async execute (interaction) {

        const { guild, client } = interaction;

        let text = "";

        const embed1 = new EmbedBuilder()
        .setColor("Purple")
        .setDescription("No one is on the leaderboard")

        const Data = await levelSchema.findOne({ GuildID: guild.id}) 
        .sort({
            XP: -1,
            Level: -1
        })
        .limit(10)

        if(!Data) return await interaction.reply({ embeds: [embed1] });

        await interaction.deferReply();

        for (let counter = 0; counter < Data.length; ++counter ) {

            let { User, XP, Level } = Data[counter];

            const value = await client.users.fetch(User) || "Unknown member"

            const member = value.tag;

            text += `${counter + 1}, ${member} | XP: ${XP} | Level: ${Level} \n`

            const embed = new EmbedBuilder()
            .setColor(`${interaction.guild.name}'s XP Leaderbaord:`)
            .setDescription(`\`\`\`${text}\`\`\``)
            .setTimestamp()
            .setFooter({ text: "XP Leaderbaord"})

            interaction.editReply({ embeds: [embed]});
        }

    }
}