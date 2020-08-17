import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react";
import "./Home.css";
import { AuthenticatedStoreContext } from "../Stores/AuthenticatedStore";
import { onError } from "../Libs/errorLib";
import Pagination from "react-js-pagination";
import { NotesStoreContext } from "../Stores/NotesStore";
import { Notes } from "./Notes";

export const Home = observer(() => {
  const authenticatedStore = useContext(AuthenticatedStoreContext);
  const notesStore = useContext(NotesStoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(10);

  // Get current posts
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notesStore.notes!.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = pageNumber => setCurrentPage(pageNumber);

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

  function handlePageChange() {
    console.log('ah');
  }

  return (
    <div className="Home">
      <div className="lander">
        <h1>Notes Notifications</h1>
        <p>Send Custom Notes To Yourself Daily</p>
      </div>
      <Notes />
      <Pagination
          activePage={1}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
    </div>
  );
});