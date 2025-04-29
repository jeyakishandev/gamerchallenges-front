import "./Leaderboard.css"
import { IChallenge } from "../../@types"
import { Link } from "react-router-dom";

interface LeaderboardChallenges {
    challenge : IChallenge
}

export default function LeaderboardTopChallenges({ challenge }: LeaderboardChallenges) {
    return (
        <ul className="list-chall">
            <li>1- <Link to={`/challenge/${challenge.id}`}> {challenge.name} : {challenge.users.length} participations </Link></li>
        </ul>
    )
}
