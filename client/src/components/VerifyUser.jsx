import React, {Fragment, useState} from 'react';
import { Redirect } from 'react-router';



 const VerifyUser = ({setAuth}) => {

    // let [con1, setcon1] = useState(false);

    const [inputs,setInputs] = useState({
        email: "",
    })
    

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmitForm = async (e) => {
        try {
            e.preventDefault();
            const body = {email}
            const bodyFile = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
            }
            const response = await fetch ("http://localhost:5000/forgetpassword/verifyuser",bodyFile)
            const parseRes = await response.json();
            localStorage.removeItem("question");
            localStorage.removeItem("email");
            localStorage.setItem("question",parseRes);
            localStorage.setItem("email",email);
            window.location = "/forgetpassword"
        } catch (err) {
            console.error(err.message);
        }
    }

    const {email} = inputs;

    return (
        <Fragment>
            <div className="wrapper fadeInDown formAdjustmentLoginPage">
                <div id="formContent">
                <div className="fadeIn first">
                    <img src="https://telegra.ph/file/1edd0d60ac582f3587e1f.png" id="icon" alt="User Icon" />
                </div>
                        <form className="formFunctions" onSubmit={onSubmitForm}>
                        <input type="email" id="email" className="fadeIn second" name="email" placeholder="Email" value={email} onChange = {(e) => onChange(e)}/>
                            <button type="submit" className="fadeIn fourth">Submit</button>
                        </form>
                </div>
            </div>
        </Fragment>
    )
}
export default VerifyUser;