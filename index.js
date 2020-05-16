/* jshint esversion: 8 */

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const memberJoin = require("./events/guildMemberJoin");
const memberLeave = require("./events/guildMemberLeave");
const onReady = require("./events/ready");

client.on("ready", onReady);
client.on("guildMemberAdd", memberJoin);
client.on("guildMemberRemove", memberLeave);


client.login(config.token);
