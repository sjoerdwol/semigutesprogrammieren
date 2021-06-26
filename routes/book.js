var express = require('express');
var router = express.Router();
var bookApiController = require('../controller/api/book.js')

router.get('/get', bookApiController.book_get_get);
router.post('/set', bookApiController.book_set_post);

module.exports = router;
