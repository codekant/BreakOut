let Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if(!client.config.owners.includes(message.author.id)) return;
  else {
    const evalargs = args;
    try {
      const code = evalargs.join(" ");
      let evaled = eval(code);
      const eargs = args.join(" ");

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      const embed = new Discord.RichEmbed()
        .setTitle("Output 📤")
        .setDescription(` \`\`\`${clean(evaled)}\`\`\` `, { code: "xl" })
        .addField("Input 📥", ` \`\`\`${eargs}\`\`\` `)
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed).catch(err => message.channel.send("Lol error"));
    } catch (err) {
      const eargs = args.join(" ");
      const errorembed = new Discord.RichEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle("Error 🗳️")
        .addField("Output 📤", ` \`\`\`xl\n${clean(err)}\n\`\`\``)
        .addField("Input 📥", ` \`\`\`${eargs}\`\`\` `);
      message.channel.send(errorembed).catch(err => message.channel.send("Lol error"));
    }
  }
};

module.exports.help = {
  name: "eval",
  aliases: ["ev"],
  description: "Eval javascript code provided",
  usage: "<code>",
  category: "dev"
};

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}
