import React from "react";
import "./Notes.css";
import { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react";
import { AuthenticatedStoreContext } from "../Stores/AuthenticatedStore";
import { useFormFields } from "../Libs/hooksLib";
import { onError } from "../Libs/errorLib";
import { API } from "aws-amplify";
import LoaderButton from "./LoaderButton";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditableLabel from 'react-inline-editing';
import { NotesStoreContext } from "../Stores/NotesStore";

export const Notes = observer(() => {
    const authenticatedStore = useContext(AuthenticatedStoreContext);
    const notesStore = useContext(NotesStoreContext);
    const [fields, handleFieldChange] = useFormFields({
        newNote: "",
    });
    const [editableNote, setEditableNote] = useState<null | any>(null);

    useEffect(() => {
        async function onLoad() {
            if (!authenticatedStore.authenticated) {
                return;
            }

            try {
                notesStore.getNotes();
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [authenticatedStore.authenticated]);

    function validateForm() {
        return fields.newNote.length > 0;
    }

    function noteExists(note: string) {
        return notesStore.notes?.some(n => n.content === note);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        try {
            if (noteExists(fields.newNote)) throw Error('Note already exists.');
            await createNote(fields.newNote);
            fields.newNote = "";
            notesStore.currentPage = 1;
            notesStore.getNotes();
        } catch (e) {
            onError(e);
        }
    }

    function createNote(noteContent: string) {
        return API.post("notes", "/notes", {
            body: { "content": noteContent }
        });
    }

    const deleteNote = (noteId: string) => async (event: any) => {
        try {
            await API.del("notes", `/notes/${noteId}`, {});
            notesStore.getNotes();
        } catch (e) {
            onError(e);
        }
    }

    function handleFocus(text) {
        const index = notesStore.notes!.findIndex(n => n.content === text);
        setEditableNote(notesStore.notes![index]);
    }

    async function handleFocusOut(text) {
        editableNote.content = text;
        try {
            await API.put("notes", `/notes/${editableNote.noteId}`, {
                body: editableNote
            });
            notesStore.getNotes();
        } catch (e) {
            onError(e);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id="newNote" placeholder="Enter a new note" 
                    value={fields.newNote} onChange={handleFieldChange} />
                </div>
                <LoaderButton block type="submit" bssize="large" disabled={!validateForm()} >
                    Add Note
                </LoaderButton>
            </form>
            <ul className="list-group notes-list">
                {notesStore.currentNotes &&
                    <div>
                        {notesStore.currentNotes!.map(note => (
                            <div className="noteWrapper" key={note.noteId}>
                                <FontAwesomeIcon className="delete" icon={faTimesCircle} onClick={deleteNote(note.noteId)} />
                                <li className="list-group-item">
                                    <EditableLabel
                                        text={note.content}
                                        onFocus={handleFocus}
                                        onFocusOut={handleFocusOut}
                                    />
                                </li>
                            </div>
                        ))}
                    </div>}
            </ul>
        </div>
    );
})