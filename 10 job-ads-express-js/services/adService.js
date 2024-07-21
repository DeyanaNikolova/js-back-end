const Ad = require('../models/Ad');

exports.getAll = () => Ad.find({}).lean();

exports.getById = (adId) => Ad.findById(adId).lean();