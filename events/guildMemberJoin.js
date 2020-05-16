/* jshint esversion: 8 */

const config = require("../config.json");
const randomMessages = require("../assets/joinMessages.json").random;
const functions = require("../modules/functions");
const Discord = require("discord.js");

module.exports = async function(member) {

    // Check if channel is legit functions
    var channelID;
    let channel = checkOneChannel();
    if(channel === true) {
        channelID = functions.channels.cache_findByID(member, config.channels.onlyOneChannel.channelID);
    } else {
        channelID = functions.channels.cache_findByID(member, config.channels.joinChannelID);
    }

    // Generate randomMessage functions
    var msg = genMessage();
    if(msg === false) {
        msg = "Hey!";
    }

    // Auto-Role add upon user join
    if(config.roles.autoAdd === true) {
        var role = functions.roles.cache_findByID(member, config.roles.roleID);
        try {
            member.roles.add(role);
        }
        catch(error) {
            console.error(error);
        }
    }


    // Sends the welcome message in the channel
    if(config.messages.sendInEmbeds === true) {
        let embed = new Discord.MessageEmbed()
        .setAuthor(member.user.username)
        .setColor("RANDOM")
        .setDescription(msg)
        .setFooter("GuildLog -> v1.0, Developed by Liam @ liampbennett.me");
        channelID.send(embed);
    } else {
        channelID.send(`${member} ${msg}`);
    }


};

/*      The functions. Don't mess with me :)      */

async function checkOneChannel() {
    if(config.channels.onlyOneChannel.enabled === true) {
        return true;
    } else {
        return false;
    }
}

async function genMessage() {
    var option;
    if(config.randomiseMessages === true) {
        let msg = await randomMessages;
        let msgGen = Math.floor(Math.random() * msg.length) - 1;
        let m = msg[msgGen];

        while(m == undefined) {
            m = "Hola amigo!";
        }

        option = m;
        
        return option;
    } else {
        option = false;
        return option;
    }
}