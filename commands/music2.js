const { Client, Intents } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core-discord');
const SpotifyWebApi = require('spotify-web-api-node');
const { SlashCommandBuilder } = require('discord.js');
const { clientId, token } = require('../config.json');

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: token,
});

async function playAudio(url, voiceChannel) {
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
  
    let stream;
  
    if (url.includes('spotify.com')) {
      const id = url.match(/track\/([a-zA-Z0-9]+)/)[1];
      const track = await spotifyApi.getTrack(id);
      const previewUrl = track.body.preview_url;
  
      if (!previewUrl) {
        return connection.destroy();
      }
  
      stream = previewUrl;
    } else {
      stream = await ytdl(url, { filter: 'audioonly' });
    }
  
    const resource = createAudioResource(stream);
    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);
  
    player.on('error', error => {
      console.error(error);
    });
  
    player.on('stateChange', (oldState, newState) => {
      if (newState.status === 'idle') {
        connection.destroy();
      }
    });
  }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music2')
		.setDescription('Test play song'),
	async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to use this command.');
        }
		const url = interaction.options.getString('url');
        
        await playAudio(url, voiceChannel);

    interaction.reply(`Now playing: ${url}`);
	},
};