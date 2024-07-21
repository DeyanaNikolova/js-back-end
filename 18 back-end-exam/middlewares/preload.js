const photoService = require('../services/photoService');

exports.preload = (populate) => {
    return async function (req, res, next){
        const id = req.params.id;

        if(populate){
            res.locals.photo = await photoService.getPhotosAndUsers(id);
        }else{
            res.locals.photo =  await photoService.getById(id);
        }
        next();
    }
}
