const {ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder} = require('discord.js'); //required builders

module.exports = {
    data: new ContextMenuCommandBuilder() //create a new Context Menu Command
    .setName('id') //setup the name
    .setType(ApplicationCommandType.User), //Type of the Context
    async execute (interaction) { //if ineraction....

        console.log(interaction); //write the tex of the interaction in the console

        const { targetId } = interaction //const target = the interaction user

        await interaction.reply({ content:`User ID: ${targetId}`, ephemeral: true}) //reply the ID as ephemeral
    }
}