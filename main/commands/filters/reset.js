const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "reset",
  category: "filters",
  description: "Clears all the filters.",
  args: false,
  usage: "",
  djonly : true,

  execute: async (message, args, client, prefix) => {

    let ok = client.emoji.ok;
    let no = client.emoji.no;
   
  
     
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
          return await message.channel.send({embeds: [noperms]}),
          message.channel.send({embeds: [noperms]});
      }
          //
   player.reset();
                  const noperms = new MessageEmbed()
             .setColor(client.embedColor)
                  .setDescription(`${ok} All filters has been reseted.`)
                
     message.channel.send({embeds: [noperms]}).then(responce => {
       setTimeout(() => {
           try {
               responce.delete().catch(() => {
                   return
               })
           } catch(err) {
               return
           }
       }, 30000)
   });;
       
    
    


   }
}
       
