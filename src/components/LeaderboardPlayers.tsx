import { Link } from "react-router-dom"
import { IUser } from "../@types"

interface LeaderboardPlayers {
    players : IUser
    index: number
}

// Rempli chaque ligne de la liste par les informations du joueur concerné
export default function LeaderboardTopPlayers ({players, index}: LeaderboardPlayers) {

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
            {index + 1}- <Link className={className}to={`/profile/${players.id}`}> <img
                        className="avatar"
                        src={`http://localhost:3000/uploads/${players?.avatar_url}`}
                        alt={`Avatar de ${players?.pseudo || "l'utilisateur"}`}
                        style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                    /> {players.pseudo} : {players.challenges.length} challenges</Link> </li>
    )
}