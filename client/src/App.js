import './App.css'
import InputTodo from './components/InputTodo.jsx'
import ListTodos from './components/ListTodo.jsx'
import React, { Fragment } from 'react'
function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  )
}

export default App
