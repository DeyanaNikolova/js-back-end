const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        requred: true,
        minLength: [2, 'Book title must be at least 2 characters long!']
    },
    author: {
        type: String,
        required: true,
        minLength: [5, 'Book author must be at least 5 characters long!']
    },
    genre: {
        type: String,
        required: true,
        minLength: [5, 'Book genre must be at least 3 characters long!']
    },
    stars: {
        type: Number,
        min: [1, 'Stars must be at least 1!'],
        max: [5, 'Stars must be at most 5!']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?:\/\/./
    },
    reviews: {
        type: String,
        required: true,
        minLength: [10, 'Book reviews must be at least 10 characters long!']
    },
    wishList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;