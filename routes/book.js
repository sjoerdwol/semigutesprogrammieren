var express = require('express');
var router = express.Router();
var bookController = require('../controller/bookController.js')

router.get('/get', bookController.book_get_get);
router.post('/set', bookController.book_set_post);

module.exports = router;
