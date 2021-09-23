//Required Files
const express = require ('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const jwt_auth = require('./jwt_db');
const { emptyQuery } = require('pg-protocol/dist/messages');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../server/utils/jwtGenerator.js');

//Middleware
app.use(cors());
app.use(express.json());

//Routes//

//Create A Todo
app.post("/todos",async (req,res) => {
    try {
        console.log(req.body);
        const {description} = req.body;
        const newToDo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]);
        res.send(`Done!`);
    }
    catch (err){
        console.error(err.message);
    }
});

//Get All Todo
app.get("/todos", async (req,res) => {
    try {  
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos);
    }
    catch (err){
        console.error(err.message);
    }
});
//Get A Todo
app.get("/todos/:id", async (req,res) => {
    try {  
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = ($1)",[id]);
        res.json(todo.rows[0]);
    }
    catch (err){
        console.error(err.message);
    }
});

//Update A Todo
app.put("/todos/:id", async (req,res) => {
    try {  
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = ($1) WHERE todo_id = ($2)", [description,id]);
        res.json("Todo Was Updated.");
    }
    catch (err){
        console.error(err.message);
    }
});


//Delete A Todo
app.delete("/todos/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const todoDelete = await pool.query("DELETE FROM todo where todo_id= ($1)",[id]);
        res.send(`Successfully Deleted The Value With ID: ${id}`);
    }
    catch(err){
        console.error(err.message);
    }
});


//This is where JWT Authorization Starts
app.post("/auth/register", async (req,res) => {
    try {
        // 1. Destructure req.body (name, email, password)
        const {name, email, password , security_question, answer} = req.body
        // 2. Check If User Exists (If user exists then throw error)
        const user = await jwt_auth.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length !== 0){
            return res.status(401).send(`User Already Exists`);
        }
        // 3. Bcrypt the user password
        console.log('I Am At Step 3')
        const saltRound = 10;
        const genSalt = await bcrypt.genSalt(saltRound);
        bcryptPassword =  bcrypt.hash(password, genSalt);
        
        // 4. Enter the new user inside our database
        console.log('I Am At Step 4')
        const response = await jwt_auth.query("INSERT INTO users (user_name, user_email, user_password, user_security_question, user_answer_question) VALUES  ($1,$2,$3,$4,$5) RETURNING *", [name,email,password,security_question,answer]);

        console.log('I Am At Step 5')
        // 5. Generating our jwt token.
        const {rows: [{user_id: user_id}]} = response;
        const token = jwtGenerator(user_id);
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error`);
    }
})

//Get Username For Account You Know Email Of.
app.get("/forgetusername", async (req,res) => {
     const {email} = req.body;
     const username = await jwt_auth.query("SELECT user_name FROM users WHERE user_email = $1",[email]);
     console.log(username)
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

//Get Password For Account You Know Email Of.
app.get("/forgetpassword/verifyuser", async (req,res) => {
    const {email} = req.body;
    const get_security_question = await jwt_auth.query("SELECT user_security_question FROM users where user_email = $1",[email]);
    if (get_security_question.rows.length === 0)
    {
        return res.json(`No User With Email ${email} Exist In DB`);
    }
    else
    {
        const {rows: [{user_security_question: question}]} = get_security_question;
        console.log(question);
        res.json(question);
    }
})

//Port For Listening
app.listen(5000,() =>{
    console.log(`Listening at port 5000`);
})
