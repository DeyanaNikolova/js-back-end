const mongoose = require('mongoose');



const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name must be at leas 2 characters long!']
    },
    imageUrl: {
        type: String,
        required: true,
        validate:  /^https?:\/\/.+/gm,
    },
    age: {
        type: Number,
        required: true,
        min: [1, 'The age must be at leas 1 year old!'],
        max: [100, 'The age must be maximum 100 years old!']
    },
    description: {
        type: String,
        required: true,
        minLength: [5, 'Description must be at least 5 characters long!'],
        maxLength: [50, 'Description must be maximum 50 characters long!']
    },
    location: {
        type: String,
        required: true,
        minLength: [5, 'Location must be at leas 5 characters long!'],
        maxLength: [50, 'Location must be maximum 50 characters long!']
    },
    coomentList: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        comment: {
            type: String,
            required: true,
            ref: 'User'
        }
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;