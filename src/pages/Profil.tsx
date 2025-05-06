import { useParams } from "react-router-dom"
import "./Profil.css"
import '../App.css'
import { useEffect, useState } from "react";
import { IChallenges, IUser } from "../@types";
import { getChallengesByUser, getProfileUsers, getSubmissionsByUser } from "../api";
import CreatedChall from "../components/CreatedProfile";
import CompletedChall from "../components/CompletedChall";

export default function Profil() {

    const { id } = useParams();
    const [user, setUser] = useState<IUser | null>(null);

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
            console.log(newCreatedChallenges);
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
                    <h2 className="main-title">Retrouvez ici ton profile, avec tes informations personnelles, et tes défis !</h2>
                    <section className="button-container">
                        <a href="#" className="default-button">Modifier le profile</a>
                    </section>
                    <img
                        className="avatar"
                        src={user?.avatar_url ?? undefined}
                        alt={`Avatar de ${user?.pseudo || "l'utilisateur"}`}
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                    <p className="pseudo">Pseudo : {user?.pseudo}</p>
                </div>


                <div className="perso-chall">
                    
                <article className="chall">
                    <h3 className="chall-title">Mes challenges en cours</h3>

                    <div className="chall-flex">
                        <button className="arrow left">❮</button>

                        <div className="chall-list">

                            <div className="chall-box">

                                <div className="chall-pres">

                                    <section className="video">
                                        <iframe className="card-video" src="https://www.youtube.com/embed/SCi_kDUe7yU?si=lAvofjbMcTbQbI2w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                    </section>

                                    <section className="chall-info">
                                        <p className="chall-name">Nom du challenge</p>
                                        <p className="chall-tag">Catégorie</p>
                                        <p className="chall-diff">Difficulté</p>
                                        <p className="chall-submission">Nombre de participants</p>
                                    </section>

                                </div>

                                <div className="button-container">
                                    <a href="#" className="default-button">Détails</a>
                                </div>

                            </div>

                        </div>

                        <button className="arrow right">❯</button>

                    </div>

                </article>

                <article className="chall">
                    <h3 className="chall-title">Mes challenges réalisés</h3>

                    <div className="chall-flex">
                        <button className="arrow left">❮</button>

                        <div className="chall-list">

                            {user?.challenges.map((challenge) => {
                                console.log(challenge)
                                return <CompletedChall key={challenge.id} challenge={challenge} />
                            })}

                        </div>

                        <button className="arrow right">❯</button>

                    </div>

                </article>


                <article className="chall">
                    <h3 className="chall-title">Mes challenges crées</h3>

                    <div className="chall-flex">
                        <button className="arrow left">❮</button>

                        <div className="chall-list">

                            {createdChallenges.map((challenge) => {
                                console.log(challenge)
                                return <CreatedChall key={challenge.id} challenge={challenge}/>
                            })}

                        </div>

                        <button className="arrow right">❯</button>

                    </div>

                </article>
                </div>

            </main>
        </>
    )
}