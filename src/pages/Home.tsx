import "./Home.css";

export default function Home() {
  return (
    <main className="home-content">
      
      <h1>Prêt à relever le challenge ?</h1>
      <p>
        Montrez-nous ce que vous avez dans le ventre ! <br />
        Postez vos vidéos, défiez les autres, et grimpez au sommet.
      </p>

      
      <div className="home-buttons">
        <button>Créer</button>
        <button>Participer</button>
      </div>

      
      <section className="carousel-section">
        <h2>Nouveautés</h2>

        <div className="carousel-container">
          <button className="arrow left">❮</button>

          <div className="carousel-items">
            <div className="skeleton-card">jeu 1</div>
            <div className="skeleton-card">jeu 2</div>
            <div className="skeleton-card">jeu 3</div>
            <div className="skeleton-card">jeu 4</div>
          </div>

          <button className="arrow right">❯</button>
        </div>
      </section>

      
      <section className="carousel-section">
        <h2>Challenges populaire</h2>
        <div className="carousel-container">
        <button className="arrow left">❮</button>

          <div className="carousel-items">
            <div className="skeleton-card">populaire 1</div>
            <div className="skeleton-card">populaire 2</div>
            <div className="skeleton-card">populaire 3</div>
          </div>
          <button className="arrow right">❯</button>
        </div>
      </section>
    </main>
  );
}
