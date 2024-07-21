const mongoose = require('mongoose');

// TODO: change database according to assigment
const CONNECTECTION_STRING = 'mongodb://127.0.0.1:27017/scaffoldDb';

module.exports = async (app) => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(CONNECTECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

