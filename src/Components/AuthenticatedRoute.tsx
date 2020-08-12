import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticatedStoreContext } from "../Stores/AuthenticatedStore";

export default function AuthenticatedRoute({ children, ...rest }) {
  const authenticatedStore = useContext(AuthenticatedStoreContext);
  return (
    <Route {...rest}>
      {authenticatedStore.authenticated ? (
        children
      ) : (
        <Redirect to={
          '/login'
        } />
      )}
    </Route>
  );
}