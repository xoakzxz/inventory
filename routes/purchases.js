var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:userId', function(req, res, next) {
  res.send (req.params.userId);
});

module.exports = router;
