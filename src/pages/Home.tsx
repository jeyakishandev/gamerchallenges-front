import "../App.css";
import { useEffect, useState } from "react";
import FormulaireChallenge from "../components/FormulaireChallenge";
import { IChallenge } from "../@types/index";

export default function Home() {
  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/challenges`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setChallenges(data);
        } else {
          console.error("Les données reçues ne sont pas un tableau :", data);
        }
      } catch (error) {
        console.error("Erreur lors du fetch des challenges :", error);
      }
    };

    fetchChallenges();
  }, []);

  const scrollLeft = (id: string) => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = (id: string) => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <main>
      <section className="home-content">
        <h1 className="main-title">Prêt à relever le challenge ?</h1>
        <h2 className="subtitle">
          Montrez-nous ce que vous avez dans le ventre !<br />
          Postez vos vidéos, défiez les autres, et grimpez au sommet.
        </h2>

        <div className="home-buttons buttons-flex">
          <button className="default-button" onClick={() => setAfficherFormulaire(true)}>
            Créer
          </button>
          <button className="default-button">Participer</button>
        </div>
      </section>
      
      {afficherFormulaire && (
  <section className="submission-form-section">
    <FormulaireChallenge onFormSubmit={() => setAfficherFormulaire(false)} />
  </section>
)}



      <section className="carousel-section">
        <h3 className="low-title">Nouveauté</h3>
        <div className="carousel-container">
          <span className="arrow" onClick={() => scrollLeft("nouveaute")}>❮</span>

          <div id="nouveaute" className="carousel-items">
            {Array.isArray(challenges) && challenges.slice(0, 10).map((challenge) => (
              <div key={challenge.id} className="home-video">
                <iframe
                  width="100%"
                  height="140"
                  src={challenge.video_url}
                  title={`video-${challenge.id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: "8px" }}
                />
              </div>
            ))}

          </div>

          <span className="arrow" onClick={() => scrollRight("nouveaute")}>❯</span>
        </div>
      </section>

      <section className="carousel-section">
        <h3 className="low-title">Challenges populaire</h3>
        <div className="carousel-container">
          <span className="arrow" onClick={() => scrollLeft("populaire")}>❮</span>

          <div id="populaire" className="carousel-items">
            <div className="skeleton-card">populaire 1</div>
            <div className="skeleton-card">populaire 2</div>
            <div className="skeleton-card">populaire 3</div>
          </div>

          <span className="arrow" onClick={() => scrollRight("populaire")}>❯</span>
        </div>
      </section>
    </main>
  );
}
