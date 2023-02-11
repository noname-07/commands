const {SlashCommandBuilder} = require("discord.js");
const {Configuration, OpenAIApi} =  require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


module.exports = {
    data: new SlashCommandBuilder()
    .setName("chatgpt")
    .setDescription("Frage ChatGPT!")
    .addStringOption(option => option
        .setName("prompt")
        .setDescription("Deine Frage!")
    ),

    async execute(interaction) {
        const prompt = interaction.options.getString("prompt") ?? "";
        if (!prompt) {
            await interaction.reply("Bitte gebe eine Frage ein!");
            return;
        }
        const completion =  await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 50,
            temperature: 0,
        });
        const response = completion.data.choices[0].text;
        await interaction.reply(response);
    }
}
