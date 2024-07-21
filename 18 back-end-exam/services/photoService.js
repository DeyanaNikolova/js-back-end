const Photo = require('../models/Photo');


async function getAllPhotos(){
    return Photo.find({}).lean();
}

async function getById(photoId){
   return Photo.findById(photoId).lean();
}

async function getPhotosByUser(userId) {
    return Photo.find({ owner: userId }).lean();
}

async function getPhotosAndUsers(id){
    return Photo.findById(id).lean();
}

async function createPhoto (photoData) {
    const photo = new Photo(photoData);
    await photo.save();

}

async function editPhoto(id, photo){
   const existing = await Photo.findById(id);

    existing.name = photo.name;
    existing.age = Number(photo.age);
    existing.imageUrl = photo.imageUrl;
    existing.description = photo.description;
    existing.location = photo.location;

    await existing.save();

}

async function deleteById(id) {
    await Photo.findByIdAndDelete(id);
}



module.exports = {
    getAllPhotos,
    getById,
    getPhotosByUser,
    getPhotosAndUsers,
    createPhoto,
    editPhoto,
    deleteById
};

