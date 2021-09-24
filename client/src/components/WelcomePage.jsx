import React, { Fragment } from 'react';

const welcomePage = () => {
    return (
        <Fragment>
            <div class="wrapper fadeInDown">
                <div id="formContent">
                        <form class="formFunctions">
                            <input type="text" id="login" class="fadeIn second" name="login" placeholder="Login"/>
                            <input type="password" id="password" class="fadeIn third" name="login" placeholder="Password"/>
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

export default welcomePage;
