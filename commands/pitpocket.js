const Discord = require("discord.js");

module.exports.help = {
  name: "pitpocket",
  description: "PitPocket a police",
  aliases: ["pocket"],
  usage: "<@user>",
  category: "crime"
};

module.exports.run = async (client, message, args) => {
  let user = client.Util.findUser(message);
  if (!user || user.id == message.author.id || user.bot)
    return client.Util.sendError(
      "Can't find any user mentioned.",
      message.channel
    );

  let ch1 = client.bo.getRole(user.id)
  if (ch1 !== "police")
    return client.Util.sendError("That user is not a police.", message.channel);
  
  let pocket = client.bo.pitpocket(message.author.id, user.id);
  
  if(pocket == "pistol") {
    client.bo.addGunInventory(message.author.id, client.guns.get('pistol'));
    message.channel.send({
      embed: new Discord.RichEmbed()
      .setDescription("You pitpocketed that user and took their pistol")
      .setTimestamp()
      .setColor(client.color)
    })
  } else
  if(pocket == "shotgun") {
    client.bo.addGunInventory(message.author.id, client.guns.get("shotgun"));
    message.channel.send({
      embed: new Discord.RichEmbed()
      .setDescription("You pitpocketed that user and took their shotgun")
      .setTimestamp()
      .setColor(client.color)
    })
  } else 
  if(pocket == "doughnut") {
    client.bo.addRestInventory(message.author.id, client.other.get("doughnut"));
    message.channel.send({
      embed: new Discord.RichEmbed()
      .setDescription("You pitpocketed that user and took their doughnut")
      .setTimestamp()
      .setColor(client.color)
    });
  } else 
  if(pocket == "keycard") {
    client.bo.addRestInventory(message.author.id, client.other.get("keycard"));
    message.channel.send({
      embed: new Discord.RichEmbed()
      .setDescription("You pitpocketed that user and took their keycard, now you can rob banks.")
      .setTimestamp()
      .setColor(client.color)
    })
  } else 
  if(pocket == "torch") {
      client.bo.addRestInventory(message.author.id, client.other.get("torch"));
      message.channel.send({
        embed: new Discord.RichEmbed()
        .setDescription("You pitpocketed that user and took their torch")
        .setTimestamp()
        .setColor(client.color)
      })
  }

};
