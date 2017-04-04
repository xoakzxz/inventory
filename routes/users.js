// Modules
var express = require('express');
var router = express.Router();
var databaseModule = require('./database_module.js');

var query;

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  var userID = req.params.userId;

  query = 'SELECT "name", "gold" FROM "user" WHERE "user_id" IN ({0});';
  query = query.replace('{0}', userID);

  try {
    databaseModule.execute(query, function(result) {
      res.send(JSON.stringify(result));
    });

  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
