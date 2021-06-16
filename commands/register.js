const discord = require('discord.js');
const { aftershipKey } = require('../config.json');
const { prefix } = require('../prefix.json');

module.exports = {
    name: 'register',
    description: 'Registers a tracking number.',
    execute(message, args){
        if(args === undefined || args.length < 2){
            message.channel.send(`Usage: \`${prefix}register\` \`[carrier]\` \`[tracking number]\``);
            return;
        }

        const { AfterShip } = require('aftership');
        var aftership = new AfterShip(aftershipKey);

        var carrier = args[0];
        var trackingNum = args[1];

        const payload = {
            'tracking': {
              'tracking_number': trackingNum,
              'slug': carrier
            }
        };
        aftership.tracking
            .createTracking(payload)
            .then((result) => console.log(result))
            .catch((e) => {
                const discordEmbed = new discord.MessageEmbed()
                    .setColor("#910000")
                    .setTitle(`${carrier.toUpperCase()} ${trackingNum.toUpperCase()}`)
                    .addFields(
                        {name: "Registration error", value:"Either the tracking number does not exist or it is already registered."}
                    )
                message.channel.send(discordEmbed);
                console.log(e);
            });
    },
};

