const discord = require('discord.js');
const { aftershipKey } = require('../config.json');
const { prefix } = require('../prefix.json');

module.exports = {
    name: 'delete',
    description: 'Deletes a tracking number from the database.',
    execute(message, args){
        if(args === undefined || args.length < 2){
            message.channel.send(`Usage: \`${prefix}delete\` \`[carrier]\` \`[tracking number]\``);
            return;
        }

        const { AfterShip } = require('aftership');
        var aftership = new AfterShip(aftershipKey);

        var carrier = args[0];
        var trackingNum = args[1];

        aftership.tracking
            .deleteTracking({
                'tracking_number': trackingNum,
                'slug': carrier
            })
            .then((result) => {
                const discordEmbed = new discord.MessageEmbed()
                    .setColor("#1C6BCB")
                    .setTitle(`${carrier.toUpperCase()} ${trackingNum.toUpperCase()}`)
                    .addFields(
                        {name: `Deleted`, value: "Register the tracking number again to track the package."}
                    )
                message.channel.send(discordEmbed);
                console.log(result);
            })
            .catch((e) => {
                const discordEmbed = new discord.MessageEmbed()
                    .setColor("#910000")
                    .setTitle(`${carrier.toUpperCase()} ${trackingNum.toUpperCase()}`)
                    .addFields(
                        {name: "Deletion error", value:"The carrier/tracking number does not exist in the database."}
                    )
                message.channel.send(discordEmbed);
                console.log(e);
            });
    },
};

