import { Link } from "react-router-dom"
import { IUser } from "../../@types"
import "./Leaderboard.css"


interface LeaderboardPlayers {
    players : IUser
}

export default function LeaderboardTopPlayers ({players}: LeaderboardPlayers) {
    return (
        <li>1- <Link to={`/profile/${players.id}`}> {players.pseudo} : {players.challenges.length} challenges</Link> </li>
    )
}
