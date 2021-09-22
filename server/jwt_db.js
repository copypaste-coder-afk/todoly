const Pool = require("pg").Pool;

const jwt_auth = new Pool({
    user: "postgres",
    password: "tiger123",
    host: "localhost",
    port: 5432,
    database: "jwtauthorization",
});


module.exports = jwt_auth;