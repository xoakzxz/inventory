// Modules
var pg = require('pg');

// Properties
var config = {
  user: 'postgres',
  database: 'inventory',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

var pool = new pg.Pool(config);

// Execute function
function execute (query, onCompleted) {
  pool.connect (function (error, client) {
    if (error) return console.error('Error fetching client from pool', error);

    client.query (query, function (error, result) {
      if (error) return console.error('Error running query', error);

      onCompleted (result.rows);

      client.end (function (error) {
        if (error) return console.error('Error ending the client', error);
      });
    });
  });

  pool.on ('error', function (error, client) {
    console.error('Idle client error', error.message, error.stack);
  });
}

// Exporting module
module.exports.execute = execute;
