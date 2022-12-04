import { Route, Routes } from "react-router-dom";
import RequireAuth from "../../hoc/RequireAuth";
import { Home } from "../../pages/home/Home";
import Lk from "../../pages/lk/Lk";
import Login from "../../pages/login/Login";
import Registration from "../../pages/registration/Registration";
import { routes } from "./routes.data";

import { FC } from "react";

const RoutesList: FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route element={<route.component />} path={route.href} />
      ))}

      <Route element={<Home />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<Registration />} path="/registration" />
      <Route
        element={
          <RequireAuth>
            <Lk />
          </RequireAuth>
        }
        path="/lk"
      />
    </Routes>
  );
};

export default RoutesList;
