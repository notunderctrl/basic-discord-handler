const commandHandler = require('../../handlers/commandHandler');

module.exports = async (client, interaction) => {
  if (interaction.isChatInputCommand()) {
    await commandHandler(client, interaction);
  }
};
