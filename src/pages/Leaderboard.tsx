import { Link } from "react-router-dom"
import "./Leaderboard.css"
import { useEffect, useState } from "react"
import { IChallenges } from "../@types"
import { getTopChallengesByParticipation } from "../api";
import LeaderboardTopChallenges from "../components/LeaderboardChallenges";



export default function Leaderboard() {

    const [challenges, setLeaderboardChall] = useState<IChallenges>([]);

    useEffect (() => {
        const loadData = async () => {
            const newLeaderChall = await getTopChallengesByParticipation();
            setLeaderboardChall(newLeaderChall)
        };
        loadData();
    }, [])

    return (
        <>
            <main className="lead-content">
                <h2 className="main-title">Vous pourrez retrouver ici le classement des meilleurs joueurs et des challenges les plus jouer. </h2>

                <div className="lead-boxes">
                    <section className="best-challenges">
                        <h3>Challenges populaires</h3>
                        <ul className="list-chall">
                        {challenges.map((challenge) => {
                            return <LeaderboardTopChallenges key={challenge.id} challenge={challenge} />
                        })}
                        </ul>
                    </section>

                    <section className="best-players">
                        <h3>Meilleurs joueurs</h3>
                        <ul className="list-players">
                            {/* Remplacer les ids dans le Link to par l'id de la base de donnée */}
                            <li>1- <Link to="/profile/1">Alice : 456 challenges</Link></li>
                            <li>2- <Link to="/profile/2">Benjamin : 367 challenges</Link></li>
                            <li>3- <Link to="/profile/3">Clara : 359 challenges</Link></li>
                            <li>4- <Link to="/profile/4">David : 304 challenges</Link></li>
                            <li>5- <Link to="/profile/5">Emma : 291 challenges</Link></li>
                            <li>6- <Link to="/profile/6">Félix : 246 challenges</Link></li>
                            <li>7- <Link to="/profile/7">Gabrielle : 199 challenges</Link></li>
                            <li>8- <Link to="/profile/8">Hugo : 120 challenges</Link></li>
                            <li>9- <Link to="/profile/9">Inès : 92 challenges</Link></li>
                            <li>10- <Link to="/profile/10">Julien : 78 challenges</Link></li>
                            <li>46 - <Link to="/profile/99">Moi : 1 challenge</Link></li>
                        </ul>
                    </section>
                </div>

            </main>
            
        </>
    )
}