module.exports = {
    friendlyName: 'Verifier',
    sync: true,
    description: 'Verifies file file extension of an upload or request.',
    inputs: {
        filename: {
            type: 'string',
            example: 'file.png',
            description: 'Filename to verify',
            required: true
        }

    },
    exits: {
        invalid: {
            description: 'The file is invalid'
        }
    },
    fn: function (inputs, exits) {


        const sections = inputs.filename.split('.');
        if (sections.length !== 2 || !sails.config.globals.validFiles.includes(sections.pop())){
            throw 'invalid'
        }
        return exits.success();
    }
};

