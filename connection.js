var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'acessog10',
        database: 'banco'
    }
});

module.exports = knex