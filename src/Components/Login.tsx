import React, { useState, useContext } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./Login.css";
import { observer } from "mobx-react";
import { AuthenticatedStoreContext } from "../Stores/AuthenticatedStore";
import { useHistory } from "react-router-dom";
import LoaderButton from "./LoaderButton";

export const Login = observer(() => {
  const history = useHistory();
  const authenticatedStore = useContext(AuthenticatedStoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      authenticatedStore.authenticated = true;
      history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <LoaderButton block type="submit" bsSize="large" isLoading={isLoading} disabled={!validateForm()}>
            Login
        </LoaderButton>
      </form>
    </div>
  );
});