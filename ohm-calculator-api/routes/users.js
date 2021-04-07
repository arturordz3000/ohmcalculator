var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({property1: 'someValue'});
});

module.exports = router;
