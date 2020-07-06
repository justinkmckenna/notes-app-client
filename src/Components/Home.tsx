import * as React from "react";
import { useContext } from "react";
import { observer } from "mobx-react";
import "../App.css";
import { AuthenticatedStoreContext } from "../Stores/AuthenticatedStore";

export const Home = observer(() => {
  const authenticatedStore = useContext(AuthenticatedStoreContext);

  return (
    <div className="Home">
      <div className="lander">
        <h1>Notes Notifications</h1>
        <p>Send Custom Notes To Yourself Daily</p>
      </div>
    </div>
  );
});