let express = require('express');
let router = express.Router();
let userApiController = require('../../controller/api/user');

/* Validate user credentials and assign user to current session */
router.post('/login', userApiController.api_user_login_post);

module.exports = router;
