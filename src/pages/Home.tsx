import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IChallenge } from "../@types/index";
import useAuthStore from "../store"; // 🔒 pour vérifier si user connecté
import { getChallenges } from "../api";
import { getYoutubeThumbnailUrl } from "../utils/youtube";
import heroLeftImage from "../../public/img/astronaute-mignon-agitant-main-controleur-jeu-cartoon-vector-icon-illustration-concept-icone-science-technologie-isole-vecteur-premium-style-dessin-anime-plat.png";
import heroseparatorImage from "../../public/img/Capture_d_écran_2025-05-18_à_11.30.20-removebg-preview.png"

export default function Home() {
  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user); // ✅ check Zustand
  const [popularChallenges, setPopularChallenges] = useState<IChallenge[]>([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        // Récupérer tous les challenges.
        const data = await getChallenges();
        if (Array.isArray(data)) {
          setChallenges(data);

          // Trier les challenges par popularité.
          const sortedByPopularity = [...data].sort((a, b) => b.users.length - a.users.length);
          setPopularChallenges(sortedByPopularity.slice(0, 10));
        } 

        
        else console.error("Les données reçues ne sont pas un tableau :", data);
      } catch (error) {
        console.error("Erreur lors du fetch des challenges :", error);
      }
    };
    fetchChallenges();
  }, []);

  const scroll = (id: string, direction: "left" | "right") => {
    const container = document.getElementById(id);
    if (container) {
      const amount = direction === "left" ? -250 : 250;
      container.scrollBy({ left: amount, behavior: "smooth" });
    }
  };
  
  return (
    <main className="home-page">
      <section className="hero-layout">
        <div className="hero-left-image">
          <img src={heroLeftImage} alt="Image de gauche" />
        </div>
        <div className="hero-right-content">
        <div className="hero-center-content">
          <div className="default-box-design">
          <h1 className="main-title">Prêt à relever le challenge ?</h1>
          <h2 className="subtitle">
            Montrez-nous ce que vous avez dans le ventre !<br />
            Postez vos vidéos, défiez les autres, et grimpez au sommet.
          </h2>
          <div className="hero-buttons buttons-flex">
            <button
              className="default-button "
              onClick={() => {
                if (user) {
                  navigate("/creation");
                } else {
                  navigate("/connexion?redirect=/creation");
                }
              }}
            >
              <span>🎮 Créer</span>
            </button>
            <button
              className="default-button "
              onClick={() => navigate("/challenges")}
            >
              <span>🚀 Participer</span>
            </button>
            
          </div>
          <div className="hero-separator"> {/* Barre de séparation */}
          <img src={heroseparatorImage} alt="Image de gauche" />
                    </div>
        <div className="hero-right-how">
          <h2 className="subtitle">Comment ça marche ?</h2>
          <div className="how-steps">
            <div className="step-card">🔹 <strong>1.</strong> Crée un challenge</div>
            <div className="step-card">🎥 <strong>2.</strong> Poste ta vidéo</div>
            <div className="step-card">🏆 <strong>3.</strong> Affronte les autres</div>
          </div>
          </div>
        </div>
        </div>
        </div>
      </section>

      <section className="home-carousel-section">
  <div className="home-carousel-block">
    <h3 className="low-title">🎬 Nouveautés</h3>
    <div className="home-carousel-container">
      
      <div id="home-nouveaute" className="home-carousel-items">
        {/* Première série des challenges (les originaux) */}
        {challenges.slice(0, 10).map((challenge) => {
          const thumbnailUrl = getYoutubeThumbnailUrl(challenge.video_url);
          return (
            <Link
              key={`original-${challenge.id}`} // Clé unique pour chaque élément
              to={`/challenges/${challenge.id}`}
              className="home-video-card"
            >
              <img
                src={thumbnailUrl}
                alt={`Thumbnail du challenge ${challenge.name}`}
              />
              <div className="video-card-footer">
                <h3 className="video-card-title">{challenge.name}</h3>
              </div>
            </Link>
          );
        })}
        {/* Deuxième série des mêmes challenges (les copies pour l'infini) */}
        {challenges.slice(0, 10).map((challenge) => {
          const thumbnailUrl = getYoutubeThumbnailUrl(challenge.video_url);
          return (
            <Link
              key={`duplicate-${challenge.id}`} // Clé unique pour chaque élément
              to={`/challenges/${challenge.id}`}
              className="home-video-card"
            >
              <img
                src={thumbnailUrl}
                alt={`Thumbnail du challenge ${challenge.name}`}
              />
              <div className="video-card-footer">
                <h3 className="video-card-title">{challenge.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
      
    </div>
  </div>
</section>
<section className="home-carousel-section">
  <div className="home-carousel-block">
    <h3 className="low-title">🏆 Challenges populaires</h3>
    <div className="home-carousel-container">
      
      <div
        id="home-populaires"
        className="home-carousel-items reversed" // Ajout de la classe "reversed"
      >
        {/* Première série des challenges populaires (les originaux) */}
        {popularChallenges.slice(0, 10).map((challenge) => {
          const thumbnailUrl = getYoutubeThumbnailUrl(challenge.video_url);
          return (
            <Link
              key={`original-${challenge.id}`} // Clé unique pour chaque élément
              to={`/challenges/${challenge.id}`}
              className="home-video-card"
            >
              <img
                src={thumbnailUrl}
                alt={`Thumbnail du challenge ${challenge.name}`}
              />
              <div className="video-card-footer">
                <h3 className="video-card-title">{challenge.name}</h3>
              </div>
            </Link>
          );
        })}
        {/* Deuxième série des mêmes challenges populaires (les copies pour l'infini) */}
        {popularChallenges.slice(0, 10).map((challenge) => {
          const thumbnailUrl = getYoutubeThumbnailUrl(challenge.video_url);
          return (
            <Link
              key={`duplicate-${challenge.id}`} // Clé unique pour chaque élément
              to={`/challenges/${challenge.id}`}
              className="home-video-card"
            >
              <img
                src={thumbnailUrl}
                alt={`Thumbnail du challenge ${challenge.name}`}
              />
              <div className="video-card-footer">
                <h3 className="video-card-title">{challenge.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
      
    </div>
  </div>
</section>
    </main>
  );
}
