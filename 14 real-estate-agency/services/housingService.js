const Housing = require('../models/Housing');




async function getAllHouses() {
    return Housing.find({}).lean();
}

async function getById(houseId) {
    return Housing.findById(houseId).lean();
}

async function getHouseByUser(userId) {
    return Housing.find({ owner: userId }).lean();
}

async function getHouseAndUsers(id){
    return Housing.findById(id).populate('owner').populate('rented').lean();
}

async function search(type){
    let houses = await getAllHouses();

    if(type){
        houses.filter(x => x.type.toLowerCase() == type.toLowerCase());
    }
    return houses;
}


async function createHouse(houseData) {
    const house = new Housing(houseData);
    await house.save();

    //   const user = await User.findById(house.owner);
    //   user.tripHistory.push(trip._id);
    //   await user.save();
}

async function editHouse(id, house) {
    const existing = await Housing.findById(id);

    existing.name = house.name
    existing.type = house.type;
    existing.year = house.year;
    existing.city = house.city;
    existing.houseImg = house.houseImg;
    existing.description = house.description;
    existing.pieces = house.pieces;
    
    await existing.save();
}

async function deleteById(id) {
    await Housing.findByIdAndDelete(id);
}

async function rentHouse(houseId, userId) {
    const house = await Housing.findById(houseId);

    if (house.rented.includes(userId)) {
        throw new Error('You rent this house already!');
    }
    house.rented.push(userId);
    await house.save();
}



module.exports = {
    getAllHouses,
    getById,
    getHouseByUser,
    getHouseAndUsers,
    search,
    createHouse,
    editHouse,
    deleteById,
    rentHouse,
};

