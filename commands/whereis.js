module.exports.help = {
  name: "whereis",
  aliases: ["location"],
  description: "shows the user's location on the map",
  usage: "<@user>",
  category: "game"
};

let Discord = require("discord.js");
let Canvas = require("canvas");

module.exports.run = async (client, message, args) => {
  let user = client.Util.findUser(message) || message.author;
  let ch1 = client.bo.getLocation(user.id);
  if (!ch1 || ch1 == null)
    return client.Util.sendError(
      "Can't find location of that ussr",
      message.channel
    );
  if(user.id !== message.author.id) {
    let ch2 = client.bo.getRole(user.id);
    let ch3 = client.bo.getRole(message.author.id);
    if(ch2 !== ch3) return client.Util.sendError("You can't see location of a user on opponent team!", message.channel);
  }
  let canvas = Canvas.createCanvas(1200, 900);
  let ctx = canvas.getContext("2d");
  let background = await Canvas.loadImage("./cdn/MapNoText.jpg");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  const avatar = await Canvas.loadImage(
    user.displayAvatarURL({
      dynamic: true,
      size: 64,
      format: "jpg"
    })
  );
      
  ctx.beginPath(); 
  ctx.arc(ch1.cd.x, ch1.cd.y, 32, 0, 2 * Math.PI);
  ctx.clip();
  ctx.fillStyle= '#000000';
  ctx.fill();
  ctx.drawImage(avatar, ch1.cd.x - 32, ch1.cd.y - 32, 64, 64);
  ctx.closePath(); //wow smaty
  const caption = `This user, **${user.tag}** is at **${ch1.name}**, \nDistance is **${ch1.distance}m (${ch1.distance / 1000}km)** and Coordinates are **${ch1.cd.x}x : ${ch1.cd.y}y**. \n\n**What's this place?**\n${ch1.description}`;
  message.channel.send(caption, new Discord.MessageAttachment(canvas.toBuffer(), "location.jpg"));
};
