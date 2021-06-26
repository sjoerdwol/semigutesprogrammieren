let express = require('express');
let router = express.Router();
let bookApiController = require('../controller/api/book.js')

router.get('/get', bookApiController.book_get_get);
router.post('/set', bookApiController.book_set_post);

module.exports = router;
