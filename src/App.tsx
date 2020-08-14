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

  function registerServiceWorker() {
    if (Notification.permission == 'granted') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function(error) {
          console.log('Service worker registration failed, error:', error);
        });
      }
    }
  }

  function displayTestNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        reg!.showNotification('Hello world!');
      });
    }
  }

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      authenticatedStore.authenticated = true;
      Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
      });
      registerServiceWorker();
      displayTestNotification();
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