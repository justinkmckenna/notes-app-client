import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./Components/Home";
import AuthenticatedRoute from "./Components/AuthenticatedRoute";
import UnauthenticatedRoute from "./Components/UnauthenticatedRoute";
import { Login } from "./Components/Login";
import Signup from "./Components/Signup";
import { NotFound } from "./Components/NotFound";

export default function Routes() {
    return (
        <Switch>
            <AuthenticatedRoute exact path="/">
                <Home />
            </AuthenticatedRoute>
            <UnauthenticatedRoute exact path="/login">
                <Login />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path="/signup">
                <Signup />
            </UnauthenticatedRoute>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}