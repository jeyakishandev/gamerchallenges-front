import "../App.css"
import { useEffect, useState } from "react"
import { IChallenges, IUser } from "../@types"
import { getChallenges, getTopUsers } from "../api";
import LeaderboardTopChallenges from "../components/LeaderbordChallenges";
import LeaderboardTopPlayers from "../components/LeaderboardPlayers";


export default function Leaderboard() {

    const [challenges, setLeaderboardChall] = useState<IChallenges>([]);

    useEffect (() => {
        const loadData = async () => {
            const data = await getChallenges();
            const newLeaderChall = data.sort((a, b) => b.users.length - a.users.length); 
            setLeaderboardChall(newLeaderChall.slice(0, 10)); // top 10
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

            </main>
            
        </>
    )
}