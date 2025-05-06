
import "./Home.css";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IChallenge } from "../@types/index";
import useAuthStore from "../store"; // 🔒 pour vérifier si user connecté

export default function Home() {
  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user); // ✅ check Zustand

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/challenges`);
        const data = await response.json();
        if (Array.isArray(data)) setChallenges(data);
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
    <main>
      <section className="home-content">
        <h1>Prêt à relever le challenge ?</h1>
        <p>
          Montrez-nous ce que vous avez dans le ventre !<br />
          Postez vos vidéos, défiez les autres, et grimpez au sommet.
        </p>

        <div className="home-buttons">
          <button
            className="default-button"
            onClick={() => {
              if (user) {
                navigate("/creation");
              } else {
                navigate("/connexion?redirect=/creation");
              }
            }}
          >
            Créer
          </button>

          <button className="default-button">Participer</button>
        </div>
      </section>

      <section className="carousel-section">
        <h2>Nouveauté</h2>
        <div className="carousel-container">
          <span className="arrow" onClick={() => scroll("nouveaute", "left")}>❮</span>
          <div id="nouveaute" className="carousel-items">
            {challenges.slice(0, 10).map((challenge) => {
              const embedUrl = challenge.video_url.replace("watch?v=", "embed/") + "?mute=1";
              return (
                <div key={challenge.id} className="skeleton-card video-card">
                  <iframe
                    width="100%"
                    height="140"
                    src={embedUrl}
                    title={`challenge-${challenge.id}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onMouseEnter={(e) => {
                      const src = e.currentTarget.getAttribute("src");
                      if (src && !src.includes("autoplay=1")) {
                        e.currentTarget.setAttribute("src", src + "&autoplay=1");
                      }
                    }}
                    onMouseLeave={(e) => {
                      const src = e.currentTarget.getAttribute("src");
                      if (src) {
                        const cleanSrc = src.replace("&autoplay=1", "");
                        e.currentTarget.setAttribute("src", cleanSrc);
                      }
                    }}
                    style={{ borderRadius: "8px" }}
                  ></iframe>
                  <p className="video-title">{challenge.name}</p>
                </div>
              );
            })}
          </div>
          <span className="arrow" onClick={() => scroll("nouveaute", "right")}>❯</span>
        </div>
      </section>

      <section className="carousel-section">
        <h2>Challenges populaires</h2>
        <div className="carousel-container">
          <span className="arrow" onClick={() => scroll("populaire", "left")}>❮</span>
          <div id="populaire" className="carousel-items">
            <div className="skeleton-card">populaire 1</div>
            <div className="skeleton-card">populaire 2</div>
            <div className="skeleton-card">populaire 3</div>
          </div>
          <span className="arrow" onClick={() => scroll("populaire", "right")}>❯</span>
        </div>
      </section>
    </main>
  );
}
