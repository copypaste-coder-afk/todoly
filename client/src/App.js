import './App.css';
import InputTodo from './components/InputTodo.jsx';
import ListTodos from './components/ListTodo.jsx';
import React, { Fragment, useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import WelcomePage from './components/WelcomePage.jsx';


function App() {

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth", {
        method: "POST",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
      <div className="container2">
      {/* <InputTodo/>
      <ListTodos/> */}
        <Switch>
          { isAuthenticated === true &&
            <Route path='/todos' render={() =>  
            <Fragment> 
              <InputTodo setAuth = {setAuth}/>
              <ListTodos/>
            </Fragment>
          }/>}
          <Route exact path="/" render={props => <WelcomePage {...props}/>}/>
          <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth = {setAuth}/>  : <Redirect to="/todos"/>}/>
          <Route exact path="/register" render={props => !isAuthenticated ? <Register {...props} setAuth = {setAuth}/> : <Redirect to="/todos"/>}/>
        </Switch>
      </div>


      </Router>
      
    </Fragment>
  )
}

export default App
