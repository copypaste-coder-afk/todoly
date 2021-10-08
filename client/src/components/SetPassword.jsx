import React, { Fragment, useState } from 'react';

 const SetPassword = () => {
    const [inputs,setInputs] = useState({
        password: "",
        confirm_password: "",
    })
    

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmitForm = async (e) => {
        try {
            e.preventDefault();
            if (password === confirm_password)
            {
                const body = {password,
                email:localStorage.email}
                console.log(body);
                const bodyFile = {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
                }
                const response = await fetch ("http://localhost:5000/setpassword",bodyFile)
                const parseRes = await response.json();
                console.log(parseRes);
            }
            else{
                throw Error (`Password does not match`);
            }
            
        } catch (err) {
            console.error(err);
        }
    }

    const {password,confirm_password} = inputs;

    return (
        <Fragment>
            <div className="wrapper fadeInDown formAdjustmentLoginPage">
                <div id="formContent">
                <div className="fadeIn first">
                    <img src="https://telegra.ph/file/1edd0d60ac582f3587e1f.png" id="icon" alt="User Icon" />
                </div>
                        <form className="formFunctions" onSubmit={onSubmitForm}>
                        <input type="password" id="password" className="fadeIn second" name="password" placeholder="Password" value={password} onChange = {(e) => onChange(e)}/>
                        <input type="password" id="confirm_password" className="fadeIn second" name="confirm_password" placeholder="Confirm Password" value={confirm_password} onChange = {(e) => onChange(e)}/>
                            <button type="submit" className="fadeIn fourth">Submit</button>
                        </form>
                </div>
            </div>
        </Fragment>
    )
}

export default SetPassword;