import { observable, action } from "mobx"
import { createContext } from "react"
import { Auth } from "aws-amplify";

class AuthenticatedStore {
    @observable authenticated = false;
    @observable userEmail = "";

    @action async setAuthenticatedUser() {
        this.authenticated = true;
        Auth.currentAuthenticatedUser().then((user) => {
            this.userEmail = user.attributes.email;
        });
    }
}

export const AuthenticatedStoreContext = createContext(new AuthenticatedStore());