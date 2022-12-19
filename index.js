require("dotenv").config()
const chokidar = require("chokidar")
const Discord = require("discord.js");

// Watch the changes on the repo uploads
const watcher = chokidar.watch("./uploads");

const client = new Discord.Client({ intents: 512 });
let channel;

client.once("ready", async () => {
    // Get the channel
    channel = await client.channels.fetch(process.env.CHANNEL);
    
    console.clear();
    console.log("Je suis lancé !")
    
    //When we create a files, send it into the good Discord channel
    watcher.on("add", (path) => {
        channel.send({
            files: [path], 
            content: "New screenshot !"
        })
    })
});

client.login(process.env.TOKEN)