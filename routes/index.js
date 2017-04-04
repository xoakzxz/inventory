// Modules
var express = require('express');
var router = express.Router();
var databaseModule = require('./database_module.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inventory' });
});

module.exports = router;
