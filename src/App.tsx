import React, { useEffect } from "react";
import { Routes } from "react-router-dom";
import RoutesList from "./components/routing/RoutesList";
import { checkAuthFx, userNotAuthorized } from "./effector/user/authorization";

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // @ts-ignore
      checkAuthFx();
    } else {
      userNotAuthorized();
    }
  }, []);

  return (
    <div>
      <RoutesList />
    </div>
  );
}

export default App;
