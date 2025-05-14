import { IChallenge } from "../@types"
import { Link } from "react-router-dom";

interface LeaderboardChallenges {
    challenge : IChallenge
    index: number
}

// Rempli chaque ligne de la liste par les informations du challenge concerné
export default function LeaderboardTopChallenges({ challenge, index}: LeaderboardChallenges) {

    let medal = null;
    if (index === 0) medal = "🥇";
    else if (index === 1) medal ="🥈";
    else if (index === 2) medal ="🥉";

    return (
            <li>{medal && <span style={{marginRight: "8px"}}>{medal}</span>}
            {index + 1} - <Link to={`/challenge/${challenge.id}`}> {challenge.name} : {challenge.users.length} participations </Link></li>
    )
}
