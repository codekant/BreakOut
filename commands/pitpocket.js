const Discord = require('discord.js');

module.exports.help = {
    name: "pitpocket",
    description: "PitPocket a police",
    aliases: ['pocket'],
    usage: "<@user>",
    category: "game"
};

module.exports.run = async(client, message, args) => {
    let user = client.Util.findUser(message);
    if(!user) return client.Util.sendError("Can't find any user mentioned.", message.channel);
    
};