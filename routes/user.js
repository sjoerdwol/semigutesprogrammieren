var express = require('express');
var router = express.Router();
var userApiController = require('../controller/api/user.js')

/* POST request for validation of user credentials */
router.post('/login', userApiController.user_login_post);

module.exports = router;
