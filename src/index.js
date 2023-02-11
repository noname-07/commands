const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, AuditLogEvent, MessageCollector, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

const levelSchema = require('./Schemas.js/level');
client.on(Events.MessageCreate, async (message) => {

    const { guild, author} = message;

    if (!guild || author.bot) return;

    levelSchema.findOne({ Guild: guild.id, User: author.id}, async (err, data) => {

        if (err) throw err;

        if (!data) {
            levelSchema.create({
                Guild: guild.id,
                User: author.id,
                XP: 0,
                Level: 0
            })
        }
    })

    const channel = message.channel;

    const give = 1;

    const data = await levelSchema.findOne({ Guild: guild.id, User: author.id});

    if (!data) return;

    const requiredXP = data.Level * data.Level * 20+20;

    if (data.XP + give >= requiredXP) {

        data.XP +- give;
        data.Level += 1;
        await data.save();

        if (!channel) return;

        const embed = new EmbedBuilder()
        .setColor("Purple")
        .setDescription(`${author} du hast **Level ${data.Level}** erreicht!`)

        channel.send({ embeds: [embed] });
    } else {
        data.XP += give;
        data.save()
    }
})

const reportSchema = require('./Schemas.js/rep');
client.on(Events.InteractionCreate, async interaction => {
 
    if (!interaction.isModalSubmit()) return;
 
    if (interaction.customId === 'modal') {
 
        const contact = interaction.fields.getTextInputValue('contact');
        const issue = interaction.fields.getTextInputValue('issue');
        const description = interaction.fields.getTextInputValue('description');
 
        const member = interaction.user.id;
        const tag = interaction.user.tag;
        const server = interaction.guild.name;
 
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("New Report")
        .setDescription(`Reporting Member: ${tag} (${member})`)
        .addFields({ name: "Form of Contact", value: `${contact}`, inline: false})
        .addFields({ name: "Issue Reported", value: `${issue}`, inline: false})
        .addFields({ name: "Description of the issue", value: `${description}`, inline: false})
 
        reportSchema.findOne({ Guild: interaction.guild.id}, async (err, data) => {
 
            if (!data) return;
 
            if (data) {
                const channelID = data.Channel;
 
                const channel = interaction.guild.channels.cache.get(channelID);
 
                channel.send({ embeds: [embed] });
 
                await interaction.reply({ content: "Your report as been submitted", ephemeral: true})
            }
        })
 
    }
})

//ticket system
const ticketSchema = require("./Schemas.js/ticketSchema");
client.on(Events.InteractionCreate, async interaction => {
 
    if (interaction.isButton()) return;
    if (interaction.isChatInputCommand()) return;
 
    const modal = new ModalBuilder()
        .setTitle("Provide us with more information.")
        .setCustomId("modal")
 
    const email = new TextInputBuilder()
        .setCustomId("email")
        .setRequired(true)
        .setLabel("Provide us with your email.")
        .setPlaceholder("You must enter a valid email")
        .setStyle(TextInputStyle.Short)
 
    const username = new TextInputBuilder()
        .setCustomId("username")
        .setRequired(true)
        .setLabel("Provide us with your username please.")
        .setPlaceholder("Username")
        .setStyle(TextInputStyle.Short)
 
    const reason = new TextInputBuilder()
        .setCustomId("reason")
        .setRequired(true)
        .setLabel("The reason for this ticket?")
        .setPlaceholder("Give us a reason for opening this ticket")
        .setStyle(TextInputStyle.Short)
 
    const firstActionRow = new ActionRowBuilder().addComponents(email)
    const secondActionRow = new ActionRowBuilder().addComponents(username)
    const thirdActionRow = new ActionRowBuilder().addComponents(reason)
 
    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
 
    let choices;
    if (interaction.isSelectMenu()) {
 
        choices = interaction.values;
 
        const result = choices.join("");
 
        ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
 
            const filter = { Guild: interaction.guild.id };
            const update = { Ticket: result };
 
            ticketSchema.updateOne(filter, update, {
                new: true
            }).then(value => {
                console.log(value)
            })
        })
    }
 
    if (!interaction.isModalSubmit()) {
        interaction.showModal(modal)
    }
})
 
client.on(Events.InteractionCreate, async interaction => {
 
    if (interaction.isModalSubmit()) {
 
        if (interaction.customId == "modal") {
 
            ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
 
                const emailInput = interaction.fields.getTextInputValue("email")
                const usernameInput = interaction.fields.getTextInputValue("username")
                const reasonInput = interaction.fields.getTextInputValue("reason")
 
                const posChannel = await interaction.guild.channels.cache.find(c => c.name === `ticket-${interaction.user.id}`);
                if (posChannel) return await interaction.reply({ content: `You already have a ticket open - ${posChannel}`, ephemeral: true });
 
                const category = data.Channel;
 
                const embed = new EmbedBuilder()
                    .setColor("Blue")
                    .setTitle(`${interaction.user.id}'s Ticket`)
                    .setDescription("Welcome to your ticket! Please wait while the staff team review the details.")
                    .addFields({ name: `Email`, value: `${emailInput}` })
                    .addFields({ name: `Username`, value: `${usernameInput}` })
                    .addFields({ name: `Reason`, value: `${reasonInput}` })
                    .addFields({ name: `Type`, value: `${data.Ticket}` })
                    .setFooter({ text: `${interaction.guild.name}'s tickets.` })
 
                const button = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("ticket")
                            .setLabel("🗑️ Close Ticket")
                            .setStyle(ButtonStyle.Danger)
                    )
 
                let channel = await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.id}`,
                    type: ChannelType.GuildText,
                    parent: `${category}`
                })
 
                let msg = await channel.send({ embeds: [embed], components: [button] });
                await interaction.reply({ content: `Your ticket is now open inside of ${channel}.`, ephemeral: true });
 
                const collector = msg.createMessageComponentCollector()
 
                collector.on("collect", async i => {
                    await channel.delete();
 
                    const dmEmbed = new EmbedBuilder()
                        .setColor("Blue")
                        .setTitle("Your ticket has been closed")
                        .setDescription("Thanks for contacting us! If you need anything else just feel free to open up another ticket!")
                        .setTimestamp()
 
                    await interaction.member.send({ embeds: [dmEmbed] }).catch(err => {
                        return;
                    })
                })
            })
        }
    }
})

const stickySchema = require('./Schemas.js/stickySchema');
 
client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;
 
    stickySchema.findOne({ ChannelID: message.channel.id}, async (err, data) => {
        if (err) throw err;
 
        if (!data) {
            return;
        }
 
        let channel = data.ChannelID;
        let cachedChannel = client.channels.cache.get(channel);
 
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(data.Message)
        .setFooter({ text: "This is a sticky message"})
 
        if (message.channel.id == channel) {
 
            data.CurrentCount += 1;
            data.save();
 
            if (data.CurrentCount > data.MaxCount) {
                try {
                    await client.channels.cache.get(channel).messages.fetch(data.LastMessageID).then(async(m) => {
                        await m.delete();
                    })
 
                    let newMessage = await cachedChannel.send({ embeds: [embed] });
 
                    data.LastMessageID = newMessage.id;
                    data.CurrentCount = 0;
                    data.save();
                } catch {
                    return;
                }
            }
        }
    })
})