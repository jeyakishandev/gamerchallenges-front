import "./Leaderboard.css"
import { IChallenge } from "../../@types"
import { Link } from "react-router-dom";

interface LeaderboardChallenges {
    challenge : IChallenge
}

// Rempli chaque ligne de la liste par les informations du challenge concerné
export default function LeaderboardTopChallenges({ challenge }: LeaderboardChallenges) {
    return (
            <li>1- <Link to={`/challenge/${challenge.id}`}> {challenge.name} : {challenge.users.length} participations </Link></li>
    )
}
