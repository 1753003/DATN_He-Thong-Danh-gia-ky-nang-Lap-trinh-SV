const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'grp6m5lz95d9exiz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'vqdunee9clgyzm0d',
    password: 'akczj8geq7g49675',
    database: 'rrnlpcoccdmp00e6'
  }
});

module.exports = knex;