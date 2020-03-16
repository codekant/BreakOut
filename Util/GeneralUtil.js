const Discord = require('discord.js');

class Util {
    constructor(client) {
        this.client = client;
    }

    findUser(message) {
        let args = message.content.slice(this.client.config.bot.prefix.length).trim().split(" ").shift();
        let user = (message.mentions.users.first() || 
        this.client.users.resolve(args[0]) ||
        message.member.guild.users.cache.find(user => user.username.toLowerCase().includes(args.join(" "))));
        return user;
    }

    sendError(content, channel) {
        try {
            return channel.send(`${this.client.emotes.error} ${content}`);
        } catch (e) {
            throw e;
        }
    }

    ensureDB(userId) {
        let pack = this.client.db.get(userId);
        if(!pack) {
            this.client.db.set(userId, {
                inventory: {},
                vehicles: {},
                guns: {},
                hp: 100,
                energy: 200,
                money: 0,
                role: null
            })
        }
    }
}

module.exports = Util;