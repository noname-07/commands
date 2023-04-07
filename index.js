const { AttachmentBuilder , Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, AuditLogEvent, MessageCollector, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require(`discord.js`);
const fs = require('fs');
const Discord = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    allowedMentions: {
    parse: [`users`, `roles`],
    repliedUser: true,
  }}); 




client.commands = new Collection();

require('dotenv').config();


(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
});
//level system
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
        .setDescription(`${author} you reached **Level ${data.Level}**!`)

        channel.send({ embeds: [embed] });
    } else {
        data.XP += give;
        data.save()
    }
})
//report system
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


//sticky message
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


//invite logger
const inviteSchema = require('./Schemas.js/inviteSchema');
 
const invites = new Collection();
const wait = require("timers/promises").setTimeout;
 
client.on('ready', async () => {
 
    await wait(2000);
 
    client.guilds.cache.forEach(async (guild) => {
 
        const clientMember = guild.members.cache.get(client.user.id);
 
        if (!clientMember.permissions.has(PermissionsBitField.Flags.ManageGuild)) return;
 
        const firstInvites = await guild.invites.fetch().catch(err => {console.log(err)});
 
        invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
 
    })
})
 
client.on(Events.GuildMemberAdd, async member => {
 
    const Data = await inviteSchema.findOne({ Guild: member.guild.id});
    if (!Data) return;
 
    const channelID = Data.Channel;
 
    const channel = await member.guild.channels.cache.get(channelID);
 
    const newInvites = await member.guild.invites.fetch();
 
    const oldInvites = invites.get(member.guild.id);
 
    const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
 
    if (!invite) return await channel.send(`${member.user.tag} joined the server using an unknown invite.  This could possibly a vanity invite link if your server has one.`)
 
    const inviter = await client.users.fetch(invite.inviter.id);

    const { guild } = interaction;
    const { name } = guild;
    const icon = guild.iconURL();

    const embed1 = new EmbedBuilder()
    .setTitle("New Member")
    .setDescription(`${member.user.tag} joined the server!`)
    .addFields(
        {name: "User:", value: `<@${member.id}>`, inline: true},
        {name: "Date:", value: `${Date.now}`, inline: true},
        {name: "Invite:", value: `${invite.code}`, inline: true},
        {name: "Invite uses:", value: `${invite.uses}`, inline: true},
        {name: "Inviter:", value: `<@${inviter.id}>`, inline: true},
        {name: "Member No.:", value: `${guild.memberCount}`}
    )
    .setColor("Green")
    .setTimestamp()
    .setAuthor({ name: name, iconURL: icon })

    const embed2 = new EmbedBuilder()
    .setTitle("New Member!")
    .setDescription(`${member.user.tag} joined the server but I can't find what invite they used to do it`)
    .setColor("Green")
    .setTimestamp()
 
    inviter 
        ? channel.send({
            embeds: [embed1]
        }).catch(err => {
            return;
        })
        : channel.send({
            embeds: [embed2]
        }).catch(err => {
            return;
        });
})
 

const ghostSchema = require("./Schemas.js/ghostpingSchema");
const numSchema  = require("./Schemas.js/ghostnum");
 
client.on(Events.MessageDelete, async message => {
 
    const Data = await ghostSchema.findOne({ Guild: message.guild.id});
    if (!Data) return;
 
    if (!message.author) return;
    if (message.author.bot) return;
    if (!message.author.id === client.user.id) return;
    if (message.author === message.mentions.users.first()) return;
 
    if (message.mentions.users.first() || message.type === MessageType.reply) {
 
        let number;
        let time = 15;
 
        const data = await numSchema.findOne({ Guild: message.guild.id, User: message.author.id});
        if (!data) {
            await numSchema.create({
                Guild: message.guild.id,
                User: message.author.id,
                Number: 1
            })
 
            number = 1;
        } else {
            data.Number += 1;
            await data.save();
 
            number = data.Number;
        }
 
        if (number == 2) time = 60;
        if (number >= 3) time = 500;
 
        const msg = await message.channel.send({ content: `${message.author}, you cannot ghost ping members within this server!`});
        setTimeout(() => msg.delete(), 5000);
 
        const member = message.member;
 
        if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return;
        } else {
            await member.timeout(timeout * 1000, "Ghost Pinging");
            await member.send({ content: `You have been timed out in ${message.guild.name} for ${time} seconds due to ghost pinging members`}).catch(err => {
                return;
            })
        }
    }
})

//anti link system
const linkSchema = require('./Schemas.js/linkSchema');
client.on(Events.MessageCreate, async message => {
 
    if (message.content.startsWith('http') || message.content.startsWith('discord.gg') || message.content.includes('https://') || message.content.includes('http://') || message.content.includes('discord.gg/')) {
 
        const Data = await linkSchema.findOne({ Guild: message.guild.id});
 
        if (!Data) return;
 
        const memberPerms = Data.Perms;
 
        const user = message.author;
        const member = message.guild.members.cache.get(user.id);
 
        if (member.permissions.has(memberPerms)) return;
        else {
            await message.channel.send({ content: `${message.author}, you can't send links here!`}).then(msg => {
                setTimeout(() => msg.delete(), 3000)
            })
 
            ;(await message).delete();
        }
    }
})


