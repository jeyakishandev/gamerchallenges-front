import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategory, IDifficulty } from "../@types";

interface Props {
  onFormSubmit?: () => void;
}

function FormulaireChallenge({ onFormSubmit }: Props) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [difficulties, setDifficulties] = useState<IDifficulty[]>([]);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    video_url: "",
    category_id: "",
    difficulty_id: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Données invalides reçues pour catégories :", data);
          setCategories([]); // fallback
        }
      })
      .catch((err) => {
        console.error("Erreur lors du fetch catégories :", err);
        setCategories([]);
      });
  
    fetch("http://localhost:3000/difficulties")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDifficulties(data);
        } else {
          console.error("Données invalides reçues pour difficultés :", data);
          setDifficulties([]);
        }
      })
      .catch((err) => {
        console.error("Erreur lors du fetch difficultés :", err);
        setDifficulties([]);
      });
  }, []);
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // ⚠️ Ajoute ici un user_id par défaut temporaire (ex : 1)
        body: JSON.stringify({ ...formData, user_id: 1 }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Erreur lors de l'envoi.");
      }

      console.log("Challenge créé avec succès.");
      if (onFormSubmit) onFormSubmit();
      navigate("/"); // Redirige vers la home

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="default-form-container default-form default-box-design">
      <form className="create-form " onSubmit={handleSubmit}>
        <p className="paragraph-center">Créer un Challenge</p>

        {error && <p style={{ color: "white", textAlign: "center", background: "red"}}>{error}</p>}

        <input
          type="text"
          className="form-input"
          name="name"
          placeholder="Titre"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          className="form-input textarea"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-input"
          name="video_url"
          placeholder="URL de la vidéo"
          value={formData.video_url}
          onChange={handleChange}
          required
        />

        <select
          name="category_id"
          className="form-input select"
          value={formData.category_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Sélectionner une catégorie --</option>
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>

        <select
          name="difficulty_id"
          className="form-input"
          value={formData.difficulty_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Sélectionner une difficulté --</option>
          {Array.isArray(difficulties) &&
            difficulties.map((diff) => (
              <option key={diff.id} value={diff.id}>
                {diff.name}
              </option>
            ))}
        </select>

        <button type="submit" className="default-button form-button">
          Valider
        </button>
      </form>
    </div>
  );
}

export default FormulaireChallenge;

