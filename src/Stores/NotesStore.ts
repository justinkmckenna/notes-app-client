import { observable, action } from "mobx"
import { createContext } from "react"
import { API } from "aws-amplify";

class NotesStore {
    @observable notes: null | any[] = [];
    @observable currentNotes: null | any[] = [];
    @observable currentPage: number = 1;
    @observable notesPerPage: number = 10;

    @action async getNotes() {
        let newNotes = await API.get("notes", "/notes", {});
        newNotes.sort((a, b) => b.createdAt - a.createdAt)
        this.notes = newNotes;
        this.getCurrentNotes();
      }

      @action getCurrentNotes() {
        const indexOfLastNote = this.currentPage * this.notesPerPage;
        const indexOfFirstNote = indexOfLastNote - this.notesPerPage;
        this.currentNotes = this.notes!.slice(indexOfFirstNote, indexOfLastNote);
      }
}

export const NotesStoreContext = createContext(new NotesStore());