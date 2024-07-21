const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
      validate: /[a-zA-z0-9]+@[a-zA-Z]+.[a-zA-Z]+/i,
    },
    password: {
        type: String,
        required: true,   
    },
    description: {
        type: String,
        required: [true, 'Skils description is required!'],
        maxLength: [40, 'Skills description must be at most 40 characters long!'],

    },
    
});


const User = mongoose.model('User', userSchema);

module.exports = User;


