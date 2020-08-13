import LogRocket from "logrocket";
import config from '../config';

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