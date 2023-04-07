
const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require("discord.js"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban") //the name of the command
        .setDescription(`This bans a user`) //description of th command
        .addUserOption(option => option
                .setName("user")
                .setDescription(`The member you want to ban`)
                .setRequired(true)
        )
        .addStringOption(option => option
                .setName("reason")
                .setDescription(`The reason for banning the member`)
                .setRequired(false)
        ),
    async execute (interaction) {

        //define required things
        const ID = interaction.member.id;
        const banUser = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "No reason given!";

        //exclude errors
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({content: "You must have the ban members permission to use this command", ephemeral: true});
        if (interaction.member.id === banUser) return await interaction.reply({content: "You cannot ban yourself!", ephemeral: true });

        //define the embeds
        const DM = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`:white_check_mark:  You have been banned from **${interaction.guild.name}** | ${reason}`);

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`:white_check_mark:  ${banUser.tag} has been banned | ${reason}`);

        //create the ban
        interaction.guild.members.ban(banUser, {reason});

        //send the banned user the message that he is banned
        banUser.send({ embeds: [DM] }).catch(err => {
            return;
        })

        //let the interaction reply so the moderator knows that the ban was succesfully
        await interaction.reply({ embeds: [embed] }).catch(err => {
            return;
        });
    }
};