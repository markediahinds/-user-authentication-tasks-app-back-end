const pgp = require('pg-promise')()
require('dotenv').config()


const cn = {
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    port: process.env.PG_PORT,
    password: process.env.PG_PASSWORD,
}

const db = pgp(cn)


module.exports = db