const { MessageEmbed } = require('discord.js');
const axios = require('axios');
axios.defaults.baseURL = 'https://api.battlemetrics.com';

class Api{
    static async serverInfo(id){
        let info = await axios.get(`/servers/${id}`);
        return await info.data.data;
    }
}

async function showInfo(message, id){
    const infos = await Api.serverInfo(id);
    console.log(infos);

    const embed = new MessageEmbed();
        embed
        .setImage("https://static.wixstatic.com/media/a8a9d1_28bea2a37f7244c281b87ca5f1617271~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01/BLACKMAMBA.webp")
        .setTitle("BlackMambaServer:")
        .setColor('#fcfcfc')
        .addField("Status:", infos.attributes.status)
        .addField("Players:", `${infos.attributes.players}/${infos.attributes.maxPlayers}`)
        .addField("Site:", "www.blackmambarust.com");

        message.channel.send(embed);
}

module.exports = showInfo;
    
    
