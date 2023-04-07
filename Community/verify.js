const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify in Coding Germany'),

    async execute (interaction) {
        const GuildID =  interaction.guild.id;
        const VerChannel =  interaction.channel.id;
        const verRole = "1066087060315840613";

        const verifiedEmbed = new EmbedBuilder()
        .setTitle("You have already been verified!")
        .setColor("Red")

        const errEmbed = new EmbedBuilder()
        .setTitle("Verification failed!")
        .setDescription("You can use this command only in https://dsc.gg/coding-de !")
        .setURL("https://dsc.gg/coding-de")
        .setColor("Red")

        const successEmbed = new EmbedBuilder()
        .setTitle("Verification successfull!")
        .setDescription("You  have been verified successfull! Have fun!")
        .addFields({ name: "Rules:", value: "<#1066077954272141403>"})
        .setColor("Green")


        const wrongChannel =  new EmbedBuilder()
        .setTitle("WRONG CHANNEL!")
        .setDescription("Please use <#1066092663444611132> to verify!")
        .setColor("Red")
 
        if (GuildID != '1066067518176890922') {
          return interaction.reply({
            embeds: [errEmbed],
            ephemeral: true
          }).catch(err => {
            return;
        });
        };

        if (VerChannel != "1066092663444611132") {
            return interaction.reply({
                embeds: [wrongChannel],
                ephemeral: true
            }).catch(err => {
                return;
            });
        };

        if (interaction.member.roles.cache.has(verRole)) {
            return interaction.reply({
                embeds: [verifiedEmbed],
                ephemeral: true
            }).catch(err => {
                return;
            });
        };

        await interaction.member.roles.add(verRole).catch(err => {
            return;
        });;

        return interaction.reply({
            embeds: [successEmbed],
            ephemeral: true
        }).catch(err => {
            return;
        });

    }
}