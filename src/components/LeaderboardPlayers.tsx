import { Link } from "react-router-dom"
import { IUser } from "../@types"


interface LeaderboardPlayers {
    players : IUser
    index: number
}

// Rempli chaque ligne de la liste par les informations du joueur concerné
export default function LeaderboardTopPlayers ({players, index}: LeaderboardPlayers) {

    let medal = null;
    if (index === 0) medal = "🥇";
    else if (index === 1) medal ="🥈";
    else if (index === 2) medal ="🥉";

    return (
        <li>{medal && <span style={{marginRight: "8px"}}>{medal}</span>}
            {index + 1}- <Link to={`/profile/${players.id}`}> {players.pseudo} : {players.challenges.length} challenges</Link> </li>
    )
}
