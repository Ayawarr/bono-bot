const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const client = new Discord.Client();

// Joue un son
async function play(voiceChannel, videoName) {
  const connection = await connect(voiceChannel);
  if (videoName === 'mario' || videoName === 'pron') {
    const dispatcher = connection.play(videoName + '.mp3', { volume: 0.5 });
  } else {
    const dispatcher = connection.play(videoName + '.mp3');
  }
}

// Se connecte à un channel vocal
async function connect(channelName) {
  return channelName.join();
}

client.on('message', message => {
	if (
    message.content === '!borgir' ||
    message.content === '!fatigue' ||
    message.content === '!ntm' ||
    message.content === '!woo' ||
    message.content === '!peter' ||
    message.content === '!moi' ||
    message.content === '!sensible' ||
    message.content === '!mario' ||
    message.content === '!pron'
  ) {
    if (message.member.voice.channel) {
      play(message.member.voice.channel, message.content.substr(1));
      message.delete();
  	}
	}

  // Affichage de la liste des commandes
  if (message.content === '!bono') {
    const commandsMessage = new Discord.MessageEmbed()
    .setTitle('Commandes 🐒')
    .setColor('#744400')
    .setDescription('Liste des commandes du bono-bot.')
    .setFooter('"Ouhaha" - bono-bot')
    .addField('!borgir', 'Borgir ! 🍔')
    .addField('!fatigue', 'C\'est pas qu\'j\'en ai marre mais...')
    .addField('!ntm', 'Euh...')
    .addField('!woo', 'WOO WOO !')
    .addField('!peter', 'Ca va péter ! PETER ! 💥')
    .addField('!moi', 'C\'est qui l\'patron ?')
    .addField('!sensible', 'Tu touches à ma sensibilité.')
    .addField('!mario', 'Mamma mia !')
    .addField('!pron', 'Seulement pour les adultes. 🔞');
    message.channel.send(commandsMessage);
    message.delete();
  }
});

client.login(process.env.TOKEN);
