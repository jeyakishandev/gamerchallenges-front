import { useEffect, useState } from "react";
import "./Challenge.css";
import { IChallenge } from "../@types";
import { Link, useParams } from "react-router-dom";
import { getChallengeById } from "../api";
import SubmissionForm from "../components/SubmissionForm";
import useAuthStore from "../store";


export default function Challenge() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<IChallenge | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const newChallenge = await getChallengeById(Number.parseInt(id));
        setChallenge(newChallenge)
      }
    };
    loadData();
  }, [id]);
  const handleDelete = async () => {
    if (!challenge) return; 
  
    if (confirm("Es-tu sûr de vouloir supprimer ce challenge ?")) {
      try {
        await fetch(`http://localhost:3000/challenges/${challenge.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Challenge supprimé !");
        window.location.href = "/";
      } catch (error) {
        console.error("Erreur suppression :", error);
        alert("Erreur lors de la suppression.");
      }
    }
  };
  



  const [showForm, setShowForm] = useState(false); // Formulaire de participation fermé par défaut.
  
  if (!challenge) {
    return <p>Chargement...</p>;
  }
  const embedUrl = challenge.video_url.replace("watch?v=", "embed/") + "?mute=1";
  return (
    <>
        <section className="challenge-content default-box-design">
          <div className="challenge-container">
            <section className="video-container">
            <iframe 
                  width="100%" 
                  height="315"
                  src={embedUrl}
                  title={`challenge-${challenge.id}`}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
            </section>
            <section className="challenge-info">
            <h2 className="challenge-title low-title">{challenge?.name}</h2>
              <div className="challenge-cat-and-diff">
              {user?.id === challenge.user_id && (
  <div className="challenge-actions">
    <span className="icon-button" title="Modifier">✏️</span>
    <span className="icon-button" title="Supprimer" onClick={handleDelete}>🗑️</span>
  </div>
)}
                <span className="category-color default-tag-design" style={{backgroundColor: challenge?.category.color}}>{challenge?.category.name}</span>
                <span className="difficulty-color default-tag-design" style={{backgroundColor: challenge?.difficulty.color}}>{challenge?.difficulty.name}</span>
              </div>
              <article className="challenge-description">
                <p className="default-text">{challenge?.description}
                </p>
              </article>
            </section>
          </div>
          <div className="align-button">
            {user ? (
              <button 
                className="default-button"
                onClick={() => setShowForm(true)}
              >
                Participer
              </button>
            ) : (
              <Link className="default-button" to="/connexion">
                Connecte-toi pour participer
              </Link>
            )}
          </div>
        </section>
        {/** Le formulaire ne s'affiche au clic que s'il y a bien un challenge.id */}
        {showForm && challenge?.id !== undefined && (
          user ? (
          <section className="submission-form-section">
            <SubmissionForm close={() => setShowForm(false)} challengeId={challenge.id}/>
          </section>
          ) : (
            <Link className="default-button" to="/connexion">
              Connecte-toi pour participer
            </Link>
          )
        )}
      <h3 className="participation-title low-title">Les participations</h3>
        <section className="challenge-participations">

          {challenge?.users.map((user) => {
            const submission = user?.Submission;
            const key = `${user.id}-${submission.challenge_id}`;
            const embedUrl = submission.video_url.replace("watch?v=", "embed/") + "?mute=1";

            return (
              <article className="challenge-participation-container default-box-design" key={key}>
                <div className="participation-info">
                  <span className="default-tag-design">{user?.pseudo}</span>
                  <span className="default-tag-design">{new Date(submission.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                <iframe
                width="100%"
                height="315"
                src={embedUrl}
                title={`submission-${user.id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

                </div>
              </article>
            )})}
        
        </section>
    </>
  )
}
export { Challenge }