
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategory, IDifficulty } from "../@types";
import { updateChallenge } from "../api/index";

// Props optionnelles : une fonction à appeler après soumission du formulaire
interface Props {
  onFormSubmit?: () => void;
  challengeId?: number;
  defaultValues?: {
    name: string;
    description: string;
    video_url: string;
    category_id: number;
    difficulty_id: number;
  };
}

function FormulaireChallenge({ onFormSubmit, challengeId, defaultValues }: Props) {
  const navigate = useNavigate();

  // États pour stocker les catégories, difficultés et erreurs éventuelles
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [difficulties, setDifficulties] = useState<IDifficulty[]>([]);
  const [error, setError] = useState<string>("");

  // État pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    name: defaultValues?.name || "",
    description: defaultValues?.description || "",
    video_url: defaultValues?.video_url || "",
    category_id: defaultValues?.category_id?.toString() || "",
    difficulty_id: defaultValues?.difficulty_id?.toString() || "",
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
    const token = localStorage.getItem("token") || "";
    console.log(userId)
    console.log(token)

    if (!userId || !token) {
      setError("Tu dois être connecté pour modifier un challenge.");
      return;
    }

    const payload = {
      ...formData,
      user_id: Number(userId),
      category_id: Number(formData.category_id),
      difficulty_id: Number(formData.difficulty_id),
    };

    console.log("Payload envoyé :", payload);

    try {
      let responseData;

      if (challengeId) {
        // MODE MODIFICATION → PUT
        responseData = await updateChallenge(challengeId, payload, token);
      } else {
        // MODE CRÉATION → POST
        const response = await fetch("http://localhost:3000/challenges", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || "Erreur lors de l'envoi.");
        }

        responseData = await response.json();
      }

      console.log("Challenge sauvegardé :", responseData);

      if (onFormSubmit) onFormSubmit();

      // ✅ Redirection vers la page du challenge
      navigate(`/challenges/${responseData.id}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Rendu du formulaire
  return (
    <div className="default-form-container default-form default-box-design">
      <form className="create-form " onSubmit={handleSubmit}>
        <p className="paragraph-center">{challengeId ? "Modifier le Challenge" : "Créer un Challenge"}</p>

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
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
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
            {difficulties.map((diff) => (
              <option key={diff.id} value={diff.id}>{diff.name}</option>
            ))}
        </select>

        <div className="form-buttons">
          <button type="submit" className="default-button form-button">
            Valider
          </button>
          <button
            type="button"
            className="default-button form-button"
            onClick={() => navigate("/")}
          >
            Retour
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormulaireChallenge;
