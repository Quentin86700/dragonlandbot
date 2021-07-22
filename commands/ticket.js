const config = require('../config.json'),
    fs = require('fs'),
    Discord = require('discord.js')
 
module.exports = {
    run: async (message, args, client) => {
        if (Object.values(client.db.tickets).some(ticket => ticket.author === message.author.id)) return message.channel.send('Vous avez déjà un ticket d\'ouvert.').then(sent => sent.delete({timeout: 5e3})) 
        const channel = await message.guild.channels.create(`ticket ${message.author.username}`, {
            type: 'text',
            parent: config.ticket.category,
            permissionOverwrites: [{
                id: message.guild.id,
                deny: 'VIEW_CHANNEL'
            }, {
                id: message.author.id,
                allow: 'VIEW_CHANNEL'
            }, ...config.ticket.roles.map(id => ({
                id,
                allow: 'VIEW_CHANNEL'
            }))]
        })
        client.db.tickets[channel.id] = {
            author: message.author.id
        }
        message.delete()
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        channel.send(new Discord.MessageEmbed()
            .setTitle("🎫 Bienvenue dans votre ticket 🎫")
            .setDescription(`Bienvenue dans votre ticket \nPour faciliter le travaille des staffs veuillez expliquer le(s) problème(s) clairement et brièvement. \n\nUne fois le problème résolu vous pouvez fermer le ticket en faisant !ticket close`))
    },
    name: 'ticket',
    guildOnly: true
}