import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Friends from "./components/Friends";

function App() {
    return (
        <div className="App">
            <Switch>
                <PrivateRoute exact path="/friends" component={Friends} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    );
}

export default App;
