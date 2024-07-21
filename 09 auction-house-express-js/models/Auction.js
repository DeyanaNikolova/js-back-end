const { Schema, model, Types } = require('mongoose');

const auctionSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [4, 'Title must be at least 4 characters long!'],
    },
    description: {
        type: String,
        maxLength: [200, 'Description mist be at most 200 characters long!']
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['Vehicles', 'Real Estate', 'Electronics', 'Furniture', 'Other'],
            message: 'Invalid category!'
        }
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bidder: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Auction = model('Auction', auctionSchema);

module.exports = Auction;
