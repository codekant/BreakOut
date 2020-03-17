const Discord = require('discord.js');
const ejs = require('ejs');
const moment = require('moment');
const fs = require('fs');
const express = require('express');
const Enmap = require('enmap');
const session = require('express-session');
const bodyParser = require('body-parser');
const Data = require("form-data");
const app = express();
const Util = require('./Util/GeneralUtil');
const Eco = require("./Util/EcoUtil");

require("dotenv").config();
Discord.RichEmbed = Discord.MessageEmbed;
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.commands = new Map();
client.aliases = new Map();
client.msgCount = 0;
client.config = require("./settings/config");
client.Util = new Util(client);
client.bo = new Eco(client);
client.emotes = require("./Emojis/emojis.json");

require("./handlers/commands.js")(fs, client);
require("./handlers/events.js")(fs, client);
require("./Enmap/user")(Enmap, client);
require("./Enmap/ItemSet")(Enmap, client);

const http = require("http");
const server = http.createServer(app);

server.listen(3000, function() {
    console.log("Listening on PORT 3000");
});

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(session({
    secret: 'EshiNguyen',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: new Date(25340230000000)
      }
}));
app.use(express.static("styles"))
app.use("/", require("./routes/index"));

