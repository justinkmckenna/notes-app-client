import React, { useState, useContext } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./Login.css";
import { observer } from "mobx-react";
import { AuthenticatedStoreContext } from "../Stores/AuthenticatedStore";
import { useHistory } from "react-router-dom";
import LoaderButton from "./LoaderButton";
import { onError } from "../Libs/errorLib";
import { useFormFields } from "../Libs/hooksLib";

export const Login = observer(() => {
  const history = useHistory();
  const authenticatedStore = useContext(AuthenticatedStoreContext);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      authenticatedStore.authenticated = true;
      history.push("/");
    } catch (e) {
      onError(e);
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
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={fields.password}
            onChange={handleFieldChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton block type="submit" bssize="large" isLoading={isLoading} disabled={!validateForm()}>
            Login
        </LoaderButton>
      </form>
      <a href="/signup">Create an account</a>
    </div>
  );
});