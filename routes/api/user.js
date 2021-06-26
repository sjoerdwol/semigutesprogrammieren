let express = require('express');
let router = express.Router();
let userApiController = require('../../controller/api/user.js')

/* POST request for validation of user credentials */
router.post('/login', userApiController.user_login_post);

module.exports = router;
