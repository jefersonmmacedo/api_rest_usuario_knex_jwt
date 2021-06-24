var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '211902fluminense',
      database : 'apiusers'
    }
  });

module.exports = knex