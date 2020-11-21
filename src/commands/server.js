const { MessageEmbed } = require('discord.js');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path')

const browserVerify = {
    details: undefined,
    itsOpen: false
};

const server = async (message, verify = false) => {
    if(!browserVerify.itsOpen){
        const browser = await puppeteer.launch( { headless: true } );
        browserVerify.details = browser;
        browserVerify.itsOpen = true;
    }
    const page = await browserVerify.details.newPage();
    await page.goto('https://www.battlemetrics.com/servers/rust/4287920?timePlayed=3M');

    
    let serverInfo = await page.evaluate(() => {
        players = document.querySelector(".css-1y3vvw9 tbody").children[2].innerText;
        return document.querySelector(".css-1i1egz4").innerHTML;
    });

    serverInfo = serverInfo.substring(0, serverInfo.indexOf("Distance"))
    .replace(/<dt>/g, ",")
    .replace(/<\/dt>/g, ":")
    .replace(/<dd>/g, "")
    .replace(/<\/dd>/g, "")
    .replace(/<span/g, "")
    .replace(/<\/span/g, "")
    .replace(/>/g, "")
    .split(",");
    serverInfo.splice(0, 1);
    serverInfo.splice(4, 1);
    serverInfo[1] = serverInfo[1].replace("Player count:", "");
    serverInfo[3] = serverInfo[3].replace("Status:", "");
    console.log(serverInfo);

    if(verify){
        const embed = new MessageEmbed();
        embed
        .setImage("https://static.wixstatic.com/media/a8a9d1_28bea2a37f7244c281b87ca5f1617271~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01/BLACKMAMBA.webp")
        .setTitle("BlackMambaServer:")
        .setColor('#fcfcfc')
        .addField("Status:", serverInfo[3])
        .addField("Players:", serverInfo[1])
        .addField("Site:", "www.blackmambarust.com");

        message.channel.send(embed);
    }

    await page.close();
}

module.exports = server;