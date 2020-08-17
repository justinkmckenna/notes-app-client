import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import { AuthenticatedStoreContext } from "./Stores/AuthenticatedStore";
import { observer } from "mobx-react";
import { Auth } from "aws-amplify";
import Routes from "./Routes";
import { Nav } from "./Components/Nav";
import ErrorBoundary from "./Components/ErrorBoundary";
import { tieLogsToUser } from "./Libs/errorLib";

const App = observer(() => {
  const authenticatedStore = useContext(AuthenticatedStoreContext);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentSession();
        authenticatedStore.setAuthenticatedUser();
        tieLogsToUser();
      }
      catch (e) {
        if (e !== 'No current user') {
          alert(e);
        }
      }
  
      setIsAuthenticating(false);
    }
    
    onLoad();
  }, []);

  return (
    <ErrorBoundary>
      <div className="App container">
      <Nav />
      {!isAuthenticating && <Routes />}
    </div>
    </ErrorBoundary>
  )
})

export default App;