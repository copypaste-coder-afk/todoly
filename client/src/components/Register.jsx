import React, { Fragment, useState, useEffect } from 'react';
import reactLoader from 'react-loading';


const Register = ({setAuth}) => {

    const [inputs,setInputs] = useState({
        name:"",
        email: "",
        password:"",
        security_question: "",
        answer: ""
    })

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmitForm = async (e) => {
        try {
            e.preventDefault();
            const body = {name, email, password, security_question, answer}
            const bodyFile = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
            }
            const response = await fetch ("http://localhost:5000/auth/register",bodyFile)
            const parseRes = await response.json();
            localStorage.setItem("token",parseRes.token);
            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    }

    //! Inputs Are Here
    const {name, email,password,security_question, answer} = inputs;
    
    
    useEffect(() => {
        
    })
    return (
        <Fragment>
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    <img src="https://telegra.ph/file/1edd0d60ac582f3587e1f.png" id="icon" alt="User Icon" />
                </div>
                    <form className="formFunctions" onSubmit={onSubmitForm}>
                        <input type="text" id="name" className="fadeIn third" name="name" placeholder="Name" value={name} onChange = {(e) => onChange(e)}/>
                        <input type="email" id="email" className="fadeIn second" name="email" placeholder="Email" value={email} onChange = {(e) => onChange(e)}/>
                        <input type="password" id="password" className="fadeIn third" name="password" placeholder="Password" value={password} onChange = {(e) => onChange(e)}/>
                        <input type="text" id="security_question" className="fadeIn third" name="security_question" placeholder="Security Question" value={security_question} onChange = {(e) => onChange(e)}/>
                        <input type="text" id="answer" className="fadeIn third" name="answer" placeholder="Answer" value={answer} onChange = {(e) => onChange(e)}/>
                        <button type="submit" className="fadeIn fourth">Register</button>
                    </form>
                <div id="formFooter">
                    <a className="underlineHover" href="http://localhost:3000/forgotpassword">Forgot Password?</a>
                </div>
            </div>
        </div>
    </Fragment>
    )
}

export default Register;