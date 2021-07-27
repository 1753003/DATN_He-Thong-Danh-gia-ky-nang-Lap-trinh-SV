const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '3.0.40.66',
    port: 5000,
    user: 'root',
    password: 'akczj8geq7g49675',
    database: 'codejoy'
  }
});

module.exports = knex;