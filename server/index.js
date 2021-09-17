//Required Files
const express = require ('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

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
        res.json(newToDo);
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



//Port For Listening
// TODO Make It Dynamic Like Define An PORT And If It Not Available On That Then Set On Its Own.
app.listen(5000,() =>{
    console.log(`Listening at port 5000`);
})
