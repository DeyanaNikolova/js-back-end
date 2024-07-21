const router = require('express').Router();
const booksService = require('../services/booksService');
const { isAuthorized } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    const books = await booksService.getAll();
    if (books) {
        res.render('catalog', { books });
    }
});


router.get('/create', isAuthorized, (req, res) => {
    res.render('create');
});

router.post('/create', isAuthorized, async (req, res) => {
    const bookData = req.body;
    try {
        await booksService.create(req.user._id, bookData);
    } catch (error) {
        return res.status(400).render('create', { error: getErrorMessage(error) });
    }
    res.redirect('/catalog');
});


router.get('/details/:id', async (req, res) => {
    const book = await booksService.getById(req.params.id);

    const isOwner = book.owner?._id == req.user?._id;
    const isWished = book.wishList?.some(id => id.toString() == req.user?._id);
    res.render('details', { book, isOwner, isWished });

});

router.get('/edit/:id', isAuthorized, async (req, res) => {
    const book = await booksService.getById(req.params.id);

    res.render('edit', { book });
});

router.post('/edit/:id', isAuthorized, async (req, res) => {
    const bookData = req.body;
    try {
        if (Object.values(bookData).some(x => !x)) {
            throw new Error(' All fields are required!');
        }
        await booksService.edit(req.params.id, bookData);

        res.redirect('/catalog');
    } catch (error) {
        res.render('edit', {
            book: Object.assign(bookData, { _id: req.params.id }),
            error: getErrorMessage(error)
        });
    }

});

router.get('/delete/:id', isAuthorized, async (req, res) => {
    await booksService.deleteBook(req.params.id);
    res.redirect('/catalog');
});

router.get('/wish/:id', isAuthorized, async (req, res) => {
    const book = await booksService.getById(req.params.id);
    try {
        
        await booksService.wishBook(req.user._id, req.params.id);
        
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        res.render('details', { error: getErrorMessage(error),  })
    }
});



module.exports = router;