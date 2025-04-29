import "./Leaderboard.css"
import { IChallenge } from "../../@types"
import { Link } from "react-router-dom";

interface LeaderboardChallenges {
    challenge : IChallenge
}

export default function LeaderboardTopChallenges({ challenge }: LeaderboardChallenges) {
    return (
        <ul className="list-chall">
            <li>1- <Link to="/challenge/1">Speedrun : 35 899 participations</Link></li>
            <li>2- <Link to="/challenge/2">100% : 32 408 participations </Link></li>
            <li>3- <Link to="/challenge/3">Shiny Race : 30 941 participations </Link></li>
            <li>4- <Link to="/challenge/4">Any Damage : 27 369 participations </Link></li>
            <li>5- <Link to="/challenge/5">Nuzlock Challenge : 24 197 participations </Link></li>
            <li>6- <Link to="/challenge/6">Randomizer : 23 572 participations </Link></li>
            <li>7- <Link to="/challenge/7">Record de Kills : 20 753 participations </Link></li>
            <li>8- <Link to="/challenge/8">No Death Run : 14 125 participations </Link></li>
            <li>9- <Link to="/challenge/9">Pascifist Run : 10 193 participations </Link></li>
            <li>10- <Link to="/challenge/10">Instrument Challenge : 999 participations </Link></li>
        </ul>
    )
}
