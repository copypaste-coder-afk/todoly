const jwt = require("jsonwebtoken");
require('dotenv').config();


const jwtGenerator = (user_id) => {
    const payload = {
        user: user_id
    }
    // console.log(process.env['jwtSecret']);
    return jwt.sign(payload,"fishermen69", {expiresIn: "1hr"});
};

module.exports = jwtGenerator;
