const { shippoKey } = require('../config.json');
const { prefix } = require('../prefix.json');

module.exports = {
    name: 'track',
    description: 'Displays the status of a given tracking number',
    execute(message, args){
        if(args === undefined || args.length < 2){
            message.channel.send(`Usage: \`${prefix}track\` \`[carrier]\` \`[tracking number]\``);
            return;
        }

        var shippo = require('shippo')(shippoKey);

        var carrier = args[0];
        var trackingNum = args[1];

        shippo.track.get_status(carrier, trackingNum)
        .then(function(status) {
            console.log("Tracking info: %s", JSON.stringify(status, null, 4));
        }).catch(function(err) {
            console.log("There was an error retrieving tracking information: %s", err);
        });
        //console.log(`${carrier} ${trackingNum}`);
    },
};