import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Nav } from "./Components/Nav";
import { NotFound } from "./Components/NotFound";
import { AuthenticatedStoreContext } from "./Stores/AuthenticatedStore";
import { observer } from "mobx-react";
import { Auth } from "aws-amplify";

const App = observer(() => {
  const authenticatedStore = useContext(AuthenticatedStoreContext);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      authenticatedStore.authenticated = true;
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  return (
    <div className="App container">
      {!isAuthenticating &&
        <BrowserRouter>
          <Nav/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>}
    </div>
  );
})

export default App;