const sharp = require('sharp');
module.exports = {
    friendlyName: 'Resizer',
    description: 'Resizes images to discord-friendly sizes.',
    inputs: {
        buffer: {
            type: 'Buffer',
            example: '<Buffer>',
            description: 'File buffer that is passed to sharp',
            required: true
        },
        size: {
            type: 'string',
            example: 'icon | small | medium',
            description: 'Amount to scale the image down to',
            required: false
        }
    },
    exits: {},
    fn: async function (inputs, exits) {
        /* Everything will pretty much be going off
         * width since that's what it's important in discord.
         */
        const image = sharp(inputs.buffer);
        image.metadata()
            .then(console.log);
        // All done.
        return exits.success();

    }
};

