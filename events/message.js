const Discord = require("discord.js");

module.exports = async(client, message) => {
    client.msgCount += 1;
    if(message.author.bot || !message.guild) return;
    let prefix = client.config.bot.prefix;
    if(!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(" ");
    let command = args.shift().toLowerCase();
    if(client.commands.has(command)) {
        client.commands.get(command).run(client, message, args);
    } else
    if(client.aliases.has(command)) {
        client.aliases.get(command).run(client, message, args);
    } else return;
}