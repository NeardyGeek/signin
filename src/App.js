import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import Transaction from "./components/Transaction";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Portfolio} />
          <PrivateRoute exact path="/transaction" component={Transaction} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;