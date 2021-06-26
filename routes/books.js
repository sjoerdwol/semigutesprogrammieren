let express = require('express');
let router = express.Router();
let globalController = require('../controller/global');

router.get('/', globalController.requireLoggedIn, (req, res) => {
  res.render('books');
});

module.exports = router;
