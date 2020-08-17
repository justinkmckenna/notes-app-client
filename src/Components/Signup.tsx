import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../Libs/hooksLib";
import { onError } from "../Libs/errorLib";
import "./Signup.css";
import { AuthenticatedStoreContext } from "../Stores/AuthenticatedStore";
import { Auth } from "aws-amplify";

export default function Signup() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
    });
    const history = useHistory();
    const [newUser, setNewUser] = useState({});
    const authenticatedStore = useContext(AuthenticatedStoreContext);
    const [isLoading, setIsLoading] = useState(false);
    const [resentCode, setResentCode] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
      
        setIsLoading(true);
      
        try {
          const newUser = await Auth.signUp({
            username: fields.email,
            password: fields.password,
          });
          setIsLoading(false);
          setNewUser(newUser);
        } catch (e) {
          onError(e);
          setIsLoading(false);
        }
      }
      
      async function handleConfirmationSubmit(event: any) {
        event.preventDefault();
      
        setIsLoading(true);
      
        try {
          await Auth.confirmSignUp(fields.email, fields.confirmationCode);
          await Auth.signIn(fields.email, fields.password);
      
          authenticatedStore.authenticated = true;
          history.push("/");
        } catch (e) {
          onError(e);
          setIsLoading(false);
        }
      }

      async function resendConfirmationCode() {
          try {
            await Auth.resendSignUp(fields.email);
            setResentCode(true);
          } catch (e) {
              onError(e);
          }
      }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode">
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        onChange={handleFieldChange}
                        value={fields.confirmationCode}
                    />
                    <small className="form-text text-muted help-text">
                        Please check your email for the code.
                    </small>
                    <small className="form-text help-text resendCodeText" onClick={resendConfirmationCode}>
                        { resentCode ? <p>Code Resent.</p> : <p className="clickable">Resend Code.</p>}
                    </small>
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bssize="large"
                    isLoading={isLoading}
                    disabled={!validateConfirmationForm()}
                >
                    Verify
        </LoaderButton>
            </form>
        );
    }

    function renderForm() {
        return (
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
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        value={fields.confirmPassword}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bssize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Signup
        </LoaderButton>
            </form>
        );
    }

    return (
        <div className="Signup">
            {Object.keys(newUser).length === 0 ? renderForm() : renderConfirmationForm()}
        </div>
    );
}