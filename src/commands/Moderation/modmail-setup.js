const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType, ButtonBuilder, ComponentBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const mailSchema = require('../../Schemas.js/GuildConfig');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("modmail-setup")
    .setDescription("Setup for modmail")
    .addChannelOption(option => option
        .setName("category")
        .setDescription("Category for Modmails")
        .addChannelTypes(ChannelType.GuildCategory).setRequired(true)),

    async esecute (interaction) {

        //define some things
        const guildid = interaction.guild.id;

        const channel = interaction.options.getChannel("category");
        
        const cid = channel.id;

        //no perms message
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You cant setup modmail (Error: Missing Permissions)", ephemeral: true});

        

        //data embed
        const embed = new EmbedBuilder()
        .setTitle("Modmail Setup")
        .setDescription(`The Modmail has been setup successfull!`)
        .addFields({ name: "Admin:", value: `${interaction.user.username}`, inline: false})
        .addFields({ name: "Guild:", value: `${interaction.guild.name}`, inline: false})
        .addFields({ name: "GuildID:", value: `${interaction.guild.id}`, inline: false})
        .addFields({ name: "Category:", value: `${channel}`})
        .setTimestamp()
        .setAuthor(interaction.guild.name)
        .setFooter("AURA BOT 2023")
        .setColor("Green")

        //delete Embed
        const delEmbed = new EmbedBuilder()
        .setTitle("Your Mail Setup has been deleted!")
        .setDescription("If that was a mistake, please make a new Setup!")
        .setTimestamp()

        //verify data embed
        const verEmbed = new EmbedBuilder
        .setTitle("You verified the Data succesfull!")
        .addFields({ name: "Admin:", value: `${interaction.user.username}`, inline: false})
        .addFields({ name: "Guild:", value: `${interaction.guild.name}`, inline: false})
        .addFields({ name: "GuildID:", value: `${interaction.guild.id}`, inline: false})
        .addFields({ name: "Category:", value: `${channel}`})
        .setColor("Green")

        //buttons
        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setLabel(`Verify the Data!`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId("delete")
            .setLabel('Clear Data')
            .setStyle(ButtonStyle.Danger)
        )

        //define msg and create the first message
        const msg = await interaction.reply({embeds: [embed], components: [buttons]});

        //build collecor
        const collector = msg.createMessageComponentCollector()
 
        collector.on('collect', async i => {
            if (i.customId == 'delete') {
                i.update({ embeds: [delEmbed] })

                mailSchema.deleteMany({ Guild: guildid}, async (err, data) => {
                    return await interaction.reply({ content: "Modmail deleted!", ephemeral: true})
                })
            }

            if (i.customId == 'button') {
                i.update({ embeds: [verEmbed] })

                //schema create
            mailSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
 
             if (!data) {
                mailSchema.create({
                    Guild: guildid,
                    Category: cid,
                })
             } else {
                await interaction.reply({ content: "The Modmail System has already been setup!", ephemeral: true });
                return;
            }
           })
          }
        })

    }
}