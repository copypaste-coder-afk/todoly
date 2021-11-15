const express = require('express');
const router = express.Router();
const pool = require('../db');
const {todoly} = require('../models/todoly.js');


//Create A Todo
router.post("/todos",async (req,res) => {
    try {
        const {description} = req.body;
        const newTodo = await todoly.create({ description: description });
        // const newToDo = await pool.query("INSERT INTO todoly (description) VALUES ($1) RETURNING *",[description]);
    }
    catch (err){
        console.error(err.message);
    }
});

//Get All Todo
router.get("/todos", async (req,res) => {
    try {  
        const allTodos = await pool.query("SELECT * FROM todoly");
        res.json(allTodos);
    }
    catch (err){
        console.error(err.message);
    }
});
//Get A Todo
router.get("/todos/:id", async (req,res) => {
    try {  
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todoly WHERE todo_id = ($1)",[id]);
        res.json(todo.rows[0]);
    }
    catch (err){
        console.error(err.message);
    }
});

//Update A Todo
router.put("/todos/:id", async (req,res) => {
    try {  
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todoly SET description = ($1) WHERE todo_id = ($2)", [description,id]);
        res.json("Todo Was Updated.");
    }
    catch (err){
        console.error(err.message);
    }
});


//Delete A Todo
router.delete("/todos/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const todoDelete = await pool.query("DELETE FROM todoly where todo_id= ($1)",[id]);
        res.send(`Successfully Deleted The Value With ID: ${id}`);
    }
    catch(err){
        console.error(err.message);
    }
});

module.exports = router;