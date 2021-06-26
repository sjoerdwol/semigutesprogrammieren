let express = require('express');
let router = express.Router();
let globalApiController = require('../../controller/api/global');
let booksApiController = require('../../controller/api/books');

/* Get list of all books */
router.get('/', globalApiController.requireLoggedIn, booksApiController.api_books_get);

module.exports = router;
