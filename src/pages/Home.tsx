import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IChallenge } from "../@types/index";
import useAuthStore from "../store"; // 🔒 pour vérifier si user connecté
import { getChallenges } from "../api";
import { getYoutubeEmbedUrl, getYoutubeThumbnailUrl } from "../utils/youtube";



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

          <section className="home-content">
            <div className="home-intro-wrapper">
              
              <div className="home-intro-block">
                <h1 className="main-title">Prêt à relever le challenge ?</h1>
                <h2 className="subtitle">
                  Montrez-nous ce que vous avez dans le ventre !<br />
                  Postez vos vidéos, défiez les autres, et grimpez au sommet.
                </h2>

                <div className="home-buttons buttons-flex">
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

                  </div>
                  </div>
                </section>
                <section className="home-how-wrapper">
                <div className="home-how-block">
                  <h2 className="subtitle">Comment ça marche ?</h2>
                  <div className="how-steps">
                    <div className="step-card">🔹 <strong>1.</strong> Crée un challenge</div>
                    <div className="step-card">🎥 <strong>2.</strong> Poste ta vidéo</div>
                    <div className="step-card">🏆 <strong>3.</strong> Affronte les autres</div>
                  </div>
                </div>
              </section>




              <section className="home-carousel-section">
              <div className="home-carousel-block">
                <h3 className="low-title">🎬 Nouveautés</h3>
                <div className="home-carousel-container">
                  <span className="home-carousel-arrow" onClick={() => scroll("home-nouveaute", "left")}>❮</span>
                  <div id="home-nouveaute" className="home-carousel-items">
                    {challenges.slice(0, 10).map((challenge) => {
                      const thumbnailUrl = getYoutubeThumbnailUrl(challenge.video_url);
                      return (
                        <Link 
                          key={challenge.id}
                          to={`/challenges/${challenge.id}`}
                          className="home-video-card">
                            
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
                  <span className="home-carousel-arrow" onClick={() => scroll("home-nouveaute", "right")}>❯</span>
                </div>
              </div>
            </section>


            <section className="home-carousel-section">
              <div className="home-carousel-block">
                <h3 className="low-title">🏆 Challenges populaires</h3>
                <div className="home-carousel-container">
                  <span className="home-carousel-arrow" onClick={() => scroll("home-populaires", "left")}>❮</span>
                  <div id="home-populaires" className="home-carousel-items">
                    {popularChallenges.slice(0, 10).map((challenge) => {
                      const thumbnailUrl = getYoutubeThumbnailUrl(challenge.video_url);
                      return (
                        <Link 
                          key={challenge.id}
                          to={`/challenges/${challenge.id}`}
                          className="home-video-card">
                            
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
                  <span className="home-carousel-arrow" onClick={() => scroll("home-populaires", "right")}>❯</span>
                </div>
              </div>
            </section>


    </main>
  );
}
