const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10386586',
    password: 'ATnWLvv6H3',
    database: 'sql10386586'
})

module.exports = connection