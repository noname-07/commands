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
        .addFields({ name: "Page 2", value: "XP-System (Button 2)"})
        .addFields({ name: "Page 3", value: "Moderation Commands (Button 3)"})
        .addFields({ name: "Page 4", value:"Community Commands (Button 4)"})

        const embed2 = new EmbedBuilder()
        .setColor("Random")
        .setTitle("XP System")
        .addFields({ name: "/leaderbaord", value: "XP-Leaderboard", inline: false})
        .addFields({ name: "/rank", value: "Dein XP Rank", inline: false})
        .addFields({ name: "/xp-reset-user", value: "Setze das XP eines User zurück", inline: false})
        .addFields({ name: "/xp-reset-server", value: "Setze das Xp System von einem Server zurück", inline: false})
        .setFooter({ text: "XP System"})
        .setTimestamp()

        const embed3 = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Moderation Commands")
        .addFields({ name: "/ban", value: "Banne einen User", inline: false})
        .addFields({ name: "/clearwarn", value: "Lösche die Warns eines Users", inline: false})
        .addFields({ name: "/kick", value: "Kicke einen User", inline: false})
        .addFields({ name: "/lock", value: "Schließe einen Channel", inline: false})
        .addFields({ name: "/reactionrole", value: "Erstelle eine Reactionrole", inline: false})
        .addFields({ name: "/report-disable", value: "Deaktiviere das Report-System", inline: false})
        .addFields({ name: "/report-setup", value: "Aktiviere das Report System", inline: false})
        .addFields({ name: "/steal", value: "Stehle einen Emoji", inline: false})
        .addFields({ name: "/stick", value: "Erstelle eine Sticky Message", inline: false})
        .addFields({ name: "/ticket-disable", value: "Deaktiviere das Ticket System", inline: false})
        .addFields({ name: "/ticket-setup", value: "Erstelle das Ticket System", inline: false})
        .addFields({ name: "/timeout", value: "Versetze einen USer ins Timeout", inline: false})
        .addFields({ name: "/unban", value: "Unban einen User", inline: false})
        .addFields({ name: "/unlock", value: "Öffne einen geschlossenen Channel", inline: false})
        .addFields({ name: "/unstick", value: "Deaktiviere deine Sticky Message", inline: false})
        .addFields({ name: "/untimeout", value: "Bringe einen User aus dem Timeout", inline: false})
        .addFields({ name: "/warn", value: "Warne einen User", inline: false})
        .setFooter({ text: "Moderation Commands"})
        .setTimestamp()

        const embed4 = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Community Commands")
        .addFields({ name: "/8ball", value: "Was die Antwort wohl sein wird...", inline: false})
        .addFields({ name: "/botinvite", value: "Invite den Bot", inline: false})
        .addFields({ name: "/chatgpt", value: "Ask ChatGPT! (BETA FEATURE)", inline: false})
        .addFields({ name: "/create-thread", value: "Erstelle einen Thread", inline: false})
        .addFields({ name: "/databasetest", value: "Schaue ob die DB geht!", inline: false})
        .addFields({ name: "/dictionary", value: "Englisches Wörterbuch (BETA FEATURE)", inline: false})
        .addFields({ name: "/headsntails", value: "Kopf oder Zahl?", inline: false})
        .addFields({ name: "/invites", value: "Schaue wie viele invites ein User hat", inline: false})
        .addFields({ name: "/membercount", value: "Schaue wie viele User ein Server hat", inline: false})        
        .addFields({ name: "/meme", value: "Random Reddit meme", inline: false})
        .addFields({ name: "/modal", value: "modal", inline: false})
        .addFields({ name: "/report", value: "Reporte ein Problem an den Server", inline: false})
        .addFields({ name: "/serverinfo", value: "Genaue Infos über den Server", inline: false})
        .addFields({ name: "/socials", value: "meine Socials!", inline: false})
        .addFields({ name: "/stats", value: "Bot Stats", inline: false})
        .addFields({ name: "/status", value: "Bot Status", inline: false})
        .addFields({ name: "/vote", value: "Vote auf Top.gg!", inline: false})
        

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`page1`)
            .setLabel('Introduction')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page2`)
            .setLabel('XP System')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page3`)
            .setLabel('Moderation')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page4`)
            .setLabel(`Community`)
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