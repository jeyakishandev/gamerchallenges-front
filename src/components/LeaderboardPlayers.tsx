import { Link } from "react-router-dom"
import { IUser } from "../@types"


interface LeaderboardPlayers {
    players : IUser
}

// Rempli chaque ligne de la liste par les informations du joueur concerné
export default function LeaderboardTopPlayers ({players}: LeaderboardPlayers) {
    return (
        <li>1- <Link to={`/profile/${players.id}`}> {players.pseudo} : {players.challenges.length} challenges</Link> </li>
    )
}
