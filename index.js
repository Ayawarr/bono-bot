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

// Ecoute les messages postés
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
    message.content === '!pron' ||
    message.content === '!salut' ||
    message.content === '!oof'
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
    .setFooter('Dépôt git : https://github.com/arthur-michel/bono-bot')
    .addField('!borgir', 'Borgir ! 🍔')
    .addField('!fatigue', 'C\'est pas qu\'j\'en ai marre mais...')
    .addField('!ntm', 'Euh...')
    .addField('!woo', 'WOO WOO !')
    .addField('!peter', 'Ca va péter ! PETER ! 💥')
    .addField('!moi', 'C\'est qui l\'patron ?')
    .addField('!sensible', 'Tu touches à ma sensibilité.')
    .addField('!mario', 'Mamma mia !')
    .addField('!pron', 'Seulement pour les adultes. 🔞')
    .addField('!salut', 'Johnny...')
    .addField('!oof', 'Un son de mort rigolo pour petits et grands.');
    message.channel.send(commandsMessage);
    message.delete();
  }
});

// Ecoute les déconnexions
client.on('voiceStateUpdate', (oldState, newState) => {
  const newUserChannelID = newState.channelID;
  const oldUserChannelID = oldState.channelID;
  if (newUserChannelID === null && oldState.member.user.id !== '859066704746905610') {
    const oldUserChannel = client.channels.fetch(oldUserChannelID);
    oldUserChannel.then((value) => {
      play(value, 'salut');
    });
    console.log('Salut mon pote ' + oldState.member.nickname + '.');
  }
});

client.login(process.env.TOKEN);
