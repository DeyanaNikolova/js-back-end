const Book = require('../models/Book');

exports.getAll = () => Book.find({}).lean();
exports.getById = (bookId) => Book.findById(bookId).lean();

exports.create = (ownerId, bookData) => Book.create({...bookData, owner: ownerId });

exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);

exports.deleteBook = (bookId) => Book.findByIdAndDelete(bookId);

exports.wishBook = async (userId, bookId) => {
    const book = await Book.findById(bookId);

    book.wishList.push(userId);
    return book.save();
};

exports.getByUserWishlist = async (userId) => {
    return (await Book.find({ wishList: userId }).lean());
};