import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormulaireChallenge() {
  const navigate = useNavigate();

  // Données simulées
  const categories = ["Action", "Aventure", "Puzzle"];
  const difficultes = ["Facile", "Moyen", "Difficile"];

  // États pour le formulaire
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

    // Stockage local
    localStorage.setItem("nouveauChallenge", JSON.stringify(newChallenge));

    // Redirection vers la page du challenge
    navigate("/challenges/preview"); // On imagine que "preview" est une page temporaire
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem" }}>
      <h2>Créer un Challenge</h2>

      <div>
        <label>Titre :</label><br />
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description :</label><br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>URL Vidéo :</label><br />
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Catégorie :</label><br />
        <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Difficulté :</label><br />
        <select value={difficulte} onChange={(e) => setDifficulte(e.target.value)}>
          {difficultes.map((diff) => (
            <option key={diff} value={diff}>{diff}</option>
          ))}
        </select>
      </div>

      <button className="default-button" type="submit" style={{ marginTop: "1rem" }}>Valider</button>
    </form>
  );
}
