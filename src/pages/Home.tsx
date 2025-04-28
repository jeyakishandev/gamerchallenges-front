<<<<<<< HEAD

=======
import { useRef } from "react";
>>>>>>> make function of scrool left and right
import "./Home.css";
import "../App.css";

<<<<<<< HEAD
export default function Home () {
    return (
<main>
      <h1>Prêt à relever le challenge ?</h1>

        <h2>
          Montrez-nous ce que vous avez dans le ventre !<br />
          Postez vos vidéos, défiez les autres, et grimpez au sommet.
        </h2>
        <div className="buttons-flex">
          <button>Créer</button>
          <button>Participer</button>

=======
export default function Home() {

const nouveauteRef = useRef<HTMLDivElement>(null);


const populaireRef = useRef<HTMLDivElement>(null);

// Fonction pour défiler à gauche
const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollBy({ left: -250, behavior: "smooth" });
  }
};

// Fonction pour défiler à droite
const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollBy({ left: 250, behavior: "smooth" });
  }
};
  
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
        <button className="arrow left" onClick={() => scrollLeft(nouveauteRef)}>❮</button>

          <div className="carousel-items" ref={nouveauteRef}>

            <div className="skeleton-card">jeu 1</div>
            <div className="skeleton-card">jeu 2</div>
            <div className="skeleton-card">jeu 3</div>
            <div className="skeleton-card">jeu 4</div>
            <div className="skeleton-card">jeu 5</div>
            <div className="skeleton-card">jeu 6</div>
          </div>

          <button className="arrow right" onClick={() => scrollRight(nouveauteRef)}>❯</button>
>>>>>>> make function of scrool left and right
        </div>
      </section>

    
      <section className="carousel-section">
        <h2>Challenges populaire</h2>
        <div className="carousel-container">
        <button className="arrow left" onClick={() => scrollLeft(populaireRef)}>❮</button>

          <div className="carousel-items" ref={populaireRef}>
            <div className="skeleton-card">populaire 1</div>
            <div className="skeleton-card">populaire 2</div>
            <div className="skeleton-card">populaire 3</div>
          </div>

          <button className="arrow right" onClick={() => scrollRight(populaireRef)}>❯</button>
        </div>
      </section>

    </main>
  );
}
