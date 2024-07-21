const router = require('express').Router();
const { isAuthorized } = require('../middlewares/authMiddleware');
const photoService = require('../services/photoService');
const { getErrorMessage } = require('../utils/errorUtils');
const { preload } = require('../middlewares/preload');



router.get('/create', isAuthorized, (req, res) => {
    res.render('create');
});

router.post('/create', isAuthorized, async (req, res) => {
    res.locals.owner = req.user._id;

    const photo = {
        name: req.body.name,
        age: Number(req.body.age),
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        location: req.body.location,
        owner: req.user._id
    }
    try {
        await photoService.createPhoto(photo);
        res.redirect('/catalog');

    } catch (error) {
        res.render('create', { photo, error: getErrorMessage(error) });
    }

});

router.get('/catalog', async (req, res) => {
    const photos = await photoService.getAllPhotos();
    res.locals.user.username = req.user.username;
    res.render('catalog', { photos });
});

router.get('/details/:id', isAuthorized, async (req, res) => {
    const photo = await photoService.getById(req.params.id);
    res.locals.photo = photo;

    if (req.user) {
        photo.hasUser = true;
        photo.isOwner = photo.owner._id == req.user._id;
    }
   
    res.render('details');
});

router.get('/edit/:id', preload(), isAuthorized, (req, res) => {
    res.render('edit');
});

router.post('/edit/:id', preload(), isAuthorized, async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const photo = {
        name: req.body.name,
        age: Number(req.body.age),
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        location: req.body.location,
    }

    try {
        await photoService.editPhoto(id, photo);
        res.redirect('/details/' + id);

    } catch (error) {
        photo._id = id;
        res.render('edit', { photo, error: getErrorMessage(error) });
    }
});


router.get('/delete/:id', preload(), isAuthorized, async (req, res) => {
    await photoService.deleteById(req.params.id)
    res.redirect('/catalog');
});


router.get('/join/:id', isAuthorized, async (req, res) => {
    const id = req.params.id;

    try {
        await tripService.joinTrip(id, req.user._id);

    } catch (error) {
        console.error(error);
    } finally {
        res.redirect('/details/' + id);
    }
});


router.get('/profile', isAuthorized, async (req, res) => {

    const photosByUser = await photoService.getPhotosAndUsers(req.user_id);

    res.render('profile', { photosByUser });
});



module.exports = router;