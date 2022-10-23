const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const {
    format,
    arrayMove
  } = require(`../../utils/functions`);
module.exports = {
  name: 'move',
  category: 'music',
  aliases: ["side"],
  description: 'Change the position of a track in the queue.',
  owner: false,
  execute: async (message, args, client, prefix) => {
  
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
     const player = client.manager.get(message.guildId);

          if (!args[0]) {
            const emr = new MessageEmbed()
    
            .setDescription(` ${no} Wrong Command Usage!\n\nUsage: \`move <from> <to>\`\nExample: \`move ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 } 1\``)
            return message.channel.send({embeds: [emr]})
          }
          //If no TO args return error
          if (!args[1]) {
            const ror = new MessageEmbed()
        
            .setDescription(`${no} Wrong Command Usage!\n\nUsage: \`move <from> <to>\`\nExample: \`move ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 } 1\``)
            return message.channel.send({embeds: [ror]})
          }
          if (isNaN(args[0]) || args[0] <= 1 || args[0] > player.queue.length) {
            const eoer = new MessageEmbed()
          
            .setDescription(` ${no} Your Input must be a Number greater then \`1\` and smaller then \`${player.queue.length}\``)
            return message.channel.send({embeds: [eoer]})
          }
          //get the new Song
          let song = player.queue[player.queue.length - 1];
          let QueueArray = arrayMove(player.queue, player.queue.length - 1, 0);
          player.queue.clear();
          //now add every old song again
          for (const track of QueueArray)
            player.queue.add(track);
          const ifkf = new MessageEmbed()
         .setColor(client.embedColor)
          .setDescription(` ${ok} Moved the Song in the Queue from Position \`${args[0]}\` to Position: \`${args[1]}\`\n\n[${song.title}]https://discord.gg/pXnYt3tYzp) - \`${format(song.duration)}\` `)
          return message.channel.send({embeds: [ifkf]});
        }
    }