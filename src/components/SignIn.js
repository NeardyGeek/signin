import React, { useCallback, useContext } from "react";
import {
    Link
} from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import app from "../base";
import { AuthContext } from "../Auth";
import "./Form.css";

const SignIn = ({ history }) => {
    const handleSignIn = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/", "/transaction");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            
            <form onSubmit={handleSignIn}>
            <h1>Sign in</h1>
                <label>
                    Email
          <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password
          <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Sign in</button>
                <Link to = "/register">Don't have account? Click here to register</Link>
            </form>
            
        </div>
    );
};

export default withRouter(SignIn);