
import { useLocation, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import useAuthStore from "../../store";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user); 

  if (!user) {
    return <Navigate to={`/connexion?redirect=${location.pathname}`} replace />;
  }

  return children;
}
