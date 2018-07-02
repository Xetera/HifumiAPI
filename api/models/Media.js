/**
 * Media.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        //   ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //   ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //   ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

        key: {
            type: 'string'
        },

        date: {
            type: 'string'
        },

        user: {
            type: 'string'
        },

        bucketName: {
            type: 'string',
            defaultsTo: 'hifumicdn'
        },

        extension: {
            type: 'string',
            required: true
        },

        size: {
            type: 'number',
            required: true
        },

        urlId: {
            type: 'string',
            required: true
        },

        // TODO: implement this
        hash: {
            type: 'string'
        }
        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    },

};

