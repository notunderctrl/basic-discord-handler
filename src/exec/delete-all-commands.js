require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { clientId, testServer } = require('../../config.json');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// for guild based commands
rest
  .put(Routes.applicationGuildCommands(clientId, testServer), { body: [] })
  .then(() => console.log('Successfully deleted all guild commands.'))
  .catch(console.error);

// for global commands
rest
  .put(Routes.applicationCommands(clientId), { body: [] })
  .then(() => console.log('Successfully deleted all application commands.'))
  .catch(console.error);
