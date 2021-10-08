import React, { Fragment, useState } from 'react';

 const ForgetPassword = () => {
    const [inputs,setInputs] = useState({
        answer: "",
    })
    

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmitForm = async (e) => {
        try {
            e.preventDefault();
            const body = {question: localStorage.question}
            const bodyFile = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
            }
            const response = await fetch ("http://localhost:5000/forgetpassword",bodyFile)
            const parseRes = await response.json();
            if (answer === parseRes)
            {
                localStorage.removeItem("question");
                window.location = "/setpassword"
            }
            else
            {
                console.log("Wrong Answer, Try Again")
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const {answer} = inputs;

    return (
        <Fragment>
            <div className="wrapper fadeInDown formAdjustmentLoginPage">
                <div id="formContent">
                <div className="fadeIn first">
                    <img src="https://telegra.ph/file/1edd0d60ac582f3587e1f.png" id="icon" alt="User Icon" />
                </div>
                        <form className="formFunctions" onSubmit={onSubmitForm}>
                        <h1>{localStorage.question}</h1>
                        <input type="text" id="text" className="fadeIn second" name="answer" placeholder="Answer" value={answer} onChange = {(e) => onChange(e)}/>
                            <button type="submit" className="fadeIn fourth">Submit</button>
                        </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgetPassword;
