const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, AuditLogEvent } = require(`discord.js`);
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