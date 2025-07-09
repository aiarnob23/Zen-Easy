import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const authContext = useContext(AuthContext);

  const location = useLocation();

  if (!authContext) {
    console.error(
      "PrivateRoute: AuthContext is not available. Ensure AuthProvider wraps your application."
    );
    return <Navigate to={"/auth/login"} />;
  }

  const { user, loading } = authContext;

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "30px",
        }}
      >
        <span className="loading loading-bars loading-lg"></span>
        <p className="primary font-semibold">Authenticating...</p>
      </div>
    );
  }
  if (!authContext) {
    return <Navigate to={"/auth/login"} />;
  }

  if (user) {
    return children;
  }
  return <Navigate state={{ from: location.pathname }} to={"/auth/login"} />;
};

export default PrivateRoute;
