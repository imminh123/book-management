import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/user.context";

type ProtectedRouteProps = {
  children: React.ReactNode; // 👈️ type children
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, setUser } = useContext(UserContext);
  const isAuth = !!user.userId;

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return <>{children}</>;
};
