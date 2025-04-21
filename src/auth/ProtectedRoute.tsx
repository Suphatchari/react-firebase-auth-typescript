import Loading from "@components/Loading";
import { useUserAuth } from "@context/UserAuthContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useUserAuth();

  if (isLoading) {
    return <Loading text="Loading, please wait..." isFullPage />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
