const mongoose = require('mongoose');
const mongodbURL = process.env.MONGODBURL;
const { ActivityType } = require(`discord.js`)

mongoose.set('strictQuery', false);


module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Ready!');

        if (!mongodbURL) return;

        await mongoose.connect(mongodbURL || '', {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        if (mongoose.connect) {
            console.log("Logged in as AURA BOT");
        }

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },
                    
                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }

    const servers = await client.guilds.cache.size;
    const users = await client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    );

    let status = [
      {
        name: "developed by toowake#0001",
        type: ActivityType.Watching,
      },
      {
        name: `use /report-bug to report a bug`,
        type: ActivityType.Watching,
      },
      {
        name: `${servers} Servers and ${users} Users`,
        type: ActivityType.Watching,
      },
    ];
    console.log(`✅ Enabling Status`);
    setInterval(() => {
      let random = Math.floor(Math.random() * status.length);
      client.user.setActivity(status[random]);
    }, `5000`);
    console.log("Sucessfully Enabled Status.");
    },
};

