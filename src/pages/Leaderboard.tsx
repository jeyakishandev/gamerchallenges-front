import "../App.css"
import { useEffect, useState } from "react"
import useAuthStore from "../store";
import { IChallenges, IUser } from "../@types"
import { getTopChallengesByParticipation, getTopUsers } from "../api";
import LeaderboardTopChallenges from "../components/LeaderbordChallenges";
import LeaderboardTopPlayers from "../components/LeaderboardPlayers";


export default function Leaderboard() {

    const [challenges, setLeaderboardChall] = useState<IChallenges>([]);

    useEffect (() => {
        const loadData = async () => {
            const newLeaderChall = await getTopChallengesByParticipation();
            setLeaderboardChall(newLeaderChall)
        };
        loadData();
    }, [])


    const [players, setLeaderboardPlayers] = useState<IUser[]>([]);

    useEffect (() => {
        const loadData = async () => {
            const newLeaderPlayers = await getTopUsers();
            console.log(newLeaderPlayers);
            setLeaderboardPlayers(newLeaderPlayers)
        };
        loadData();
    }, []) 

    const { user } = useAuthStore();

    return (
        <>
            <main>
                <h1 className="main-title leaderbord-title">Les classements</h1>
                <h2 className="leaderbord-subtitle subtitle">Vous pourrez retrouver ici le classement des meilleurs joueurs et des challenges les plus jouer. </h2>

                <div className="lead-boxes">
                    <section className="best-challenges">
                        <h3 className="low-title">Challenges populaires</h3>
                        <ul className="leaderbord-lists default-box-design">
                        {/* Liste les 10 challenges les plus joués */}
                        {challenges.map((challenge, index) => {
                            return <LeaderboardTopChallenges key={challenge.id} challenge={challenge} index={index}/>
                        })}
                        </ul>
                    </section>

                    <section className="best-players">
                        <h3 className="low-title">Meilleurs joueurs</h3>
                        <ul className="leaderbord-lists default-box-design">
                        {/* Liste les 10 joueurs ayant réalisés le plus de challenges */}
                        {players.map((user, index) => {
                            return <LeaderboardTopPlayers key={user.id} players={user} index={index} />
                        })}
                        </ul>
                    </section>
                </div>

                <div>
                    {user ? (
                        <p>ID : utilisateur connecté : {user.id}</p>
                    ) : (
                        <p> Aucun utilisateur connecté</p>
                    )}
                </div>

            </main>
            
        </>
    )
}