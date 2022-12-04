import { useUnit } from "effector-react";
import { useLocation, Navigate } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { $isAuth, $loadingUserData } from "../effector/user/authorization";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isAuth = useUnit($isAuth);

  const loading = useUnit($loadingUserData);

  if (loading) {
    return (
      <div style={{ height: "100vh" }}>
        <Loader />;
      </div>
    );
  }

  // if (isAuth && !loading) {
  if (true) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RequireAuth;
