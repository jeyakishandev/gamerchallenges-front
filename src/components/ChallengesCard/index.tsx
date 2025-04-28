import { Link } from "react-router-dom"
import { IChallenge } from "../../@types"
import "./style.css"


interface ChallengesCardProps {
    challenge: IChallenge
}

export default function ChallengesCard({ challenge }: ChallengesCardProps) {
    return (              
        <article className="card" key={challenge.id}>
            <h3 className="card-title items">{challenge.name}</h3>
                <iframe className="card-video" src={challenge.videoId} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                <div className="card-tags items">
                    <p>{challenge.category_id}</p>
                    <p>{challenge.difficulty_id}</p>
                    <p>{challenge.submissions.length} participants</p>
                </div>
                <Link to={`/challenges/${challenge.id}`} className="default-button card-details">Détails</Link>
        </article>  
    )
}