if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.')


require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const serverInfo = require("./src/serverInfo"); 
const PREFIX = "!";

client.on("ready", async () => {
    console.log("Estou Online");
    // change activity status
    client.user.setPresence({
        activity: { name: "BlackMambaRust", type: "WATCHING" },
        status: 'READY' 
    });
});

client.on("message", (message) => {
    if(message.author.bot || message.channel.type !== "text") return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        
        if(CMD_NAME.toLocaleLowerCase() === "server" && args.length === 0) 
            serverInfo(message, 4287920);
    }
});


client.login(process.env.DISCORDJS_BOT_TOKEN);
