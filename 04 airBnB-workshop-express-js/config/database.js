const mongoose = require('mongoose');

const connStr = process.env.DATABASE_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/booking';
mongoose.set('strictQuery', false);

module.exports = async (app) => {
    try {
        await mongoose.connect(connStr, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected');
    } catch(err){
        console.error('Error initializing database');
        console.error(err.message);
        process.exit(1);
    }
};