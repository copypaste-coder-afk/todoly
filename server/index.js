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

//Get A Todo

//Update A Todo

//Delete A Todo




app.listen(5000,() =>{
    console.log(`Listening at port 5000`);
})
