const Discord = require('discord.js'),
    reactions = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']
 
module.exports = {
    run: async (message, args) => {
       const [question] = args.join(' ')
        if (!question) return message.channel.send('Veuillez indiquer votre suggestion.').then(sent => sent.delete({timeout: 5e3})) 
        message.delete()
        const sent = await message.channel.send(new Discord.MessageEmbed()
            .setAuthor("Nouvelle suggestion de " + message.author.tag, message.author.avatarURL())
            .setTitle("Suggestion:")
            .setColor("#ff2050")
            .setDescription(args.join(" "))
            .setFooter("!suggest <message>")
            .setTimestamp());
    },
    name: 'suggest',
    guildOnly: true
}