import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormulaireChallenge from "../components/Formulaire/FormulaireChallenge";

export default function Creation() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userId");


    if (token) {
      setIsAuth(true);
    } else {
      navigate("/connexion?redirect=/creation");
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (!isAuth) {
    return null; // ou un fallback visuel
  }

  return (
    <main>
      <h1>Créer un challenge</h1>
      <FormulaireChallenge onFormSubmit={() => navigate("/")} />
    </main>
  );
}


