// Modules
var express = require('express');
var router = express.Router();
var databaseModule = require('./database_module.js');

var query;

/* GET inventory. */
router.get('/:userId', function(req, res, next) {
  var userID = req.params.userId;

  query = 'SELECT "user_id", "inventory.item_id", "inventory.amount" FROM "user" INNER JOIN "inventory" ON "inventory.user_id" = "user_id" WHERE "user_id" IN ({0});';
  query = query.replace('{0}', userID);

  try {
    databaseModule.execute(query, function(result) {
      res.send(JSON.stringify(result));
    });

  } catch (e) {
    console.error(e);
  }
});

/* POST inventory. */
router.post('/:userId', function(req, res, next) {
  var userID = req.params.userId;
  //Body elements
  var itemID = req.body.item_id;
  var amount = req.body.amount;

  query = 'UPDATE "inventory" SET "amount" = {0} WHERE "user_id" IN ({1}) AND "item_id" IN ({2});';
  query = query.replace('{0}', amount);
  query = query.replace('{1}', userID);
  query = query.replace('{2}', itemID);

  try {
    databaseModule.execute(query, function(result) {
      res.send('query executed!');
    });

  } catch (e) {
    console.error(e);
  }
})

module.exports = router;
