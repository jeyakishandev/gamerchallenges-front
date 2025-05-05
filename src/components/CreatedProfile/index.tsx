import './Profile.css'
import { IChallenge } from "../../@types"
import { Link } from 'react-router-dom'

interface CreatedChallenges {
    challenges: IChallenge
}

export default function ProfileInfos({challenges}: CreatedChallenges) {
    return (

        <div className="chall-box" key={challenges.id}>

            <div className="chall-pres">

                <section className="video">
                    <iframe className="card-video" src={challenges.video_url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </section>

                <section className="chall-info">
                    <p className="chall-name">{challenges.name}</p>
                    <p className="chall-tag" style={{backgroundColor: challenges.category.color}}>{challenges.category.name}</p>
                    <p className="chall-diff" style={{backgroundColor: challenges.difficulty.color}}>{challenges.difficulty.name}</p>
                    <p className="chall-submission">{challenges.users.length}</p>
                </section>

            </div>

            <div className="button-container">
                <Link to={`/challenges/${challenges.id}`} className="default-button card-details">Détails</Link>
            </div>

        </div>
    )
}