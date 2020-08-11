import * as React from "react";
import "./Nav.css";
import { AuthenticatedStoreContext } from "../Stores/AuthenticatedStore";
import { LinkContainer } from "react-router-bootstrap";
import { observer } from "mobx-react";
import { useContext } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

// FIX MENU ON MOBILE

export const Nav = observer(() => {
    const history = useHistory();
    const authenticatedStore = useContext(AuthenticatedStoreContext);

    const logout = () => {
        Auth.signOut();
        authenticatedStore.authenticated = false;
        history.push("/login");
      }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Notes Notifications</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <LinkContainer to="/">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                    </LinkContainer>
                    {!authenticatedStore.authenticated ? (
                        <LinkContainer to="/login">
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Log In</a>
                            </li>
                        </LinkContainer>
                    ) : (
                            <li className="nav-item">
                                <a className="nav-link" onClick={logout}>Log Out</a>
                            </li>
                        )}
                </ul>
            </div>
        </nav>
    );
});