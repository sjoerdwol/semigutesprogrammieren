var express = require('express');
var router = express.Router();
var usersController = require('../controller/usersController.js')

/* POST request for validation of user credentials */
router.post('/login', usersController.users_login_post);

module.exports = router;
