var express = require('express');
var router = express.Router();
var userController = require('../controller/userController.js')

/* POST request for validation of user credentials */
router.post('/login', userController.user_login_post);

module.exports = router;
