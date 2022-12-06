const path = require('path');
const getAllFiles = require('../utils/get-all-files');

module.exports = async ({ client }) => {
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);

    for (const eventFile of eventFiles) {
      const eventFunction = require(eventFile);
      const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

      client.on(eventName, async (args) => {
        await eventFunction(client, args);
      });
    }
  }
};
