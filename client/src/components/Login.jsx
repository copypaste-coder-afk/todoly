import React, { Fragment } from 'react';

const Login = ({setAuth}) => {
    return (
        <Fragment>
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    {/* <div class="fadeIn first">
                        <img src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-user-management-kiranshastry-lineal-color-kiranshastry-9.png " width="10" height="10" id="icon" alt="User Icon" />
                    </div> */}
                        <form class="formFunctions">
                            <input type="text" id="login" class="fadeIn second" name="login" placeholder="Login"/>
                            <input type="password" id="password" class="fadeIn third" name="password" placeholder="Password"/>
                            <input type="submit" class="fadeIn fourth" value="Log In"/>
                        </form>
                    <div id="formFooter">
                        <a class="underlineHover" href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;
