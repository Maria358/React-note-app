import React, {useCallback, useContext} from "react";
import {withRouter, Redirect} from "react-router";
import {AuthContext} from "./AuthProvider";
import app from "../context/firebase/base";


export const SignIn = ({history}) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                console.log('yes')
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/"/>;
    }

    return (
        <div id="login">
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" action="" method="post" onSubmit={handleLogin}>
                                <h3 className="text-center text-secondary">Sign in</h3>
                                <div className="form-group">
                                    <label htmlFor="email" className="text-secondary m-2">Email:</label><br/>
                                    <input type="email" name="email" id="email" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-secondary m-2">Password:</label><br/>
                                    <input type="password" name="password" id="password" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="remember-me" className="text-secondary m-2"><span>Remember me &nbsp;</span>
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

export default withRouter(SignIn);