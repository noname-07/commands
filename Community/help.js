const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help Command'),

    async execute(interaction, client) {

        const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Hilfe Center")
        .setDescription(`Help Command Guide`)
        .addFields({ name: "Page 1", value: "Hilfe & Ressourcen (Button 1)"})
        .addFields({ name: "Page 2", value: "Communuty Commands (Button 2)"})
        .addFields({ name: "Page 3", value: "Moderation Commands (Button 3)"})
        .addFields({ name: "Page 4", value:"XP System"})

        const embed2 = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Community Commands")
        .addFields({ name: "Alle öffentliche Commands:", value: "help, botinvite, invite, status, whois, warnings"})
        .addFields({ name: "/botinvite", value: "Invitelink für diesen Bot"})
        .addFields({ name: "/help", value: "Hilfe Command"})
        .addFields({ name: "/invites", value: "Schaue wie viele Invites ein User hat"})
        .addFields({ name: "/status", value: "Bot Status"})
        .addFields({ name: "/whois", value: "Bekomme alle Infos über einen User (Warns ausgeschlossen)"})
        .addFields({ name: "/membercount", value: "Zählt alle User deines Servers"})
        .addFields({ name: "/vote", value:"Vote für den Bot auf Top.gg"})
        .addFields({ name: "/meme", value:"Random Memes"})
        .addFields({ name: "/databasetest", value:"Teste die Database"})
        .addFields({ name: "/socials", value:"Bekomme einen Link zu meinen Sozialen Netzwerken"})
        .addFields({ name: "/8ball", value:"Was wohl die Antwort sein wird....", inline: false})
        .addFields({ name: "/report", value:"Melde ein Problem an das Serverteam", inline: false})
        .addFields({ name: "/rank", value:"Schaue dein Level an!", inline: false})
        .addFields({ name: "/serverinfo", value:"Bekomme die komplette Serverinfo!", inline: false})
        .setFooter({ text: "Community Commands"})
        .setTimestamp()

        const embed3 = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Moderation Commands")
        .addFields({ name: "Moderation Commands:", value: "botinvite, invite, status, whois, warnings"})
        .addFields({ name: "/clear", value: "Lösche Nachrichten"})
        .addFields({ name: "/ban", value: "Banne einen User"})
        .addFields({ name: "/clearwarn", value: "Löscht eine Bestimmte Anzahl an Warns"})
        .addFields({ name: "/kick", value: "Bot Status"})
        .addFields({ name: "/timeout", value: "Schicke einen User ins Timeout"})
        .addFields({ name: "/unban", value: "Entferne einen User aus dem Bann"})
        .addFields({ name: "/untimeout", value: "Hole einen User aus dem timeout"})
        .addFields({ name: "/warn", value: "Warne einen User"})
        .addFields({ name: "/report-disable", value:"Deaktiviere das Report-System", inline: false})
        .addFields({ name: "/report-setup", value:"Erstelle das Report System", inline: false})
        .addFields({ name: "/xp-reset-user", value:"resette das XP von einem User", inline: false})
        .addFields({ name: "/xp-reset-server", value:"restte das XP von dem Server", inline: false})
        .setFooter({ text: "Moderation Commands"})
        .setTimestamp()

        const embed4 = new EmbedBuilder()
        .setColor("Random")
        .setTitle("XP System")
        .addFields({ name: "/lb", value:"XP Leaderboard"})
        .addFields({ name: "/leaderboard", value:"XP Leaderboard"})
        .addFields({ name: "/rank", value:"Schaue deinen XP Fortschritt an"})
        .addFields({ name: "/xp-reset-user", value:"Setze das XP von einem User auf 0"})
        .addFields({ name: "/sp-reset-server", value:"Setze das XP System von diesem Server zurück"})
        

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`page1`)
            .setLabel('Seite 1')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page2`)
            .setLabel('Seite 2')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page3`)
            .setLabel('Seite 3')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page4`)
            .setLabel(`Seite 4`)
            .setStyle(ButtonStyle.Success),
        )

        const message = await interaction.reply({ embeds: [embed], components: [button] });
        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async i => {

            if (i.customId === 'page1') {
     
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Nur ${interaction.user.tag} kann diese Buttons benutzen!`, ephemeral: true})
                }

                await i.update({ embeds: [embed], components: [button]})
            }

            if (i.customId === 'page2') {
     
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Nur ${interaction.user.tag} kann diese Buttons benutzen!`, ephemeral: true})
                }

                await i.update({ embeds: [embed2], components: [button]})
            }

            if (i.customId === 'page3') {
     
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Nur ${interaction.user.tag} kann diese Buttons benutzen!`, ephemeral: true})
                }

                await i.update({ embeds: [embed3], components: [button]})
            }

            if (i.customId === 'page4') {

                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Nur ${interaction.user.tag} kann diese Buttons benutzen!`, ephemeral: true})
                }

                await i.update({ embeds: [embed4], components: [button]})
            }
        })
    }
}