module.exports.help = {
    name: "map",
    aliases: ['location'],
    description: "shows the user's location on the map",
    usage: "<@user>",
    category: "game"
}

let Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let user = client.Util.getUser(message);
    let ch1 = client.bo.getLocation(user.id);
    if(!ch1) return client.Util.sendError("Can't find location of that ussr", message.channel);

}