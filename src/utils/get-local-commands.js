const path = require('path');
const getAllFiles = require('./get-all-files');

module.exports = (exceptions) => {
  let localCommands = [];

  const commandCategories = getAllFiles(
    path.join(__dirname, '..', 'commands'),
    true
  );

  for (const commandCategory of commandCategories) {
    const categoryName = commandCategory
      .replace(/\\/g, '/')
      .split('/')
      .pop()
      .toLowerCase();

    const commandFiles = getAllFiles(path.join(commandCategory));

    for (const commandFile of commandFiles) {
      const commandName = commandFile
        .replace(/\\/g, '/')
        .split('/')
        .pop()
        .split('.')[0]
        .toLowerCase();

      if (exceptions?.includes(commandName)) {
        continue;
      }

      const commandObject = require(commandFile);

      localCommands.push({
        name: commandName,
        category: categoryName,
        ...commandObject,
      });
    }
  }

  return localCommands;
};
