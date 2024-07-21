const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [5, 'Username is too short, minimum allowed length 5 characters!'],
        unique: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Usarname should consist only latin leters and digits!'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password should be minimum 8 characters!'],
        validate: /^[a-zA-Z0-9]+$/
    },
});

userSchema.pre('save', function (next) {

    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        });
});


userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});



const User = mongoose.model('User', userSchema);

module.exports = User;