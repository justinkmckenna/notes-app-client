import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import { AuthenticatedStoreContext } from "./Stores/AuthenticatedStore";
import { observer } from "mobx-react";
import { Auth } from "aws-amplify";
import Routes from "./Routes";
import { Nav } from "./Components/Nav";
import LogRocket from "logrocket";
import config from './config';
import ErrorBoundary from "./Components/ErrorBoundary";

const App = observer(() => {
  const authenticatedStore = useContext(AuthenticatedStoreContext);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  function displayNotification() {
    if (Notification.permission == 'granted' && config.env == "prod") {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: 'Here is a notification body!',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg!.showNotification('Hello world!', options);
      });
    }
  }
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      authenticatedStore.authenticated = true;
      Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
      });
      displayNotification();
      if (config.env === "prod") {
        Auth.currentAuthenticatedUser().then((user) => {
          LogRocket.identify(user.username, {
            name: user.attributes.email,
            email: user.attributes.email,
          });
        })
      }
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

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