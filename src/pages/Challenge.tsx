import { useEffect, useState } from "react";
import { IChallenge } from "../@types";
import { useParams } from "react-router-dom";
import { getChallengeById } from "../api";


export default function Challenge() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<IChallenge | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const newChallenge = await getChallengeById(Number.parseInt(id));
        setChallenge(newChallenge)
      }
    };
    loadData();
  }, [id]);

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
        <button className="default-button">Participer</button>
      </div>
    </section>
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