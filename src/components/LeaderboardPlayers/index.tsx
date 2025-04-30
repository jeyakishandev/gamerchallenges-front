/* import "./Leaderboard.css"
import { IUser } from "../../@types"
import { Link } from "react-router-dom";

interface LeaderboardPlayers {
    users : IUser
}

export default function LeaderboardTopPlayers({users}: LeaderboardPlayers) {
    console.log(users.challenges.length);
    return (
        <li>1- <Link to={`/challenge/${users.id}`}> {users.pseudo} : {users.challenges.length} participations </Link></li>
)
} */