const Discord = require('discord.js');

module.exports.help = {
  name: "start",
  aliases: ['new'],
  description: "Start your BreakOut Journey here!",
  category: "game"
};

const yeets = ['police', 
               'criminal'];

module.exports.run = async(client, message, args) => {
  let db = client.db.get(message.author.id);
  if(db.role !== null) return client.Util.sendError("Seems like you already have got a role!",
                                              message.channel);
  message.channel.send(`${client.emotes.success} What would you like to be? a Criminal or Police?`, {
    embed: new Discord.RichEmbed()
    .setDescription(`Now you're given 60 seconds to decide what you wanna become! THINK HARD... `)
    .setTimestamp()
    .setColor(client.color)
    .addField("Police", `Police are the cool guys who are actually not cool to the criminals, they catch them and arrest them. Kill them torture them. Criminals can also kill these police but only where they have a gun where as police can just run behind them and arrest them! They can collect loot from an airdrop briefcase too and earn 400$-500$ for arresting a criminal.`)
    .addField("Criminal", `The name self-describes it, yet these are the real COOL dudes. They can rob almost every building in this city, and can get high loot. Yet dissapointed when they get caught, they will have to regain all their bounty.. and earn again... But even their life is not easy, they have to run as fast as possible, and can upto 10k$ on a single heist.`)
  })
  .then(msg => {
    message.channel.awaitMessages(m => m.author.id == message.author.id && yeets.includes(m.content.toLowerCase()), {
      time: 60000,
      max: 1,
      errors: ["time"]
    })
    .then(collection => {
      let me2 = collection.first();
      if(me2.content.toLowerCase() == "police") {
        msg.edit({
          embed: new Discord.RichEmbed()
          .setDescription(`You have chosen to be a police officer, take care. Be smart, arrest the criminals without getting killed. Good Luck.`)
          .setColor("#42bcf5")
        });
        client.db.set(message.author.id, client.bo.getItems(true));
      } else 
        if(me2.content.toLowerCase() == "criminal") {
          msg.edit({
            embed: new Discord.RichEmbed()
            .setDescription(`You have chosen to be a criminal, whoa stay safe. Stay smart. Murder the police, steal banks, jewel stores etc. earn money buy items, RUN and Don't get caught!`)
            .setColor('#f5426c')
          });
        client.db.set(message.author.id, client.bo.getItems(false));
        };
    })
    .catch(err => {
      msg.edit({
        embed: {
          description: "Time's up! ;)"
        }
      })
    })
  })
}