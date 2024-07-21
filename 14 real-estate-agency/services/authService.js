const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');




async function register(name, username, password){

  const existing = await getUserByUsername(username);

  if (existing) {
    throw new Error('Username exists!');
  }

  const hashedPass = await bcrypt.hash(password, 10);

 const user = new User({ name, username, password: hashedPass });

  await user.save();

  return (user, login(username, password));
}

async function login(username, password){
  
  const user = await getUserByUsername(username);

  if (!user) {
    throw new Error('Invalid username or password!');
  }
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid username or password!');
  }
  
  const payload = {
    _id: user._id, 
    username: user.username
  }
  const token = await jwt.sign(payload, SECRET);
  return token;
}


// async function getUserByEmail(email) {
//   const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
//   return user;
// }

async function getUserByUsername(username) {
  const user = await User.findOne({ username });
  return user;
}

module.exports = {
  register,
  login
};
