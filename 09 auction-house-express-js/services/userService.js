const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'e345f0ccbee68f22526d8b8892a1e8ce74199045';


async function register(email, firstname, lastname, password) {
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
        throw new Error('Email is taken!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        firstname,
        lastname,
        hashedPassword
    });

    return createSession(user);
}

async function login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Incorrect email or password!');
    }
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (hasMatch == false) {
        throw new Error('Incorrect email or password!');
    }
    return createSession(user);
}


function createSession({ _id, email, firstname, lastname }) {
    const payload = {
        _id,
        email,
        firstname,
        lastname
    };

    return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    verifyToken
};