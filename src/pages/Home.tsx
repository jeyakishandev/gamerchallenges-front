import "./Home.css";
import "../App.css";
import { useState } from "react";
import FormulaireChallenge from "../components/Formulaire/FormulaireChallenge";
export default function Home() {
  // Scroll vers la gauche
  const scrollLeft = (id: string) => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollBy({ left: -250, behavior: "smooth" });
    }
  };


  // Scroll vers la droite
  const scrollRight = (id: string) => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollBy({ left: 250, behavior: "smooth" });
    }
  };
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  return (
    <main>
      <section className="home-content">
        <h1>Prêt à relever le challenge ?</h1>
        <p>
          Montrez-nous ce que vous avez dans le ventre !<br />
          Postez vos vidéos, défiez les autres, et grimpez au sommet.
        </p>

        <div className="home-buttons">
          <button className="default-button" onClick={() => setAfficherFormulaire(true)}>Créer</button>
          <button className="default-button">Participer</button>
        </div>
      </section>

      {/* Formulaire affiché uniquement si on clique sur Créer */}
      {afficherFormulaire && (
        <section className="formulaire-section">
          <FormulaireChallenge />
        </section>
      )}


      <section className="carousel-section">
        <h2>Nouveauté</h2>
        <div className="carousel-container">
          <span className="arrow" onClick={() => scrollLeft("nouveaute")}>❮</span>

          <div id="nouveaute" className="carousel-items">
            <div className="skeleton-card">jeu 1</div>
            <div className="skeleton-card">jeu 2</div>
            <div className="skeleton-card">jeu 3</div>
            <div className="skeleton-card">jeu 4</div>
            <div className="skeleton-card">jeu 5</div>
            <div className="skeleton-card">jeu 6</div>
          </div>

          <span className="arrow" onClick={() => scrollRight("nouveaute")}>❯</span>
        </div>
      </section>

      <section className="carousel-section">
        <h2>Challenges populaire</h2>
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
