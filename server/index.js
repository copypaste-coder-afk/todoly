//Required Files
const express = require ('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const jwt_auth = require('./jwt_db');
const { emptyQuery } = require('pg-protocol/dist/messages');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../server/utils/jwtGenerator.js');
const validity = require('../server/middleware/validinfo.js');
const authorization = require('../server/middleware/authorization.js')
const todoRoutes = require('')
//Middleware
app.use(cors());
app.use(express.json());

//Routes//




//? This is where JWT Authorization Starts
app.post("/auth/register",validity, async (req,res) => {
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


app.post("/auth/login",validity,async (req,res) => {
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
//? Get Username For Account You Know Email Of.
app.get("/forgetusername", async (req,res) => {
     const {email} = req.body;
     const username = await jwt_auth.query("SELECT user_name FROM users WHERE user_email = $1",[email]);
     if (username.rows.length !== 0)
     {
         const {rows: [{user_name: name}]} = username;
         res.json(name).send(`The Username for the email "${email}" is "${name}"`);
         //return res.send(`The Username for the email "${email}" is "${name}"`);
     } 
     else
     {
         return res.send(`No User With Email ${email} Exist In DB`);
     }
})

app.post("/forgetpassword/verifyuser", async (req,res) => {
    const {email} = req.body;
    const get_security_question = await jwt_auth.query("SELECT user_security_question FROM users where user_email = $1",[email]);
    if (get_security_question.rows.length === 0)
    {
        return res.json(`No User With Email ${email} Exist In DB`);
    }
    else
    {
        const {rows: [{user_security_question: question}]} = get_security_question;
        res.json(question);
    }
})

app.post("/forgetpassword", async (req,res) => {
    const {question} = req.body;
    const check_answer = await jwt_auth.query("SELECT user_answer FROM users where user_security_question = $1",[question]);
        const {rows: [{user_answer: answer}]} = check_answer;
        res.json(answer);
})

app.post("/auth",authorization,async (req,res) => {
    try {
        res.json(true);
      } 
      catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    });

app.put("/setpassword", async (req,res) => {
    try {  
        const {password, email} = req.body;
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword =  await bcrypt.hash(password, salt);
        const updatePassword = await jwt_auth.query("UPDATE users SET user_password = ($1) WHERE user_email = ($2)", [bcryptPassword,email]);
        res.json("Password Has Been Updated.");
    }
    catch (err){
        console.error(err.message);
    }
})

//! Port For Listening
app.listen(5000,() =>{
    console.log(`Listening at port 5000`);
})
