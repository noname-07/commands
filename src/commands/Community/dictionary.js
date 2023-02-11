const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dictionary')
    .setDescription('Definition of a given word (Only English)')
    .addStringOption(option => option
        .setName('word')
        .setDescription('The Word you want to get the defnition')
        .setRequired(true)
    ),

    async execute (interaction) {

        const word = interaction.options.getString('word');

        let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        if (data.statusText == 'Not Found') {
            return interaction.reply({ content: "Dieses Wort existiert nicht!", ephemeral: true});
        }

        let info = await data.json();
        let result = info[0];

        let embedInfo = await result.meanings.map(( data, index) => {

            let definition = data.definitions[0].definition || 'Es wurde keine Definition gefunden!';
            let example = data.definition[0].example || 'Kein Beispiel gefunden!';

            return {
                name: data.partOfSpeech.toUpperCase(),
                value: `\`\`\` Definition: ${definition} \n Example: ${example} \`\`\``,
            };
        });

        const embed = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle(`Definition of | **${result.word}**`)
        .addFields(embedInfo)

        await interaction.reply({ embeds: [embed] });
    }
}