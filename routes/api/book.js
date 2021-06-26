let express = require('express');
let router = express.Router();
let globalApiController = require('../../controller/api/global');
let bookApiController = require('../../controller/api/book');

/* Get existing book */
router.get('/:isbn', globalApiController.requireLoggedIn, bookApiController.api_book_get);

/* Create new book */
router.post('/:isbn', globalApiController.requireLoggedIn, bookApiController.api_book_post);

/* Update existing book */
router.put('/:isbn', globalApiController.requireLoggedIn, bookApiController.api_book_put);

/* Delete existing book */
router.delete('/:isbn', globalApiController.requireLoggedIn, bookApiController.api_book_delete);

module.exports = router;
