const mongoose = require('mongoose');
const { URL_PATTERN } = require('../constants');


const housingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: [6, 'The name should be at leas 6 characters long!']
    },
    type: {
        type: String,
        required: true,
        enum: ['Appartment', 'Villa', 'House']
    },
    year: {
        type: Number,
        required: true,
        min: [1850, 'The year should\'t be less than 1850!'],
        max: [2021, 'The year should\'t be higher than 2022!']
    },
    city: {
        type: String,
        required: true,
        minLength: [4, 'City name should be at leat 4 characters long!']
    },
    houseImg: {
        type: String,
        required: true,
        validate: {
            validator(value){
              return URL_PATTERN.test(value)
            },
            message: 'Home image must be a valid URL!'
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: [60, 'Property description should be maximun 60 characters long!']
    },
    pieces: {
        type: Number,
        required: true,
        min: [0, 'Pieces should be a positiv number!'],
        max: [10, 'Pieces should be maximum 10!']
    },
    rented: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
       default: []
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
 
});

const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;