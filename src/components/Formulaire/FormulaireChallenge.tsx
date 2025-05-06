
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategory, IDifficulty } from "../../@types";

// Props optionnelles : une fonction à appeler après soumission du formulaire
interface Props {
  onFormSubmit?: () => void;
}

function FormulaireChallenge({ onFormSubmit }: Props) {
  const navigate = useNavigate();

  // États pour stocker les catégories, difficultés et erreurs éventuelles
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [difficulties, setDifficulties] = useState<IDifficulty[]>([]);
  const [error, setError] = useState<string>("");

  // État pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    video_url: "",
    category_id: "",
    difficulty_id: "",
  });

  // Récupère les catégories et difficultés depuis le back au chargement du composant
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Catégories non valides :", data);
          setCategories([]);
        }
      })
      .catch((err) => {
        console.error("Erreur fetch catégories :", err);
        setCategories([]);
      });

    fetch("http://localhost:3000/difficulties")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDifficulties(data);
        } else {
          console.error("Difficultés non valides :", data);
          setDifficulties([]);
        }
      })
      .catch((err) => {
        console.error("Erreur fetch difficultés :", err);
        setDifficulties([]);
      });
  }, []);

  // Gère le changement de valeur dans les champs du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envoie du formulaire à la base de données
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("Utilisateur non connecté.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, user_id: Number(userId) }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Erreur lors de l'envoi.");
      }

      const newChallenge = await response.json();
      console.log("Challenge créé :", newChallenge);

      if (onFormSubmit) onFormSubmit();
      navigate(`/challenges/${newChallenge.id}`);

    } catch (err: any) {
      setError(err.message);
    }
  };

  // Rendu du formulaire de création de challenge
  return (
    <section className="formulaire-section">
      <div className="form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Créer un Challenge</h1>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Titre"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="video_url"
            placeholder="URL de la vidéo"
            value={formData.video_url}
            onChange={handleChange}
            required
          />

          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner une catégorie --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select
            name="difficulty_id"
            value={formData.difficulty_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner une difficulté --</option>
            {difficulties.map((diff) => (
              <option key={diff.id} value={diff.id}>{diff.name}</option>
            ))}
          </select>

          <button type="submit" className="default-button form-button">
            Valider
          </button>
        </form>
      </div>
    </section>
  );
}

export default FormulaireChallenge;
