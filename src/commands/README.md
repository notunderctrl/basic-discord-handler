### Command file structure

```js
{
  description: string, // required for slash commands registration
  devOnly: boolean, // devs in config.json must exist for this to work
  testOnly: boolean, // testServer in config.json must exist for this to work

  // more on options structure: https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
  options: object,

  callback: function (client, interaction),
}
```
