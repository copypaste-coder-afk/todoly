import React, { Fragment, useState } from 'react'

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const bodyFile = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(body)
      }
      const response = await fetch("http://localhost:5000/todos",bodyFile);
      console.log(response);
      window.location = "/todos";
    } catch (err) {
      console.error(err.message)
    }
  }
  return (
    <Fragment>
      <h1 className="text-center my-5">Todo App</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm} >
        <input
          type="text"
          placeholder="Make a todo task"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};
export default InputTodo;
