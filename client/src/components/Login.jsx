import React, { Fragment, useState } from 'react';

const Login = ({setAuth}) => {

    const [inputs,setInputs] = useState({
        email: "",
        password:""
    })

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmitForm = async (e) => {
        try {
            e.preventDefault();
            const body = {email, password}
            const bodyFile = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
            }
            const response = await fetch ("http://localhost:5000/auth/login",bodyFile)
            const parseRes = await response.json();
            localStorage.setItem("token",parseRes.token);
            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    }

    const {email,password} = inputs;

    return (
        <Fragment>
            <div className="wrapper fadeInDown formAdjustmentLoginPage">
                <div id="formContent">
                <div className="fadeIn first">
                    <img src="https://telegra.ph/file/1edd0d60ac582f3587e1f.png" id="icon" alt="User Icon" />
                </div>
                        <form className="formFunctions" onSubmit={onSubmitForm}>
                        <input type="email" id="email" className="fadeIn second" name="email" placeholder="Email" value={email} onChange = {(e) => onChange(e)}/>
                        <input type="password" id="password" className="fadeIn third" name="password" placeholder="Password" value={password} onChange = {(e) => onChange(e)}/>
                            <button type="submit" className="fadeIn fourth">Login</button>
                        </form>
                    <div id="formFooter">
                        <a className="underlineHover" href="http://localhost:3000/forgotpassword">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;
