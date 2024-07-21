const mongoose = require('mongoose');
const { NAME_PATTERN } = require('../constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator(value){
              return NAME_PATTERN.test(value)
            },
            message: 'Name should contain only letters!'
        }
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username must be at least 5 characters long!'],

    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.index({username: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


