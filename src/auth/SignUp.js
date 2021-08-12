import React, {useCallback} from "react";
import {withRouter} from "react-router";
import app from "../context/firebase/base";


export const SignUp = ({history}) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div id="login">
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" action="" method="post" onSubmit={handleSignUp}>
                                <h3 className="text-center text-secondary">Sign up</h3>
                                <div className="form-group">
                                    <label htmlFor="email" className="text-secondary m-2">Email:</label><br/>
                                    <input type="email" name="email" id="email" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-secondary m-2">Password:</label><br/>
                                    <input type="password" name="password" id="password" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="remember-me"
                                           className="text-secondary m-2"><span>Remember me &nbsp;</span>
                                        <span><input id="remember-me" name="remember-me" type="checkbox"/>
                                                </span></label><br/>
                                    <input type="submit" name="Submit" className="btn btn-success btn-md m-1"
                                           value="Submit"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SignUp);