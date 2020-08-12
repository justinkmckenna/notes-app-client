import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import { AuthenticatedStoreContext } from "./Stores/AuthenticatedStore";
import { observer } from "mobx-react";
import { Auth } from "aws-amplify";
import Routes from "./Routes";
import { Nav } from "./Components/Nav";

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
      <Nav />
      {!isAuthenticating && <Routes />}
    </div>
  )
})

export default App;