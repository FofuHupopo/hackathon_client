import { Route, Routes } from "react-router-dom";
import { routes } from "./routes.data";

import { FC } from "react";

const RoutesList: FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route element={<route.component />} path={route.href} />
      ))}
    </Routes>
  );
};

export default RoutesList;
