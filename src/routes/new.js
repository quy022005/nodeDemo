const express = require('express');
const router = express.Router();
// import NewsController
const newsController = require('../app/controllers/NewsController');
// newController.method
router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;
