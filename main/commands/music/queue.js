const { MessageEmbed, CommandInteraction, Client, MessageButton } = require("discord.js")
const { intpaginationEmbed } = require('../../utils/pagination.js');
let chunk = require('chunk');

module.exports = {
  name: 'queue',
  category: 'music',
  aliases: ["q","list","ennipatalu","enniunnai","inkennirababu"],
  description: 'plays some high quality music for you',
  owner: false,
  wl : true,
  execute: async (message, args, client, prefix) => {
     
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    

    const { channel } = message.member.voice;
    if (!channel) {
                    const noperms = new MessageEmbed()
                  
         .setColor(client.embedColor)
           .setDescription(`${no} You must be connected to a voice channel to use this command.`)
        return await message.channel.send({embeds: [noperms]});
    }
    if(message.member.voice.selfDeaf) {	
      let thing = new MessageEmbed()
       .setColor(client.embedColor)
     .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
       return await message.channel.send({embeds: [thing]});
     }
    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);
    if(!player || !botchannel || !player.queue.current || !player.queue.length) {
                    const noperms = new MessageEmbed()
      
         .setColor(client.embedColor)
         .setDescription(`${no} There is nothing playing in this server or there is no songs in the queue.`)
        return await message.channel.send({embeds: [noperms]});
    }
    if(player && channel.id !== player.voiceChannel) {
                                const noperms = new MessageEmbed()
         .setColor(client.embedColor)
        .setDescription(`${no} You must be connected to ${botchannel}`)
        return await message.channel.send({embeds: [noperms]});
    }
   
      const queue = player.queue.map((track, i) => { 
        return `${++i}. ${track.title} - \`${!track.isStream ? `${new Date(track.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}\` `
 
 
})
      
      
      
      const chunked = chunk(queue, 10);
      const embeds = [];
      for (let i = 1; i <= chunked.length; ++i)
          embeds.push(new MessageEmbed().setColor(client.embedColor).setTitle(`${message.guild.name} Music Queue`).setDescription(`**Now playing**\n${player.queue.current.title} -   \`${!player.queue.current.isStream ? `${new Date(player.queue.current.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}\`\n\n**Upcoming tracks**\n ${chunked[i - 1].join('\n')}`).setFooter(`Page ${i + 1}/${i.length}`));
      const button1 = new MessageButton().setCustomId('first').setLabel('⏩').setStyle('SECONDARY');
      const button2 = new MessageButton().setCustomId('back').setLabel('➡️').setStyle('SECONDARY');
      const button3 = new MessageButton().setCustomId('next').setLabel('⬅️').setStyle('SECONDARY');
      const button4 = new MessageButton().setCustomId('last').setLabel('⏪').setStyle('SECONDARY');
      const buttonList = [button1, button2, button3, button4];
      intpaginationEmbed(message, embeds, buttonList, message.member.user, 30000);

    }
  }

