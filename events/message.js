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
    let ch = client.bo.getRole(message.author.id);
    let cmd = client.commands.get(command);
    if(cmd.help.category === "crime" && ch !== "criminal") return;
    if(cmd.help.category === "police" && ch !== "police") return;
    let lol = ['police', 'crime', 'game'];
    if(lol.includes(cmd.help.category) && client.bo.getRole(message.author.id) == null && cmd.help.name !== "start") return client.Util.sendError("You can't use these commands unless you start your journey on BreakOut! try out `bo start`", message.channel);
    cmd.run(client, message, args).catch(e => client.Util.sendError("Sorry you can't do that rn.", message.channel));
  } else if (client.aliases.has(command)) {
    let cmd = client.aliases.get(command);
    let ch = client.bo.getRole(message.author.id);
    if(cmd.help.category === "crime" && ch !== "criminal") return;
    if(cmd.help.category === "police" && ch !== "police") return;
    let lol = ['police', 'crime', 'game'];
    if(lol.includes(cmd.help.category) && client.bo.getRole(message.author.id) == null && cmd.help.name !== "start") return client.Util.sendError("You can't use these commands unless you start your journey on BreakOut! try out `bo start`", message.channel);
      cmd.run(client, message, args)//.catch(e => client.Util.sendError("Sorry you can't do that rn.", message.channel));
  } else return;
};
