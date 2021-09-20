import React, {Fragment, useState} from 'react';

const EditTodo = ({todo}) => {
    const [todoDescription, setTodoDescription] = useState(todo.description);
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = {todoDescription};
            const response = await fetch (`http://localhost:5000/todos/${todo.todo_id}`,{
                method: "PUT",
                headers: {"Content-Type": "application-json"},
                body: JSON.stringify(body)
            })

            window.location = "/"
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
    
    <Fragment>
        
    <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
    Edit
    </button>


    <div className="modal" id={`id${todo.todo_id}`} onClick={e => {setTodoDescription(todo.description)}}>
        <div className="modal-dialog">
            <div className="modal-content">

      
            <div className="modal-header">
                <h4 className="modal-title">Edit This Todo</h4>
                <button type="button" className="close" data-dismiss="modal" onClick={e => {setTodoDescription(todo.description)}}>&times;</button>
            </div>


            <div className="modal-body">
            <input  type="text" className="form-control" value={todoDescription} onChange={e => setTodoDescription(e.target.value)}></input>
            </div>
      
            <div className="modal-footer">
                <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => updateDescription(e)}>Edit</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={e => {setTodoDescription(todo.description)}}>Close</button>
            </div>

            </div>
        </div>
    </div>
    </Fragment>);
}

export default EditTodo;