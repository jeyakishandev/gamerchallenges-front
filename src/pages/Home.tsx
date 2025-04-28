import "./Home.css";
import "../App.css";

export default function Home() {

  // Fonction pour défiler à gauche
  function scrollLeft(id: string) {
    const container = document.getElementById(id);
    if (container) {
      container.scrollBy({ left: -250, behavior: "smooth" });
    }
  }

  // Fonction pour défiler à droite
  function scrollRight(id: string) {
    const container = document.getElementById(id);
    if (container) {
      container.scrollBy({ left: 250, behavior: "smooth" });
    }
  }

  return (
    <main>
      <section className="home-content">
        <h1>Prêt à relever le challenge ?</h1>

        <p>
          Montrez-nous ce que vous avez dans le ventre !<br />
          Postez vos vidéos, défiez les autres, et grimpez au sommet.
        </p>

        <div className="home-buttons">
          <button>Créer</button>
          <button>Participer</button>
        </div>
      </section>

      <section className="carousel-section">
        <h2>Nouveauté</h2>
        <div className="carousel-container">
          <button className="arrow left" onClick={() => scrollLeft("nouveaute")}>❮</button>

          <div id="nouveaute" className="carousel-items">
            <div className="skeleton-card">jeu 1</div>
            <div className="skeleton-card">jeu 2</div>
            <div className="skeleton-card">jeu 3</div>
            <div className="skeleton-card">jeu 4</div>
            <div className="skeleton-card">jeu 5</div>
            <div className="skeleton-card">jeu 6</div>
          </div>

          <button className="arrow right" onClick={() => scrollRight("nouveaute")}>❯</button>
        </div>
      </section>

      <section className="carousel-section">
        <h2>Challenges populaire</h2>
        <div className="carousel-container">
          <button className="arrow left" onClick={() => scrollLeft("populaire")}>❮</button>

          <div id="populaire" className="carousel-items">
            <div className="skeleton-card">populaire 1</div>
            <div className="skeleton-card">populaire 2</div>
            <div className="skeleton-card">populaire 3</div>
          </div>

          <button className="arrow right" onClick={() => scrollRight("populaire")}>❯</button>
        </div>
      </section>
    </main>
  );
}
