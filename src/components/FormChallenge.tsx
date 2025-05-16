
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategory, IDifficulty } from "../@types";
import { addChallengeToApi, getCategories, getDifficulties, updateChallenge } from "../api/index";
import useAuthStore from "../store"; 

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
  isModal?: boolean;
}

function FormChallenge({ onFormSubmit, challengeId, defaultValues, isModal }: Props) {
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
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else {
          console.error("Catégories non valides :", categoriesData);
          setCategories([]);
        }

        const difficultiesData = await getDifficulties();
        if(Array.isArray(difficultiesData)) {
          setDifficulties(difficultiesData);
        } else {
          console.error("Difficultés non valides :", difficultiesData);
          setDifficulties([]);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
        setCategories([]);
        setDifficulties([]);
      }
    };

    fetchData();
  }, []);

  // Gère le changement de valeur dans les champs du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  // Envoie du formulaire à la base de données
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    console.log("👤 user dans Zustand :", user);
    console.log("🔑 token dans Zustand :", token);
    
    if (!user || !token) {
      setError("Tu dois être connecté pour modifier ou créer un challenge.");
      return;
    }
  
    const payload = {
      ...formData,
      user_id: user.id, 
      category_id: Number(formData.category_id),
      difficulty_id: Number(formData.difficulty_id),
    };
  
    console.log("Payload envoyé :", payload);
  
    try {
      let responseData;
  
      if (challengeId) {
        responseData = await updateChallenge(challengeId, payload, token);
      } else {
        responseData = await addChallengeToApi(payload, token);
      }
  
      console.log("Challenge sauvegardé :", responseData);
  
      if (onFormSubmit) onFormSubmit();
      navigate(`/challenges/${responseData.id}`);
  
    } catch (err: any) {
      setError(err.message);
    }
  };
  

  // Rendu du formulaire
  return (
    <section className="default-box-design">
  <form className="form-challenge" onSubmit={handleSubmit}>
    <p className="paragraph-center low-title">
      {challengeId ? "Modifier le Challenge" : "Créer un Challenge"}
    </p>

    {error && (
      <p style={{ color: "white", textAlign: "center", background: "red" }}>
        {error}
      </p>
    )}

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
      className="form-input"
      name="description"
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
      className="form-input"
      value={formData.category_id}
      onChange={handleChange}
      required
    >
      <option value="">-- Sélectionner une catégorie --</option>
      {categories.map((cat) => (
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
      {difficulties.map((diff) => (
        <option key={diff.id} value={diff.id}>
          {diff.name}
        </option>
      ))}
    </select>

        <div className="form-buttons">
          <button type="submit" className="default-button form-button">
            Valider
          </button>
          {!isModal && (
            <button
              type="button"
              className="default-button form-button"
              onClick={() => navigate("/")}
            >
              Retour
            </button>
          )}
          
        </div>
      </form>
    </section>
  );
}

export default FormChallenge;
