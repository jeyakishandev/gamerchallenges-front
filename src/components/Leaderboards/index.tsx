import { Link } from "react-router-dom"
import { IChallenges } from "../../@types"; 
import "./Leaderboard.css"

interface LeaderboardProps {
    challenges: IChallenges;
}

export default function Leaderboards({ challenges }: LeaderboardProps) {

    /* On commence par calculer le nombre de participations pour chaque challenge */
    const challengesWithCount = challenges.map(challenge => ({
        ...challenge,
        participations: challenge.users.length,
    }));

    /* On va maintenant les trier par ordre décroissant, puis faire en sorte de n'afficher que le top 10 */
    const sortedChallenges = challengesWithCount.sort((a, b) => b.participations - a.participations).slice(0, 10);

    return (
        <>

                        <ul className="list-chall"> {sortedChallenges.map((challenge, idx) => (
                            <li key={challenge.id}>
                                {idx + 1}- <Link to={`/challenge/${challenge.id}`}> {challenge.name} : {challenge.participations} participations</Link>
                            </li>
                        ))}
                        
                        </ul>            
        </>
    )
}