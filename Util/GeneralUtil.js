const Discord = require('discord.js');

class Util {
    constructor(client) {
        this.client = client;
    }

    findUser(message) {
        let args = message.content.slice(this.client.config.bot.prefix.length).trim().split(" ").slice(1);
        let user = (message.mentions.users.first() || 
        this.client.users.resolve(args[0]) ||
        this.client.users.cache.find(user => user.username.toLowerCase().includes(args.join(" ") || "x192x982x981289") && !user.bot));
        return user;
    }

    sendError(content, channel) {
        try {
            return channel.send(`${this.client.emotes.error} ${content}`);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = Util;