const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const cpuStat = require("cpu-stat");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('get some info about the bot'),

    async execute (interaction, client) {
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60

        cpuStat.usagePercent(function (error, percent) {

            if(error) return interaction.reply({ content: `${error}` })

            const memoryUsage = formatBytes(process.memoryUsage().heapUsed)
            const node = process.version
            const cpu = percent.toFixed(2)

            const embed = new EmbedBuilder()
            .setColor("Green")
            .addFields(
                {name: "Developer:", value:`<@931870926797160538>`, inline: false},
                {name: "Client name:", value:`<@${client.user.id}>`, inline: false},
                {name: "Client ID:", value:`${client.user.id}`, inline: false},
                {name: "Created at:", value:`27.11.2022`, inline: false},
                {name: "Help Command:", value:`</help:1084070436834390056>`, inline: false},
                {name: "Uptime:", value:`</uptime:1084154063647678618>`, inline: false},
                {name: "Bot-Ping:", value:`${client.ws.ping}`, inline: false},
                {name: "Node:", value:`${node}`, inline: false},
                {name: "CPU usage:", value:`${cpu} %`, inline: false},
                {name: "SSD usage:", value:`${memoryUsage}`, inline: false},
            )

            interaction.reply({ embeds: [embed] })
        })

        function formatBytes(a, b) {
            let c = 1024
            d = b || 2 
            e = ['B', 'KB', 'MB', 'GB', 'TB']
            f = Math.floor(Math.log(a) / Math.log(c))

            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
        }

    }
}