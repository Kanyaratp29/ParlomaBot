const {Client, Collection, Events, GatewayIntentBits, ActivityType, Partials} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json')
const { DiscordTogether } = require('discord-together');

const client = new Client(
    {
        intents:[
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
        ],
		// partials:[
		// 	Partials.Message,
		// 	Partials.Reaction,
		// ]
    }
)

client.commands = new Collection();
client.discordTogether = new DiscordTogether(client);

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on('messageCreate', async (msg) => {
    // if(msg.author.id == '376044245536079894'){
    //     msg.reply('OK');
    // }
    if(msg.content == 'สวัสดี'){
        await msg.reply('ดีจ้า :wave:')
    }
    if(msg.content == 'รักน้องบูบู้'){
		await msg.react('❤️')
    }
	if (msg.content === 'ยูทูป') {
        if(msg.member.voice.channel) {
            client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'youtube').then(async invite => {
                return msg.channel.send(`${invite.code}`);
            });
        };
    };
	if(msg.content === 'test'){
		console.log(msg);
	}
    // console.log(msg);
})

client.on('messageReactionAdd', (reaction) => {
	console.log(reaction);
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// const quiz = require('./quiz.json');

// const item = quiz[Math.floor(Math.random() * quiz.length)];
// const filter = response => {
// 	return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
// };

// interaction.reply({ content: item.question, fetchReply: true })
// 	.then(() => {
// 		interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
// 			.then(collected => {
// 				interaction.followUp(`${collected.first().author} got the correct answer!`);
// 			})
// 			.catch(collected => {
// 				interaction.followUp('Looks like nobody got the answer this time.');
// 			});
// 	});

// client.run(os.getenv('TOKKEN'))
client.login(token)

client.on('ready', ()=>{
    console.log(`your bot is ready to pair as ${client.user.tag}!`);
    client.user.setActivity('your heart', { type: ActivityType.Listening });
})
