import { useEffect, useState } from "react";
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

  const [showForm, setShowForm] = useState(false); // Formulaire de participation fermé par défaut.

  return (
    <>
      <h2 className="challenge-title">{challenge?.name}</h2>
        <section className="challenge-content">
          <div className="challenge-container">
            <section className="video-container">
            <iframe 
                  width="100%" 
                  height="315"
                  src={challenge?.video_url}
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
            </section>
            <section className="challenge-info">
              <div className="challenge-cat-and-diff">
                <span className="category-color" style={{backgroundColor: challenge?.category.color}}>{challenge?.category.name}</span>
                <span className="difficulty-color" style={{backgroundColor: challenge?.difficulty.color}}>{challenge?.difficulty.name}</span>
              </div>
              <article className="challenge-description">
                <p>{challenge?.description}
                </p>
              </article>
            </section>
          </div>
          <div className="align-button">
            <button 
              className="default-button"
              onClick={() => setShowForm(true)}
            >
              Participer
            </button>
          </div>
        </section>
        {/** Le formulaire ne s'affiche au clic que s'il y a bien un challenge.id */}
        {showForm && challenge?.id !== undefined && (
          user ? (
            <section>
            <SubmissionForm close={() => setShowForm(false)} challengeId={challenge.id}/>
          </section>
          ) : (
            <Link className="default-button" to="/connexion">
              Connecte-toi pour participer
            </Link>
          )
        )}
      <h2 className="challenge-title">Les participations</h2>
        <section className="challenge-participations">

          {challenge?.users.map((user) => {
            const submission = user?.Submission;
            const key = `${user.id}-${submission?.challenge_id}`;
            return (
              <article className="challenge-participation-container" key={key}>
                <div className="participation-info">
                  <span>{user?.pseudo}</span>
                  <span>{new Date(submission.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                <iframe 
                      width="100%" 
                      height="315"
                      src={submission.video_url}
                      title="YouTube video player" 
                      frameBorder="0" 
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