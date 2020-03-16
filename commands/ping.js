const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    message.channel.send("Pinging...")
    .then(msg => {
        msg.edit(`${msg.createdTimestamp - message.createdTimestamp}ms`);
    });
}

module.exports.help = {
    name: "ping",
    aliases: ['pong'],
    description: "Check if bot is alive",
    category: "misc"
};