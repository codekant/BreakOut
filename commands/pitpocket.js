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

  let ch1 = client.db.get(user.id, "role");
  if (ch1 !== "police")
    return client.Util.sendError("That user is not a police.", message.channel);
  
  let pocket = client.bo.pitpocket(message.author.id, user.id);
  
  
  
};
