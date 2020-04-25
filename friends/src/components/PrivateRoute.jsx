import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {
    return (
        <Route
            {...props}
            render={() =>
                localStorage.getItem("token") ? (
                    <Component />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
