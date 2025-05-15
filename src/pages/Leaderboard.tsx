import "../App.css"
import { useEffect, useState } from "react"
import useAuthStore from "../store";
import { IChallenges, IUser } from "../@types"
import { getChallenges, getUsers } from "../api";
import LeaderboardTopChallenges from "../components/LeaderbordChallenges";
import LeaderboardTopPlayers from "../components/LeaderboardPlayers";


export default function Leaderboard() {

    const [challenges, setLeaderboardChall] = useState<IChallenges>([]);

    useEffect (() => {
        const loadData = async () => {
            const data = await getChallenges();
            const newLeaderChall = data.sort((a, b) => {
                const aLen = a.users?.length ?? 0;
                const bLen = b.users?.length ?? 0;
                return bLen - aLen;
              });
              
            setLeaderboardChall(newLeaderChall.slice(0, 10)); // top 10
        };
        loadData();
    }, [])


    const [players, setLeaderboardPlayers] = useState<IUser[]>([]);

    useEffect (() => {
        const loadData = async () => {
            const data = await getUsers();
            const newLeaderPlayers = data.sort((a, b) => {
                const aLen = a.challenges?.length ?? 0;
                const bLen = b.challenges?.length ?? 0;
                return bLen - aLen;
              });
              
            console.log(newLeaderPlayers);
            setLeaderboardPlayers(newLeaderPlayers.slice(0, 10));
        };
        loadData();
    }, []) 

    const { user } = useAuthStore();

    // Position de l'utilisateur connecté dans le classement
    const userRank = players.findIndex((p) => p.id === user?.id);
    const currentPlayer = players.find((p) => p.id === user?.id);

    return (
        <>
            <main>
                <h1 className="main-title leaderbord-title">Les classements</h1>
                <h2 className="leaderbord-subtitle subtitle">Vous pourrez retrouver ici le classement des meilleurs joueurs et des challenges les plus jouer. </h2>

                <div className="lead-boxes">
                    <section className="best-challenges">
                        <h3 className="low-title">Challenges populaires</h3>
                        <ul className="leaderbord-lists leader-box-design">
                        {/* Liste les 10 challenges les plus joués */}
                        {challenges.map((challenge, index) => {
                            return <LeaderboardTopChallenges key={challenge.id} challenge={challenge} index={index}/>
                        })}
                        </ul>
                    </section>

                    <section className="best-players">
                        <h3 className="low-title">Meilleurs joueurs</h3>
                        <ul className="leaderbord-lists leader-box-design">
                        {/* Liste les 10 joueurs ayant réalisés le plus de challenges */}
                        {players.map((user, index) => {
                            return <LeaderboardTopPlayers key={user.id} players={user} index={index} />
                        })}

                        {user ? (
                            <section className="perso-leader">
                                {userRank !== -1 ? (
                                    <p className="default-text perso-leader-sentence">Vous avez atteint le rang n°{userRank + 1}, en accomplissant {currentPlayer?.challenges.length} challenges</p>
                                ) : (
                                    <p className="default-text perso-leader-sentence" >Vous n'apparaissez pas encore dans le classement</p>
                                )}
                            </section>
                        ) : (

                            <section className="perso-leader">
                                <p className="default-text perso-leader-sentence">Connectez-vous pour voir votre classement personnel</p>
                            </section>
                        )}

                        </ul>

                    </section>
                </div>

            </main>
            
        </>
    )
}