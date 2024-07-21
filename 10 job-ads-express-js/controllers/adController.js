const router = require('express').Router();
const adService = require('../services/adService');

router.get('/all-ads', async (req, res) =>{
    const ads = await adService.getAll();
    res.render('all-ads', { });
});



module.exports = router;