const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 50
    },
    imageUrl: {
        type: String,
        required: true,
        match: [ /^https?:\/\//, 'Invalid URL' ]
    }
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;