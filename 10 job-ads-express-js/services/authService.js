const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');


//exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });


exports.register = async (email, password, repass, description) => {
 
  if(password.length < 5){
    throw new Error('pasword must be at least 5 characters long!');
  }
  if (password !== repass) {
    throw new Error('Password missmatch!');
  }

  const existingUser = await this.findByEmail({ email });

  if (existingUser) {
    throw new Error('Email exists!');
  }

  const hashedPass = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPass, description });

  return this.login(email, password);
};


exports.login = async (email, password) => {

  const user = await this.findByEmail(email);

  if (!user) {
    throw new Error('Invalid email or password!');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid email or password!');
  }
  
  const payload = {
    _id: user._id,
    email,
    description
  }
  const token = await jwt.sign(payload, SECRET);
  return token
};