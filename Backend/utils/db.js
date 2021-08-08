const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '3.0.40.66',
    port: 3306,
    user: 'andy',
    password: '12345678',
    database: 'codejoy'
  }
});

module.exports = knex;