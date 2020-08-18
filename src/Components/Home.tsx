import * as React from "react";
import { useContext, useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!authenticatedStore.authenticated) {
        return;
      }

      try {
        notesStore.getNotes();
        setIsLoading(false);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [authenticatedStore.authenticated]);

  function handlePageChange(pageNumber: number) {
    notesStore.currentPage = pageNumber;
    notesStore.getCurrentNotes();
  }

  return (
    <div className="Home">
      <div className="lander">
        <h1>Notes Notifications</h1>
        <p>Send Custom Notes To Yourself Daily</p>
      </div>
      {!isLoading && <div>
        <Notes />
        <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={notesStore.currentPage}
            itemsCountPerPage={notesStore.notesPerPage}
            totalItemsCount={notesStore.notes!.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
      </div>}
    </div>
  );
});