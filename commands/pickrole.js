module.exports.help = {
  name: "pickrole",
  aliases: ['role'],
  description: "Pick a role for yourself",
  usage: "<police | criminal>",
  category: "game"
};

let Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
  let role = args[0];
  if(!role) return client.Util.sendError("You have to choose police or criminal", message.channel);
  if(role == "police") {
    let rl = client.bo.getRole(message.author.id);
      if(rl == 'police') return client.Util.sendError("You are already a police");
      client.bo.setLocation(message.author.id, "prison");
      client.bo.setRole(message.author.id, "police");
      client.bo.deleteInventory(message.author.id);
      client.bo.addGunInventory(message.author.id, client.guns.get('pistol'));
      client.bo.addRestInventory(message.author.id, client.other.get('torch'));
      message.channel.send({
        embed: new Discord.RichEmbed()
        .setTitle("Police")
        .setDescription(`You're now a police, go arrest the criminals. Make sure they don't pitpocket you!`)
        .setTimestamp()
        .setColor("#42bcf5")
      });
  } else
    if(role == "criminal") {
      let rl = client.bo.getRole(message.author.id);
      if(rl == 'criminal') return client.Util.sendError("You are already a criminal");
      client.bo.setLocation(message.author.id, "prison");
      client.bo.setRole(message.author.id, "criminal");
      client.bo.deleteInventory(message.author.id);
      message.channel.send({
        embed: new Discord.RichEmbed()
        .setTitle("Criminal")
        .setDescription(`You're now a criminal, murder the police. dont get killed.. Go rob and do crime all over the city`)
        .setTimestamp()
        .setColor("#f5426c")
      });
    } else {
      return client.Util.sendError("You have to choose police or criminal", message.channel)
    }
};