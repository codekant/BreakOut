const Discord = require("discord.js");

module.exports = async (client, message) => {
  client.msgCount += 1;
  if (message.author.bot || !message.guild) return;
  client.db.ensure(message.author.id, client.bo.getItems());
  let prefix = client.config.bot.prefix;
  if (!message.content.startsWith(prefix)) return;
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  let command = args.shift().toLowerCase();
  if (client.commands.has(command)) {
    if (client.commands.get(command).help.category == "crime" && client.db.get(message.author.id, "role") !== null) {
      let ch1 = client.db.get(message.author.id, "role");
      if (ch1 !== "criminal") return;
    } else if (client.commands.get(command).help.category == "police" && client.db.get(message.author.id, "role") !== null) {
      let ch1 = client.db.get(message.author.id, "role");
      if (ch1 !== "police") return;
    }
    client.commands.get(command).run(client, message, args);
  } else if (client.aliases.has(command)) {
    if (client.aliases.get(command).help.category == "crime" && client.db.get(message.author.id, "role") !== null) {
      let ch1 = client.db.get(message.author.id, "role");
      if (ch1 !== "criminal") return;
    } else if (client.aliases.get(command).help.category == "police") {
      let ch1 = client.db.get(message.author.id, "role" && client.db.get(message.author.id, "role") !== null);
      if (ch1 !== "police") return;
    }
    client.aliases.get(command).run(client, message, args);
  } else return;
};
