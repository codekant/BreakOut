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

require('./express/app');
require("dotenv").config();
Discord.RichEmbed = Discord.MessageEmbed;
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.commands = new Map();
client.aliases = new Map();
client.msgCount = 0;
client.config = require("./settings/config");
client.Util = new Util(client);

require("./handlers/commands.js")(fs, client);
require("./handlers/events.js")(fs, client);
require("./Enmap/user")(Enmap, client);