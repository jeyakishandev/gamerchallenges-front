import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

interface FormulaireChallengeProps {
  onFormSubmit: () => void;
}

export default function FormulaireChallenge({ onFormSubmit }: FormulaireChallengeProps) {
  const navigate = useNavigate();

  const categories = ["Action", "Aventure", "Puzzle"];
  const difficultes = ["Facile", "Moyen", "Difficile"];

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [categorie, setCategorie] = useState(categories[0]);
  const [difficulte, setDifficulte] = useState(difficultes[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newChallenge = {
      titre,
      description,
      videoUrl,
      categorie,
      difficulte,
    };

    localStorage.setItem("nouveauChallenge", JSON.stringify(newChallenge));
    onFormSubmit();
    navigate("/challenges/preview");
  };

  return (
    <div className="form-container">
      <div className="signup-form">
        <form onSubmit={handleSubmit} className="form-content">
          <h2 className="paragraph-center">Créer un Challenge</h2>

          <input
            type="text"
            className="form-input"
            placeholder="Titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />

          <textarea
            className="form-textarea"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="text"
            className="form-input"
            placeholder="URL de la vidéo"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />

          <select
            className="form-select"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="form-select"
            value={difficulte}
            onChange={(e) => setDifficulte(e.target.value)}
          >
            {difficultes.map((diff) => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>

          <button type="submit" className="button-default">Valider</button>
        </form>
      </div>
    </div>
  );
}
