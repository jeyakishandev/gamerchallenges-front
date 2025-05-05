import './Profile.css'
import { IUser } from "../../@types"

interface ProfilesUsers {
    users: IUser
}

export default function ProfileInfos({users}: ProfilesUsers) {
    return (
        <div className="perso-info">
            <h2 className="main-title">Retrouvez ici ton profile, avec tes informations personnelles, et tes défis !</h2>
            <section className="button-container">
                <a href="#" className="default-button">Modifier le profile</a>
            </section>
            <p className="avatar">{users.avatar_url}</p>
            <p className="pseudo">Pseudo : {users.pseudo}</p>
        </div>
    )
}