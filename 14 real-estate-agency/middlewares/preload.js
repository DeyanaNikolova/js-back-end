const housingService = require('../services/housingService');

// TODO: change service and functiond name
exports.preload = (populate) => {
    return async function (req, res, next){
        const id = req.params.id;

        if(populate){
            res.locals.house = await housingService.getHouseAndUsers(id);
        }else{
            res.locals.house =  await housingService.getById(id);
        }
        next();
    }
};
