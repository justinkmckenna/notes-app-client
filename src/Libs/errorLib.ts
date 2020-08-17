import LogRocket from "logrocket";
import config from '../config';
import { Auth } from "aws-amplify";

export function tieLogsToUser() {
  if (config.env === "prod") {
    Auth.currentAuthenticatedUser().then((user) => {
      LogRocket.identify(user.username, {
        name: user.attributes.email,
        email: user.attributes.email,
      });
    })
  }
}

export function logError(error) {
  if (config.env === "dev") {
    return;
  }
  LogRocket.log(error);
}

export function onError(error: any) {
    logError(error);
    let message = error.toString();
  
    // Auth errors
    if (!(error instanceof Error) && error.message) {
      message = error.message;
    }
  
    alert(message);
  }