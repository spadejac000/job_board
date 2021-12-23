const Pool = require('pg').Pool

const pool = new Pool({
  user: "jacobspade",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "jobboard"
})

module.exports = pool