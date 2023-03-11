const {SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require("discord.js");

const mailSchema = require('../../Schemas.js/GuildConfig');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("reset-modmail")
    .setDescription("Reset the Modmail"),

    async execute (interaction) {
        //define some things
        let guildid = interaction.guild.id

        //error
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: "You cant delete the modmail setup!", ephemeral: true});

        //define the embed
        const embed = new EmbedBuilder()
        .setTitle("Modmail")
        .setDescription("YOU DELETED THE MODMAIL SETUP!")
        .setColor("Red")

        await interaction.reply({embeds: [embed] })

        //delete mail schema
        mailSchema.deleteMany({ Guild: guildid}), async (err, data) => {
            return await interaction.reply({ content: "Modmail deleted!", ephemeral: true})
        }
   }
}