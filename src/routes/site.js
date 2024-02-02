const express = require('express');
const router = express.Router();
// import NewsController
const siteController = require('../app/controllers/SiteController');

router.get('/search/:slug', siteController.search);
router.get('/', siteController.index);

module.exports = router;
