// Modules
var express = require('express');
var router = express.Router();
var databaseModule = require('./database_module.js');

var query;

/* GET purchases. */
router.get('/:userId', function(req, res, next) {
  var userID = req.params.userId;

  query = 'SELECT "gold" FROM "user" WHERE "user_id" IN ({0});';
  query = query.replace('{0}', userID);

  try {
    databaseModule.execute(query, function(result) {
      res.send(JSON.stringify(result));
    });

  } catch (e) {
    console.error(e);
  }
});

/* POST purchases. */
router.post('/:userId', function(req, res, next) {
  var userID = req.params.userId;
  //Body elements
  var itemID = req.body.item_id;

  var gold;
  var cost;
  var amount;

  query = 'SELECT "gold" FROM "user" WHERE "user_id" IN ({0});';
  query = query.replace('{0}', userID);

  try {
    databaseModule.execute(query, function(result) {
      gold = JSON.stringify(result[0].gold);

      query = 'SELECT "cost" FROM "item" WHERE "item_id" IN ({0});';
      query = query.replace('{0}', itemID);

      try {
        databaseModule.execute(query, function(result) {
          cost = JSON.stringify(result[0].cost);

          if (gold >= cost) {
            query = 'SELECT "amount" FROM "inventory" WHERE "user_id" IN ({0}) AND "item_id" IN ({1});';
            query = query.replace('{0}', userID);
            query = query.replace('{1}', itemID);

            try {
              databaseModule.execute(query, function(result) {
                amount = JSON.stringify(result[0].amount);
                amount++;

                query = 'UPDATE "inventory" SET "amount" = {0} WHERE "user_id" IN ({1}) AND "item_id" IN ({2});';
                query = query.replace('{0}', amount);
                query = query.replace('{1}', userID);
                query = query.replace('{2}', itemID);

                try {
                  databaseModule.execute(query, function(result) {
                    gold -= cost;

                    query = 'UPDATE "user" SET "gold" = {0} WHERE "user_id" IN ({1});';
                    query = query.replace('{0}', gold);
                    query = query.replace('{1}', userID);

                    try {
                      databaseModule.execute(query, function(result) {
                        response.send('query executed!');
                      });

                    } catch (e) {
                      console.error(e);
                    }
                  });

                } catch (e) {
                  console.error(e);
                }
              });

            } catch (e) {
              console.error(e);
            }
          }
          else {
            console.error('The player has no gold');
          }
        });

      } catch (e) {
        console.error(e);
      }
    });

  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
