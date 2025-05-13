import { useParams } from "react-router-dom"
import '../App.css'
import { useEffect, useState } from "react";
import { IChallenges, IUser } from "../@types";
import { getChallengesByUser, getProfileUsers, getSubmissionsByUser } from "../api";
import CreatedChall from "../components/CreatedChall";
import CompletedChall from "../components/CompletedChall";

export default function Profil() {

    const scroll = (id: string, direction: "left" | "right") => {
        const container = document.getElementById(id);
        if(container) {
            const amount = direction === "left" ? -250 : 250;
            container.scrollBy({ left: amount, behavior: "smooth"});
        }
    };

    const { id } = useParams();
    const [users, setUser] = useState<IUser | null>(null);

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
        const loadData = async () => {
            if (id) {
            const newCreatedChallenges = await getChallengesByUser(Number.parseInt(id));
            setCreatedChallenges(newCreatedChallenges)
            }
        };
        loadData();
    }, [id]);

    const [completedChallenges, setCompletedChallenges] = useState<IChallenges>([]);

    useEffect(() => {
        const loadData  = async () => {
            if (id) {
                const newCompletedChallenges = await getSubmissionsByUser(Number.parseInt(id));
                setCompletedChallenges(newCompletedChallenges)
            }
        };
        loadData()
    }, [id]);


    return (
        <>
            <main className="profile">

                <div className="perso-info">
                    <h2 className="main-title">Retrouves ici ton profil, avec tes informations personnelles, et tes défis !</h2>
                    <section className="button-container">
                        <a
                        className="default-button"
                        onClick={() => window.location.href = `/profile/${users?.id}/modifier`}
                        >Modifier le profile</a>
                    </section>
                    <img
                        className="avatar"
                        src={`http://localhost:3000/uploads/${users?.avatar_url}`}
                        alt={`Avatar de ${users?.pseudo || "l'utilisateur"}`}
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                    <p className="pseudo default-text">Pseudo : {users?.pseudo}</p>
                </div>

                <div className="perso-chall">
                    

                <article className="chall">
                    <h3 className="chall-title">Mes participations</h3>

                    <div className="chall-flex">
                        <span className="arrow" onClick={() => scroll("completed", "left")}>❮</span>

                        <div id="completed" className="carousel-items">

                            {users?.challenges.map((challenge) => {
                                return <CompletedChall key={challenge.id} challenge={challenge} userId={users.id} />
                            })}

                        </div>

                        <span className="arrow" onClick={() => scroll("completed", "right")}>❯</span>

                    </div>

                </article>


                <article className="chall">
                    <h3 className="chall-title">Mes challenges crées</h3>

                    <div className="chall-flex">
                        <span className="arrow" onClick={() => scroll("created", "left")}>❮</span>

                        <div id="created" className="carousel-items">

                            {createdChallenges.map((challenge) => {
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