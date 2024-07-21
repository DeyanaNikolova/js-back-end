const router = require('express').Router();
const { isAuthorized } = require('../middlewares/authMiddleware');
const housingService = require('../services/housingService');
const { getErrorMessage } = require('../utils/errorUtils');
const { preload } = require('../middlewares/preload');



router.get('/create', isAuthorized, (req, res) => {
    res.render('create');
});

router.post('/create', isAuthorized, async (req, res) => {
 
    const house = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        houseImg: req.body.houseImg,
        description: req.body.description,
        pieces: Number(req.body.pieces),
        owner: req.user._id
    };
    try {
        await housingService.createHouse(house);
        res.redirect('/catalog');

    } catch (error) {
        res.render('create', { house, error: getErrorMessage(error) });
    }

});
    // catalog
router.get('/catalog', async (req, res) => {  
   
    const houses = await housingService.getAllHouses();
    res.render('catalog', { houses });
});

router.get('/details/:id', preload(true), async (req, res) => {
    const house = res.locals.house;
    house.available = house.pieces - house.rented.length;
     house.rentedList = house.rented.map(r => r.name).join(', ')
    if (req.user) {
        house.hasUser = true;
        house.isOwner = house.owner._id == req.user._id;

        if (house.rented.some(r => r._id == req.user._id)) {
            house.isRented = true;
        }
    }
    res.render('details');
});

router.get('/edit/:id', preload(), isAuthorized, (req, res) => {
    res.render('edit');
});

router.post('/edit/:id', preload(), isAuthorized, async (req, res) => {
    const id = req.params.id;

    const house = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        houseImg: req.body.houseImg,
        description: req.body.description,
        pieces: Number(req.body.prices),
        owner: req.user._id
    };

    try {
        await housingService.editHouse(id, house);
        res.redirect('/details/' + id);

    } catch (error) {
        house._id = id;
        res.render('edit', { house, error: getErrorMessage(error) });
    }
});


router.get('/delete/:id', preload(), isAuthorized, async (req, res) => {
    await housingService.deleteById(req.params.id)
    res.redirect('/catalog');
});


router.get('/rent/:id', isAuthorized, async (req, res) => {
    const id = req.params.id;

    try {
        await housingService.rentHouse(id, req.user._id);

    } catch (error) {
        console.error(error);
    } finally {
        res.redirect('/details/' + id);
    }
});

router.get('/search', async (req, res) => {
    const { type } = req.query;
    const types = await housingService.search(type);
    res.render('search', { types, type });
});

// bonus
// router.get('/profile', isAuthorized, async (req, res) => {
   
//     const tripsByUser = await housingService.getTripsByUser(res.locals._id);
//     res.locals.user.tripCount = tripsByUser.length;
//     res.locals.trips = tripsByUser;
//    console.log(res.locals.user.gender);
//     res.render('profile');
// });



module.exports = router;