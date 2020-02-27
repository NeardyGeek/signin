import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../base";
import "./Form.css";
import {
  Link
} from "react-router-dom";

const db = app.firestore();



const Register = ({ history }) => {
  const handleRegister = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value).then(result => {

            result.user.updateProfile({
                displayName: document.getElementById("name").value
            })
            
            return result;

        }).then(res =>{
           db.collection("users").doc(res.user.uid).set({
             balence: 5000
           })
        })

    

      history.push("/");

    } catch (error) {
      alert(error);
    }
  }, [history]);


  
  return (
    <div>
      
      <form onSubmit={handleRegister}>
      <h1>Register</h1>
        <label>
          Name
          <input id="name" type="text" placeholder="Name" />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Register</button>
        <Link to = "/signin">Have an account? Click here to start!</Link>
        
      </form>
    </div>
  );
};

export default withRouter(Register);
