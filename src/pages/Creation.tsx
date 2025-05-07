import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormulaireChallenge from "../components/Formulaire/FormulaireChallenge";
import useAuthStore from "../store";

export default function Creation() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/connexion?redirect=/creation");
    } else {
      setChecking(false);
    }
  }, [user]);

  if (checking) return <p className="paragraph-center">Chargement...</p>;

  return (
    <main className="formulaire-section">
      
      <FormulaireChallenge onFormSubmit={() => navigate("/")} />
    </main>
  );
}

