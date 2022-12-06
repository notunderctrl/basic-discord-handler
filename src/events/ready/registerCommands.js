const { testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/get-local-commands');
const getApplicationCommands = require('../../utils/get-application-commands');
const areCommandsDifferent = require('../../utils/are-commands-different');

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    global.botCommands = localCommands;
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted === true) {
          await applicationCommands.delete(existingCommand.id);

          console.log(`🗑 Deleted command "${name}".`);
          break;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`🔁 Edited command "${name}".`);
        }
      } else {
        if (localCommand.deleted === true) {
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`
          );
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`👍 Registered command "${name}."`);
      }
    }
  } catch (error) {
    console.log('⛔️ There was an error while registering commands: ' + error);
  }
};
