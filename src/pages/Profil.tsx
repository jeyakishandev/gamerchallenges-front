import { useParams } from "react-router-dom"
import '../App.css'
import { useEffect, useState } from "react";
import { IChallenges, IUser } from "../@types";
import {  getProfileUsers, getSubmissionsByUser } from "../api";
import CreatedChall from "../components/CreatedChall";
import CompletedChall from "../components/CompletedChall";
import { getChallengesCreatedByUser } from "../api";
import useAuthStore from "../store";

export default function Profil() {

    const scroll = (id: string, direction: "left" | "right") => {
        const container = document.getElementById(id);
        if(container) {
            const amount = direction === "left" ? -250 : 250;
            container.scrollBy({ left: amount, behavior: "smooth"});
        }
    };

    const { id } = useParams();
    const [player, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (id) {
                const newUser = await getProfileUsers(Number.parseInt(id));
                setUser(newUser)
            }
        };
        loadData();
    }, [id])

    const [createdChallenges, setCreatedChallenges] = useState<IChallenges>([]);

    useEffect(() => {
        const loadCreated = async () => {
          if (id) {
            const newCreated = await getChallengesCreatedByUser(Number(id));
            setCreatedChallenges(newCreated);
          }
        };
        loadCreated();
      }, [id]);

      const [completedChallenges, setCompletedChallenges] = useState<IChallenges>([]);
      console.log(completedChallenges);



    useEffect(() => {
        const loadData = async () => {
            if (id) {
              const submissions = await getSubmissionsByUser(Number.parseInt(id));
              const extractedChallenges = submissions.map((s) => s.challenge);
              setCompletedChallenges(extractedChallenges);
            }
          };
          
        loadData();
      }, [id]);

      const { user } = useAuthStore()
      

    return (
        <>
            <main className="profile">

                <div className="perso-info">
                    <h2 className="main-title">Retrouves ici ton profil, avec tes informations personnelles, et tes défis !</h2>
                    <section className="button-container">
                      {user?.id === player?.id && (
                        <a
                        className="default-button"
                        onClick={() => window.location.href = `/profile/${player?.id}/modifier`}
                        >Modifier le profile</a>
                      )}
                    </section>
                    <img
                        className="avatar"
                        src={`http://localhost:3000/uploads/${player?.avatar_url}`}
                        alt={`Avatar de ${player?.pseudo || "l'utilisateur"}`}
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                    <p className="pseudo default-text">Pseudo : {player?.pseudo}</p>
                </div>

                <div className="perso-chall">
                    

                <article className="chall">
                    <h3 className="chall-title">Mes participations</h3>

                    <div className="chall-flex">
                        <span className="arrow" onClick={() => scroll("completed", "left")}>❮</span>

                        <div id="completed" className="carousel-items">

                            {player?.challenges.map((challenge) => {
                                return <CompletedChall key={challenge.id} challenge={challenge} userId={player.id} />
                            })}

                        </div>

                        <span className="arrow" onClick={() => scroll("completed", "right")}>❯</span>

                    </div>

                </article>


                <article className="chall">
  <h3 className="chall-title">Mes challenges créés</h3>

  <div className="chall-flex">
    <span className="arrow" onClick={() => scroll("created", "left")}>❮</span>

    <div id="created" className="carousel-items">
    {createdChallenges.map((challenge) => {
        console.log(createdChallenges)
  return <CreatedChall key={challenge.id} challenge={challenge}/>
})}

    </div>

    <span className="arrow" onClick={() => scroll("created", "right")}>❯</span>
  </div>
</article>

                </div>

            </main>
        </>
    )
}