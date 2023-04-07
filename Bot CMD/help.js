const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription("Get help"),
    
    async execute (interaction) {

        const Start = new EmbedBuilder()
        .setTitle("start page")
        .addFields(
            {name: "Page 1", value: `start page`, inline: true},
            {name: "Page 2", value: `anti link system`, inline: true},
            {name: "Page 3", value: `anti ghost system`, inline: true},
            {name: "Page 4", value: `automod`, inline: true},
            {name: "Page 5", value: `bot cmds`, inline: true},
            {name: "Page 6", value: `database`, inline: true},
            {name: "Page 7", value: `community commands`, inline: true},
            {name: "Page 8", value: `creation tools`, inline: true},
            {name: "Page 9", value: `economy system`, inline: true},
            {name: "Page 10", value: `games`, inline: true},
            {name: "Page 11", value: `moderation`, inline: true},
            {name: "Page 12", value: `warn system`, inline: true},
        )
        .setColor("NotQuiteBlack")
        .setTimestamp()

        const LinkSys = new EmbedBuilder()
        .setTitle("anti link system")
        .addFields(
            {name: "anti link", value: "</anti-link:1091851481109508116>", inline: true},
        )
        .setColor("Green")

        const GhostSys = new EmbedBuilder()
        .setTitle("anti ghost system")
        .addFields(
            {name: "anti ghost", value: "</anti-ghostping:1091837745925726306>", inline: true},
        )

        const Automod = new EmbedBuilder()
        .setTitle("automod")
        .addFields(
            {name: "anti keyword", value: "</anti-word:1091340536494960680>", inline: true},
            {name: "anti spam", value: `</anti-spam:1091340536494960681>`, inline: true},
            {name: "anti flagged words", value: `</anti-flagged-words:1091340536494960682>`, inline: true},
            {name: "anti mention spam", value: `</anti-mention-spam:1091340536494960683>`, inline: true},
        )
        .setColor("Blue")

        const Bot = new EmbedBuilder()
        .setColor("Purple")
        .setTitle("Bot commands")
        .addFields(
            {name: "bot info", value: "</botinfo:1085989073132458024>", inline: true},
            {name: "bot invite", value: "</botinvite:1049760831581200454>", inline: true},
            {name: "help", value: "</help:1084070436834390056>", inline: true},
            {name: "uptime", value: "</uptime:1085989073132458028>", inline: true},
            {name: "vote", value: "</vote:1063487847308460043>", inline: true},
        )
        
        const DB = new EmbedBuilder()
        .setTitle("database")
        .addFields(
            {name: "data base test", value: "</dbtest:1063115940763541506>", inline: true},
            {name: "google db", value: "</sheet-db:1091837745925726300>", inline: true}
        )
        .setColor("Green")

        const Com = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle("community")
        .addFields(
            {name: "cat image", value: "</cat:1085989073132458025>", inline: true},
            {name: "enlarge", value: "</enlarge:1091839297033883678>", inline: true},
            {name: "leaderboard", value: "<leaderboard:1063837237894201344>", inline: true},
            {name: "membercount", value: "</membercount:1056900006315036714>", inline: true},
            {name: "meme", value: "</meme:1063477137471975444>", inline: true},
            {name: "rank", value: "</rank:1063788176843481128>", inline: true},
            {name: "report-bug", value: "</report-bug:1085621804695027759>", inline: true},
            {name: "report", value: "</report:1065616553481089087>", inline: true},
            {name: "serverinfo", value: "</serverinfo:1065994243983810681>", inline: true},
            {name: "socials", value: "</socials:1055574371311296595>", inline: true},
            {name: "suggest", value: "</suggest:1087764345066356887>", inline: true},
            {name: "time", value: "</time:1091803257917161502>", inline: true},
            {name: "verify", value: "</verify:1085612173675466818>", inline: true},
        )

        const Creation =  new EmbedBuilder()
        .setTitle("creation tools")
        .setColor("Grey")
        .addFields(
            {name: "embed creator", value: "</create-embed:1089304029349298258>", inline: true},
            {name: "thread creator", value: "</create-thread:1073271898374410310>", inline: true}
        )

        const Eco = new EmbedBuilder()
        .setTitle("economy system")
        .setColor("Green")
        .addFields(
            {name: "balance", value: "</bal:1087408915416879206>", inline: true},
            {name: "beg", value: "</beg:1087408915416879207>", inline: true},
            {name: "economy", value: "</economy:1087408915416879208>", inline: true}
        )

        const Game = new EmbedBuilder()
        .setTitle("games")
        .setColor("DarkButNotBlack")
        .addFields(
            {name: "8 ball", value: "</8ball:1065616553481089084>", inline: true},
            {name: "calculator", value: "</calculator:1091837745925726301>", inline: true},
            {name: "dice", value: "</dice:1091414563347513426>", inline: true},
            {name: "dictionary", value: "</dictionary:1073624441805881384>", inline: true},
            {name: "game", value: "</game:1091433410712580168>", inline: true},
            {name: "hangman", value: "</hangman:1091837745925726303>", inline: true},
            {name: "coinflip", value: "</coinflip:1066692071865466890>", inline: true},
            {name: "random", value: "</random:1087773739376181288>", inline: true},
            {name: "wikipedia", value: "</wiki:1091837745925726304>", inline: true},
            {name: "wordle", value: "</wordle:1091837745925726305>", inline: true}
        )

        const Mod = new EmbedBuilder()
        .setTitle("moderation")
        .setColor("Red")
        .addFields(
            {name: "add-xp", value: "</add-xp:1085989073132458029>", inline: true},
            {name: "announce", value: "</announce:1087769055278153758>", inline: true},
            {name: "ban", value: "</ban:1091039020609437717>", inline: true},
            {name: "create-webhook", value: "</create-webhook:1087406157888499805>", inline: true},
            {name: "invites", value: "</invites:1047212451172712498>", inline: true},
            {name: "kick", value: "</kick:1047174244682973235>", inline: true},
            {name: "lock", value: "</lock:1066419333447823411>", inline: true},
            {name: "poll", value: "</poll:1088532356165546106>", inline: true},
            {name: "reactionrole", value: "</reactrole:1066093321463808061>", inline: true},
            {name: "report-disable", value: "</report-disable:1065616553481089085>", inline: true},
            {name: "report-setup", value: "</report-setup:1065616553481089086>", inline: true},
            {name: "role-info", value: "</role-info:1091806609874878516>", inline: true},
            {name: "steal", value: "</steal:1068840902107353209>", inline: true},
            {name: "stick", value: "</stick:1073233388699398154>", inline: true},
            {name: "timeout", value: "</timeout:1051473822500519966>", inline: true},
            {name: "unban", value: "</unban:1050492451263107072>", inline: true},
            {name: "unlock", value: "</unlock:1066419333447823412>", inline: true},
            {name: "unstick", value: "</unstick:1073233388699398155>", inline: true},
            {name: "untimeout", value: "</untimeout:1051472119692795905>", inline: true},
            {name: "whois", value: "</whois:1054465157172039700>", inline: true},
            {name: "xp-reset-user", value: "</xp-reset-user:1063837237894201345>", inline: true},
            {name: "xp-reset-server", value: "</xp-reset-server:1063837237894201346>", inline: true},
        )

        const Warn =  new EmbedBuilder()
        .setTitle("warn system")
        .setColor("Blue")
        .addFields(
            {name: "warn", value: "</warn:1047900759414554745>", inline: true},
            {name: "trollwarn", value: "</trollwarn:1083459697174134984>", inline: true}
        )

        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("1")
            .setLabel("1")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId("2")
            .setLabel("2")
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId("3")
            .setLabel("3")
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId("4")
            .setLabel("4")
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId("5")
            .setLabel("5")
            .setStyle(ButtonStyle.Success),
        )

        const button2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("6")
            .setLabel("6")
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId("7")
            .setLabel("7")
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId("8")
            .setLabel("8")
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId("9")
            .setLabel("9")
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId("10")
            .setLabel("10")
            .setStyle(ButtonStyle.Secondary),
        )

        const button3 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("11")
            .setLabel("11")
            .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
            .setCustomId("12")
            .setLabel("12")
            .setStyle(ButtonStyle.Secondary),
        )

        const message = await interaction.reply({ embeds: [Start], components: [buttons, button2, button3]});
 
        const collector = await message.createMessageComponentCollector();
 
        collector.on("collect", async i => {
            
            if (i.customId === "1") {
                await i.update({ embeds: [Start], components: [buttons, button2, button3] });
            }
 
            if (i.customId === "2") {
                await i.update({ embeds: [LinkSys], components: [buttons, button2, button3] });
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
                    return interaction.reply({
                        content: "You cant use this Button!",
                        ephemeral: true
                    })
                }
            }

            if (i.customId === "3") {
                await i.update({ embeds: [GhostSys], components: [buttons, button2, button3] });
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
                    return interaction.reply({
                        content: "You cant use this Button!",
                        ephemeral: true
                    })
                }
            }

            if (i.customId === "4") {
                await i.update({ embeds: [Automod], components: [buttons, button2, button3] });

                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
                    return interaction.reply({
                        content: "You cant use this Button!",
                        ephemeral: true
                    })
                }
            }

            if (i.customId === "5") {
                await i.update({ embeds: [Bot], components: [buttons, button2, button3] });
            }

            if (i.customId === "6") {
                await i.update({ embeds: [DB], components: [buttons, button2, button3] });
            }

            if (i.customId === "7") {
                await i.update({ embeds: [Com], components: [buttons, button2, button3] });
            }

            if (i.customId === "8") {
                await i.update({ embeds: [Creation], components: [buttons, button2, button3] });
            }

            if (i.customId === "9") {
                await i.update({ embeds: [Eco], components: [buttons, button2, button3] });
            }

            if (i.customId === "10") {
                await i.update({ embeds: [Game], components: [buttons, button2, button3] });
            }

            if (i.customId === "11") {
                await i.update({ embeds: [Mod], components: [buttons, button2, button3] });

                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
                    return interaction.reply({
                        content: "You cant use this Button!",
                        ephemeral: true
                    })
                }
            }

            if (i.customId === "12") {
                await i.update({ embeds: [Warn], components: [buttons, button2, button3] });
            }
        })


    }
}