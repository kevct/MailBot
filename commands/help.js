const discord = require('discord.js');
const { prefix } = require('../prefix.json');

module.exports = {
    name: 'help',
    description: 'Shows a list of commands.',
    execute(message, args){
        const discordEmbed = new discord.MessageEmbed()
            .setColor("#008f18")
            .setTitle("List of commands")
            .addFields(
                {name: `${prefix}register [carrier] [tracking number]`, value: "Registers the tracking number to allow for tracking."},
                {name: `${prefix}track [carrier] [tracking number]`, value: "Displays the status of the package."},
                {name: `${prefix}help`, value: "Displays this message."}
            )
        message.channel.send(discordEmbed);
    }
};