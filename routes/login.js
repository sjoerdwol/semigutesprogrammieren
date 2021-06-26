let express = require('express');
let router = express.Router();
let globalController = require('../controller/global');

router.get('/', globalController.requireNotLoggedIn, (req, res) => {
  res.render('login');
});

module.exports = router;
