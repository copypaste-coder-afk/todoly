//Required Files
const express = require ('express');
const app = express();
const cors = require('cors');
const { emptyQuery } = require('pg-protocol/dist/messages');
const authorization = require('../server/middleware/authorization.js')
const todoRoutes = require('./routes/todoRoutes')
const authRoutes = require('./routes/authRoutes')
const {sequelize, todoly} = require('./models')
//Middleware
app.use(cors());
app.use(express.json());

//Sequelize Code
// const callsequelize = async () => {
    
// }


// callsequelize();


//Routes//

// todo ROUTES //
app.use(todoRoutes);
app.use(authRoutes);



//? This is where JWT Authorization Starts

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
app.listen(5000,async () =>{
    console.log(`Listening at port 5000`);
    await sequelize.authenticate();
    console.log(`Database Connected!`)
    
})
