const discord = require('discord.js');
const { aftershipKey } = require('../config.json');
const { prefix } = require('../prefix.json');

module.exports = {
    name: 'track',
    description: 'Displays the status of a given tracking number',
    execute(message, args){
        if(args === undefined || args.length < 2){
            message.channel.send(`Usage: \`${prefix}track\` \`[carrier]\` \`[tracking number]\``);
            return;
        }

        const { AfterShip } = require('aftership');
        var aftership = new AfterShip(aftershipKey);

        var carrier = args[0];
        var trackingNum = args[1];

        aftership.tracking
            .getTracking({
                slug: carrier,
                tracking_number: trackingNum,
            })
            .then(result => { //Print out tracking info
                const discordEmbed = new discord.MessageEmbed()
                    .setColor("#1C6BCB")
                    .setTitle(`${carrier.toUpperCase()} ${trackingNum.toUpperCase()}`)
                    .addFields(
                        {name: `${result.tracking.origin_country_iso3} => ${result.tracking.destination_country_iso3}`, value: `${result.tracking.shipment_type}`},
                        {name: `${result.tracking.subtag}`, value: `${result.tracking.subtag_message}`},
                        {name: `\u200B`, value: `[Tracking Link](${result.tracking.courier_tracking_link})`}
                    )
                message.channel.send(discordEmbed);
                console.log(result);
            })
            .catch(err => {
                const discordEmbed = new discord.MessageEmbed()
                    .setColor("#910000")
                    .setTitle(`${carrier.toUpperCase()} ${trackingNum.toUpperCase()}`)
                    .addFields(
                        {name: "Tracking number not found.", value:"Make sure the carrier and tracking number are correct."}
                    )
                message.channel.send(discordEmbed);
                console.log(err);
            });
    },
};