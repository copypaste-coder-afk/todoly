const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "tiger123",
    host: "localhost",
    port: 5432,
    database: "todoly",
});


module.exports = pool;