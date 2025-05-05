
import { useLocation, Navigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";

// Vérifie si un utilisateur est connecté en regardant le localStorage
function isUserConnected(): boolean {
  return !!localStorage.getItem("userId");
}

// Composant qui protège une route. Si l'utilisateur n'est pas connecté, il est redirigé.
export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  // Simule un délai pour vérifier la connexion (peut être utilisé pour une animation de chargement)
  useEffect(() => {
    const timer = setTimeout(() => {
      setChecking(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Pendant la vérification, on affiche un message de chargement
  if (checking) {
    return (
      <div className="form-container">
        <div className="signup-form">
          <p className="paragraph-center">Vérification de la connexion...</p>
        </div>
      </div>
    );
  }

  // Si non connecté, redirection vers la page de connexion avec redirection automatique après login
  if (!isUserConnected()) {
    return <Navigate to={`/connexion?redirect=${location.pathname}`} replace />;
  }

  // Si l'utilisateur est connecté, on affiche le contenu protégé
  return children;
}
