const { SlashCommandBuilder } = require('discord.js');
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");
const { AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require("ytdl-core");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Play a Youtube video in your voice channel.")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("The URL of the YouTube video")
        .setRequired(true)
    ),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply(
        "You need to be in a voice channel to use this command."
      );
    }
    
    //check error
    try {
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: interaction.guildId,
          adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        
        // Rest of the code for playing audio goes here
      } catch (error) {
        console.error(error);
        return interaction.reply('There was an error joining the voice channel.');
      }

      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

    const url = interaction.options.getString("url");
    console.log('Playing audio file:', url);
    let stream, resource;

    const youtubePattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+$/gm;
    const spotifyPattern = /^(http(s)?:\/\/)?((w){3}.)?open.spotify.com\/(track|playlist)\/.+$/gm;

    if (youtubePattern.test(url)) {
        stream = ytdl(url, { filter: "audioonly" });
        resource = createAudioResource(stream);
      }else if(spotifyPattern.test(url)){
        resource = createAudioResource(url);
      } 
      else {
        return interaction.reply("That's not the link from youtube or spotify.");
      }

    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);

    interaction.reply("Now playing: " + url);

    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
      });

    player.on("error", (error) => {
      console.error(error);
      interaction.followUp("There was an error playing the audio.");
      connection.destroy();
    });

    player.on("stateChange", (oldState, newState) => {
      if (newState.status === "idle") {
        connection.destroy();
      }
    });
  },
};
