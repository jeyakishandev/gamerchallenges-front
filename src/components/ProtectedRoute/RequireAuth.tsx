
import { useLocation, Navigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import useAuthStore from "../../store";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const user = useAuthStore((state) => state.user); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecking(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (checking) {
    return (
      <div className="form-container">
        <div className="signup-form">
          <p className="paragraph-center">Vérification de la connexion...</p>
        </div>
      </div>
    );
  }

  // ✅ Si l'utilisateur n'est pas connecté, redirection
  if (!user) {
    return <Navigate to={`/connexion?redirect=${location.pathname}`} replace />;
  }

  // ✅ Sinon, on affiche le contenu protégé
  return children;
}
