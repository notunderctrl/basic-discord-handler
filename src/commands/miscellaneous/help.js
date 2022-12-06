const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const getLocalCommands = require('../../utils/get-local-commands');

const choices = [];
const localCommands = getLocalCommands(['help']);
for (const command of localCommands) {
  choices.push({
    name: command.name,
    value: command.name,
  });
}

module.exports = {
  callback: (client, interaction) => {
    const targetCommand = interaction.options.get('command-name')?.value;
    let command = localCommands.find((cmd) => cmd.name === targetCommand);

    const embed = new EmbedBuilder().setColor(0x2f3137);

    // send specific command help if "command-name" option was provided.
    if (command) {
      embed.setTitle(`Command help - ${command.name}`).addFields({
        name: 'Description',
        value: command.description,
      });

      let usage = `/${command.name}`;

      if (command.options?.length) {
        embed.setDescription(
          '`<fields>` are required.\n`[fields]` are optional.'
        );

        for (const option of command.options) {
          if (option.required) {
            usage += ` <${option.name}>`;
          } else {
            usage += ` [${option.name}]`;
          }
        }
      }

      embed.addFields({ name: 'Usage', value: usage });
    }

    // send help menu with all available commands.
    else {
      embed
        .setTitle('Help menu - List of categories and commands')
        .setDescription(
          'Use `/help [command-name]` to get more information on a command.'
        );

      const categories = [...new Set(localCommands.map((cmd) => cmd.category))];

      for (const category of categories) {
        let listOfCommands = [];

        for (const command of localCommands) {
          if (command.category === category) {
            listOfCommands.push(command.name);
          }
        }

        embed.addFields({
          name: category.charAt(0).toUpperCase() + category.slice(1),
          value: `${listOfCommands.map((cmd) => ` ${cmd}`)}`,
        });
      }
    }

    interaction.reply({ embeds: [embed], ephemeral: true });
  },

  /* command information */
  description: 'Help menu with list of all commands and categories.',
  options: [
    {
      name: 'command-name',
      description: 'The command you want more information on.',
      type: ApplicationCommandOptionType.String,
      choices,
    },
  ],
};
