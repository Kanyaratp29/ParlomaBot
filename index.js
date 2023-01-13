const {Client, Events, GatewayIntentBits, ActivityType} = require('discord.js');
const { token } = require('./config.json')

const client = new Client(
    {
        intents:[
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ]
    }
)

const randomnum = () => {
    return Math.floor(Math.random() * 10);
}

client.on('messageCreate', msg=>{
    // if(msg.author.id == '376044245536079894'){
    //     msg.reply('OK');
    // }
    if(msg.content == 'สวัสดี'){
        msg.reply('ดีจ้า :wave:')
    }
    // console.log(msg);
})

// client.run(os.getenv('TOKKEN'))
client.login(token)

client.on('ready', ()=>{
    console.log(`your bot is ready to pair as ${client.user.tag}!`);
    client.user.setActivity('your heart', { type: ActivityType.Listening });
})
