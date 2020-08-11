import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react";
import "./Home.css";
import { AuthenticatedStoreContext } from "../Stores/AuthenticatedStore";
import { useFormFields } from "../Libs/hooksLib";
import { onError } from "../Libs/errorLib";
import { API } from "aws-amplify";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";
import LoaderButton from "./LoaderButton";

// ADD PAGINATION TO NOTES

export const Home = observer(() => {
  const authenticatedStore = useContext(AuthenticatedStoreContext);
  const [fields, handleFieldChange] = useFormFields({
    newNote: "",
  });
  const [notes, setNotes] = useState<null | any[]>(null);

  useEffect(() => {
    async function onLoad() {
      if (!authenticatedStore.authenticated) {
        return;
      }
  
      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }
    }
  
    onLoad();
  }, [authenticatedStore.authenticated]);
  
  function loadNotes() {
    return API.get("notes", "/notes", {});
  }

  function validateForm() {
    return fields.newNote.length > 0; // and newNote doesn't already exist
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
        await createNote(fields.newNote);
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }
  }

  function createNote(note: string) {
    return API.post("notes", "/notes", {
      body: {"content": note}
    });
  }

  return (
    <div className="Home">
      <div className="lander">
        <h1>Notes Notifications</h1>
        <p>Send Custom Notes To Yourself Daily</p>
      </div>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="newNote">
          <FormLabel>New Note</FormLabel>
          <FormControl
            autoFocus
            type="input"
            value={fields.newNote}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <LoaderButton block type="submit" bssize="large" disabled={!validateForm()}>
            Add Note
        </LoaderButton>
      </form>
      <ul className="list-group notes-list">
        {notes &&
          <div>
            {notes!.map(note => (
              <li className="list-group-item" key={note.noteId}>
                {note.content}
              </li>
            ))}
          </div>}
      </ul>
    </div>
  );
});