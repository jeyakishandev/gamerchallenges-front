import { IUser } from "../@types";

interface PersoLeader {
    users : IUser
}

export default function PersoLeaderboard ({users}: PersoLeader) {
    return (
        <p>{users.id}</p>
    )
}