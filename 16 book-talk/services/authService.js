const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');


exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });


exports.register = async (email, username, password, repass) => {
    // validate password
  if(password.length < 3){
    throw new Error('Password must be at least 3 characres long!');
  }
  
  if (password !== repass) {
    throw new Error('Password missmatch!');
  }

  // TODO: check if user or email exist
  const existingUser = await User.findOne({
    $or: [
      { email },
      { username }
    ]
  });

  if (existingUser) {
    throw new Error('Username exists!');
  }

  const hashedPass = await bcrypt.hash(password, 10);
  await User.create({email, username, password: hashedPass });

  return this.login(email, password);
};


exports.login = async (email, password) => {
  // User exsists
  const user = await this.findByEmail(email);

  if (!user) {
    throw new Error('Invalid email or password!');
  }
  //  Password is valid
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid email or password!');
  }
  //  Generate token
  const payload = {
    _id: user._id,
    email,
    usernam: user.username
  }
  const token = await jwt.sign(payload, SECRET);
  return token
};