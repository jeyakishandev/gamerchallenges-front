import { IChallenge } from "../@types"
import { Link } from "react-router-dom";

interface LeaderboardChallenges {
    challenge : IChallenge
    index: number
}

// Rempli chaque ligne de la liste par les informations du challenge concerné
export default function LeaderboardTopChallenges({ challenge, index}: LeaderboardChallenges) {

    let medal = null;
    let className = "";

    if (index === 0) {
        medal = "👑";
        className = "gold";
    }
    else if (index === 1) {
        medal ="🥈";
        className = "silver";
    }
    else if (index === 2) {
        medal ="🥉";
        className = "bronze";
    }

    return (
            <li className={className}>{medal && <span style={{marginRight: "8px"}}>{medal}</span>}
            {index + 1} - <Link className={className }to={`/challenges/${challenge.id}`}> {challenge.name} : {challenge.users.length} participations </Link></li>
    )
}
