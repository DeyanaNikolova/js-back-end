const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    email: {
        type:String,
        requried: true,
        validate: /^[a-zA-z0-9]+@[a-zA-z]+.[a-zA-z]+/i
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
        minLength: [1, 'First name must be at least 1 character long!']
    },
    lastname:{
        type:String,
        required: true,
        minLength: [1, 'Last name must be at least 1 character long!']
    }
});



const User = model('User', userSchema);

module.exports = User;
