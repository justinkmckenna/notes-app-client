import { observable } from "mobx"
import { createContext } from "react"

class AuthenticatedStore {
    @observable authenticated = false;
}

export const AuthenticatedStoreContext = createContext(new AuthenticatedStore());