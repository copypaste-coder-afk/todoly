import React, { Fragment, useState, useEffect } from 'react';
import reactLoader from 'react-loading';


const Register = ({setAuth}) => {

    const [inputs,setInputs] = useState({
        email: "",
        password:"",
        name:""
    })

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const {email,password,name} = inputs;
    useEffect(() => {
        
    })
    return (
        <Fragment>
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    <img src="https://telegra.ph/file/1edd0d60ac582f3587e1f.png" id="icon" alt="User Icon" />
                </div>
                    <form className="formFunctions">
                        <input type="email" id="email" className="fadeIn second" name="email" placeholder="Email" value={email} onChange = {(e) => onChange(e)}/>
                        <input type="password" id="password" className="fadeIn third" name="password" placeholder="Password" value={password} onChange = {(e) => onChange(e)}/>
                        <input type="text" id="name" className="fadeIn third" name="name" placeholder="Name" value={name} onChange = {(e) => onChange(e)}/>
                        <input type="submit" className="fadeIn fourth" value="Register" onClick={() => setAuth(true)}/>
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