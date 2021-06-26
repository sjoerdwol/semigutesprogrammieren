let express = require('express');
let router = express.Router();
let indexController = require('../controller/index');

router.get('/', indexController.index_get);

module.exports = router;
