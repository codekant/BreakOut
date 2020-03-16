const Discord = require("discord.js");
require('dotenv').config();

const shards = new Discord.ShardingManager("./index.js", {
    totalShards: "auto",
    autoSpawn: true,
    token: process.env.TOKEN
});

shards.spawn();

shards.on("launch", (shard) => {
    console.log(`Lanched ${shard.manager.totalShards} Shards.`);
});
