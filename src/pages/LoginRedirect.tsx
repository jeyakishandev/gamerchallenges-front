import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../store/index"; 

export default function LoginRedirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");

  const login = useAuthStore((state) => state.login); // 👈 login depuis Zustand

  // Fonction exécutée lors de la soumission du formulaire de connexion
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const email = form.user.value;
    const password = form.password.value;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Identifiants incorrects.");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); 


      // 🔐 Stockage en mémoire avec Zustand
      login(data.token, data.user || data); // data.user selon retour du backend

      // Redirection vers la page demandée ou vers le profil
      const redirect = searchParams.get("redirect") || `/profile/${data.user?.id || data.user_id || data.id}`;
      navigate(redirect);
    } catch (err) {
      console.error(err);
      setError("Erreur réseau.");
    }
  };

  return (
    <div className="form-container">
      <p className="paragraph-center">Connexion requise</p>

      <section className="login-form">
        <p className="paragraph-center">Connexion</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="user" placeholder="Email ou pseudo" required />
          <input type="password" name="password" placeholder="Mot de passe" required minLength={8} />
          <div className="align-button">
            <button className="default-button form-button login-button" type="submit">
              Se connecter
            </button>
          </div>
        </form>

        {error && <p className="error-message">{error}</p>}
      </section>
    </div>
  );
}
