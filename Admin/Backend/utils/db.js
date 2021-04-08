const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: 'devcheckkhtn.mysql.database.azure.com',
      port: 3306,
      user: 'ponpon@devcheckkhtn',
      password: '7Rxcj9m$DaMnMT$',
      database: 'devcheck'
    }
  });
  
  module.exports = knex;