module.exports.help = {
  name: "goto",
  aliases: ["movelocation"],
  description: "Move to another place!",
  usage: "<location>",
  category: "game"
};

const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
  let location = args[0];
  if(!location) return client.Util.sendError("Please provide a location", message.channel);
  if(!client.locations.has(location)) return client.Util.sendError("That's not a valid location lol.", message.channel);
  location = client.locations.get(location);
  
  let vehicle = client.bo.getVehicle(message.author.id);
  if(!vehicle) {
    vehicle = {
      name: "Foot",
      speed: 50,
      id: 'feet'
    };
  }
  
  let secs = Math.floor(location.distance / vehicle.speed);
  message.channel.send({
    embed: new Discord.RichEmbed()
    .setDescription(`Your travelling to the **${location.name}** by your **${vehicle.name}**, this will approximately take **${secs}s** to go there.`)
    .setFooter("You will be pinged when you reach there")
    .setColor(client.color)
    .setTitle("Going too")
  })
  .then(msg => {
    setTimeout(() => {
  client.bo.setLocation(message.author.id, location.id);
      message.channel.send(message.author.toString(), {
        embed: new Discord.RichEmbed()
        .setDescription(`You are now at **${location.name}**, took you **${secs}s** to reach here with your ${vehicle.name}.`)
        .setTimestamp()
        .setColor(client.color)
      });
    }, secs * 1000)
  })
  
}