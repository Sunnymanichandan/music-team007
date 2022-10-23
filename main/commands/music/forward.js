const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const ms = require('ms');

module.exports = {
  name: 'forward',
  category: 'music',
  aliases: ["frw","forw"],
  description: 'forwars the current song.',
  djonly : true,
  execute: async (message, args, client, prefix) => {
     
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
    const time = args.join(" ")
    //
   
    //
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
       if(!player || !botchannel || !player.queue.current) {
                       const noperms = new MessageEmbed()
 
            .setColor(client.embedColor)
            .setDescription(`${no} There is nothing playing in this server.`)
           return await message.channel.send({embeds: [noperms]});
       }
       if(player && channel.id !== player.voiceChannel) {
                                   const noperms = new MessageEmbed()
              .setColor(client.embedColor)
           .setDescription(`${no} You must be connected to the same voice channel as me.`)
           return await message.channel.send({embeds: [noperms]});
       }
         
       
     
     if (!time[0]) {
        const ppp = new MessageEmbed()
        .setDescription(`${no} Please specify a vaild time.`)
        return message.channel.send({embeds: [ppp]});
      }
      const etime = require('ms')(time)
     let seektime = Number(player.position) + Number(etime) ;
     if (Number(seektime) >= player.queue.current.duration) seektime = player.queue.current.duration - 1000;
     player.seek(Number(seektime))
     let thing = new MessageEmbed()
       .setColor(client.embedColor)
       .setDescription(`${ok} Forwarded to \`${convertTime(player.position)}\``)
     return await message.channel.send({ embeds: [thing] });
      
        }
}