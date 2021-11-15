const express = require('express');
const router = express.Router();
const jwt_auth = require('../jwt_db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validity = require('../middleware/validinfo.js');


router.post("/auth/register",validity, async (req,res) => {
    try {
        // 1. Destructure req.body (name, email, password)
        const {name, email, password , security_question, answer} = req.body
        // 2. Check If User Exists (If user exists then throw error)
        const user = await jwt_auth.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length !== 0){
            return res.status(401).send(`User Already Exists`);
        }
        // 3. Bcrypt the user password
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword =  await bcrypt.hash(password, salt);
        
        // 4. Enter the new user inside our database
        const response = await jwt_auth.query("INSERT INTO users (user_name, user_email, user_password, user_security_question, user_answer) VALUES  ($1,$2,$3,$4,$5) RETURNING *", [name,email,bcryptPassword,security_question,answer]);
        
        // 5. Generating our jwt token.
        const {rows: [{user_id: user_id}]} = response;
        const token = jwtGenerator(user_id);
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error`);
    }
})


router.post("/auth/login",validity,async (req,res) => {
    try {
        // * 1. Destructure req.body (name, email, password)
        const {email,password} = req.body;
        // * 2. Check If User Exists (If user exists then throw error)
        const user = await jwt_auth.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length !== 0){
            const {rows: [{user_password: password_verity}]} = user
            const passwordvalidity = await bcrypt.compare(password,password_verity)
            if (passwordvalidity)
            {
                const {rows: [{user_id: user_id}]} = user;
                const token = jwtGenerator(user_id);
                res.json({token});
            }
            else
            {
                res.status(401).send(`Wrong Password Or Email`)
            }
        }
        else{
            return res.status(401).send(`User Not Found With Given Email Or Password Is Wrong`);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error`);
    }
})


module.exports = router;