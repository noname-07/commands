const { SlashCommandBuilder, MessageEmbed, Permissions, PermissionsBitField } = require('discord.js');
const levelSchema = require('../../Schemas.js/level');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-xp')
        .setDescription('Add XP to a user.')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The user to add XP to.')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('amount')
            .setDescription('The amount of XP to add.')
            .setRequired(true)
        ),

    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        const target = interaction.options.getUser('target');
        const data = await levelSchema.findOne({
            Guild: interaction.guild.id,
            User: target.id
        }).catch(err => {
            return;
        });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: 'Missing Permissions: ADMINISTRATOR',
                ephemeral: true
            }).catch(err => {
                return;
            });
        }

        if (!data) {
            levelSchema.create({
                Guild: interaction.guild.id,
                User: target.id,
                XP: amount,
                Level: 0
            }).catch(err => {
                return;
            })

            await interaction.reply({
                content: 'Could not find data for this user. i created a level for him.',
                ephemeral: true
            }).catch(err => {
                return;
            });
        }
        

        data.XP = amount;

        const nextLevelXp = Math.pow(data.Level * 100, 1.1).catch(err => {
            return;
        });
        if (data.XP >= nextLevelXp) {
            data.Level += 1;
            const embed = new EmbedBuilder()
                .setColor('Purple')
                .setDescription(`Congratulations, ${target}! You have leveled up to level ${data.Level}.`);
            await interaction.channel.send({
                embeds: [embed],
                ephemeral: true
            }).catch(err => {
                return;
            });
        }

        await data.save().catch(err => {
            return;
        });

        const embed = new EmbedBuilder()
            .setColor('Purple')
            .setDescription(`You added ${amount} XP to ${target}.`).catch(err => {
                return;
            });
        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        }).catch(err => {
            return;
        });
    },
};