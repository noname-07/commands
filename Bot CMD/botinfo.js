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

            if(error) return interaction.reply({ content: `${error}` });

            const memoryUsage = formatBytes(process.memoryUsage().heapUsed);
            const node = process.version;
            const cpu = percent.toFixed(2);
            const servers = client.guilds.cache.size;
            const users = client.guilds.cache.reduce(
                (a, b) => a + b.memberCount,
                0
              );

            const embed = new EmbedBuilder()
            .setColor("Green")
            .addFields(
                {name: "Developer:", value:`<@931870926797160538>`, inline: true},
                {name: "Client name:", value:`<@${client.user.id}>`, inline: true},
                {name: "Client ID:", value:`${client.user.id}`, inline: true},
                {name: "Created at:", value:`27.11.2022`, inline: true},
                {name: "Help Command:", value:`</help:1084070436834390056>`, inline: true},
                {name: "Uptime:", value:`</uptime:1085989073132458028>`, inline: true},
                {name: "Bot-Ping:", value:`${client.ws.ping}`, inline: true},
                {name: "Node:", value:`${node}`, inline: true},
                {name: "CPU usage:", value:`${cpu} %`, inline: true},
                {name: "SSD usage:", value:`${memoryUsage}`, inline: true},
                {name: "Oauth2:", value: `False`, inline: true},
                {name: 'Top.gg:', value: `[Top.GG](https://vote.toowake.com)`, inline: true},
                {name: "Website:", value: `[Aura Bot](https://toowake.de/aurabot)`, inline:  true},
                {name: "Data-EN:", value: `[data-en](https://toowake.de/data-en)`, inline: true},
                {name: "Data-DE:", value: `[data-de](https://toowake.de/data-de)`, inline: true},
                {name: "Servers:", value: `${servers}`, inline: true},
                {name: "Members:", value: `${users}`, inline: true},
                {name: "Mongoose Connection:", value: `[true](https://mongodb.com/)`, inline: true}
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