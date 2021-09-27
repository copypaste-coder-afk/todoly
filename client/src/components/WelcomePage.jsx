import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const welcomePage = () => {
    return (
        <Fragment>
            <div class="wrapper fadeInDown formAdjustmentWelcomePage">
                <div id="formContent">
                <div className="fadeIn first">
                    <img src="https://telegra.ph/file/1edd0d60ac582f3587e1f.png" id="icon" alt="User Icon" />
                </div>
                    <div className="formFunctions">
                            <button onClick={() => window.location.href="http://localhost:3000/login"}>Login</button>  
                        <button onClick={() => window.location.href="http://localhost:3000/register"}>Register</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default welcomePage;
