module.exports = {
  description: 'Shows client + websocket ping 🏓',

  callback: (client, interaction) => {
    interaction.deferReply().then(() => {
      interaction.fetchReply().then((reply) => {
        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply({
          content: `:ping_pong: Pong! Client: \`${ping}ms\` Websocket: \`${client.ws.ping}ms\``,
        });
      });
    });
  },
};
