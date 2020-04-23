const Discord = require('discord.js');

module.exports = {
    name: "starboard",
    description: "Simulate a starboard post.",
    usage: '<mention or id> <stars> <channel or id> <content>',
    category: 'dbl',

    async code(client, message, args) {
        let user = client.users.cache.get(args[0]);
        if (!user) {
            function getUser(mention) {
                if (!mention) return;
                
                if (mention.startsWith(`<@`) && mention.endsWith(`>`)) {
                    mention = mention.slice(2, -1);

                    if (mention.startsWith(`!`)) {
                        mention = mention.slice(1);
                    }

                    return client.users.cache.get(mention);
                }
            }
            if (getUser(args[0])) {
                user = getUser(args[0]);
            } else {
                const errEmbed = new Discord.MessageEmbed()
                .setColor('#36393f')
                .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that user here.`)
                return message.channel.send(errEmbed).catch(err => err);
            }
        }
        let stars = parseInt(args[1]);
        if (!stars) {
            const errEmbed = new Discord.MessageEmbed()
            .setColor('#36393f')
            .setDescription(`<:tickNo:700331270210846780> Uhm... I didn't get how many stars you wanted.`)
            return message.channel.send(errEmbed).catch(err => err);
        }
        if (isNaN(stars)) {
            const errEmbed = new Discord.MessageEmbed()
            .setColor('#36393f')
            .setDescription(`<:tickNo:700331270210846780> Uhm... I don't think that is a number.`)
            return message.channel.send(errEmbed).catch(err => err);
        }
        let channel = message.guild.channels.cache.get(args[2]);
        if (!channel) {
            function getChannel(mention) {
                if (!mention) return;
                
                if (mention.startsWith(`<#`) && mention.endsWith(`>`)) {
                    mention = mention.slice(2, -1);

                    if (mention.startsWith(`!`)) {
                        mention = mention.slice(1);
                    }

                    return client.users.cache.get(mention);
                }
            }
            if (getChannel(args[2])) {
                channel = getChannel(args[2]);
            } else {
                const errEmbed = new Discord.MessageEmbed()
                .setColor('#36393f')
                .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that channel here.`)
                return message.channel.send(errEmbed).catch(err => err);
            }
        }
        let content = args.slice(3).join(' ');
        const starsBetween = function(Stars,min,max) {
            if (max === -1) {
                return Stars >= min;
            } else {
                return Stars >= min && Stars < max;
            }
        }
        const starEmbed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.avatarURL())
        if (content) {
        starEmbed.setDescription(content)
        }
        if (message.attachments.size > 0) {
            starEmbed.setImage(`${message.attachments.first().url}`);
        }
        starEmbed.setFooter(`ID: ${message.id}`)
        starEmbed.setTimestamp()

        let lastMessage = "";

        if (starsBetween(stars, 1, 8)) {
            starEmbed.setColor('#ffe7a3')
            lastMessage = `⭐ ${stars} | ${channel}`;
        } else if (starsBetween(stars, 8, 13)) {
            starEmbed.setColor('#ffd24f')
            lastMessage = `🌟 ${stars} | ${channel}`
        } else if (starsBetween(stars, 13, 28)) {
            lastMessage = `💫 ${stars} | ${channel}`
            starEmbed.setColor('#ffc20c')
        } else if (starsBetween(stars, 28, -1)) {
            lastMessage = `✨ ${stars} | ${channel}`
            starEmbed.setColor('#ffc20c')
        }
        await message.channel.send(lastMessage, starEmbed).then(m => m.react('701054002141462528')).catch(err => err);
    }
}