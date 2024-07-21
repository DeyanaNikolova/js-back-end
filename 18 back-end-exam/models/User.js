const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [2, 'Username must be minimum 2 characters long!'],

    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email must be minimum 10 characters long!'],
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


