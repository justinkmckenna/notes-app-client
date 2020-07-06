import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { NotFound } from "./Components/NotFound";

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Notes Notifications</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <LinkContainer to="/">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
              </LinkContainer>
              <LinkContainer to="/signup">
                <li className="nav-item">
                  <a className="nav-link" href="/signup">Sign Up</a>
                </li>
              </LinkContainer>
              <LinkContainer to="/login">
                <li className="nav-item">
                  <a className="nav-link" href="/login">Log In</a>
                </li>
              </LinkContainer>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;