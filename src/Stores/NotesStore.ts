import { observable, action } from "mobx"
import { createContext } from "react"
import { API } from "aws-amplify";

class NotesStore {
    @observable notes: null | any[] = [];

    @action async getNotes() {
        let newNotes = await API.get("notes", "/notes", {});
        newNotes.sort((a, b) => b.createdAt - a.createdAt)
        this.notes = newNotes;
      }
}

export const NotesStoreContext = createContext(new NotesStore());