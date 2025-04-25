
import "./Home.css";

export default function Home () {
    return (
      <>
        <main>

          <section>
            <h1>Prêt à relever le challenge ?</h1>

            <h2>
              Montrez-nous ce que vous avez dans le ventre !<br />
              Postez vos vidéos, défiez les autres, et grimpez au sommet.
            </h2>
            <div className="buttons-flex">
              <button className="default-button">Créer</button>
              <button className="default-button">Participer</button>

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
    </>
  );
}
