const Auction = require('../models/Auction');


async function getAll() {
    return Auction.find({}).lean();
}

async function getById(id) {
    return Auction.findById(id).lean();
}

async function publish(ownerId, auctionData) {
    return Auction.create({...auctionData, owner: ownerId });
}


module.exports = {
    getAll,
    getById,
    publish,

}