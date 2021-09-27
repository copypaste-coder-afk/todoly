import React, { Fragment } from 'react';

const Login = ({setAuth}) => {
    return (
        <Fragment>
            <div class="wrapper fadeInDown formAdjustmentLoginPage">
                <div id="formContent">
                <div className="fadeIn first">
                    <img src="https://telegra.ph/file/1edd0d60ac582f3587e1f.png" id="icon" alt="User Icon" />
                </div>
                        <form class="formFunctions">
                            <input type="text" id="login" class="fadeIn second" name="login" placeholder="Login"/>
                            <input type="password" id="password" class="fadeIn third" name="password" placeholder="Password"/>
                            <input type="submit" class="fadeIn fourth" value="Log In" onClick={() => setAuth(true)}/>
                        </form>
                    <div id="formFooter">
                        <a class="underlineHover" href="http://localhost:3000/forgotpassword">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;
