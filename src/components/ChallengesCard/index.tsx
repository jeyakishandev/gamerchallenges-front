import { Link } from "react-router-dom"
import { IChallenge } from "../../@types"
import "./style.css"


interface ChallengesCardProps {
    challenge: IChallenge
}

export default function ChallengesCard({ challenge }: ChallengesCardProps) {
    const embedUrl = challenge.video_url.replace("watch?v=", "embed/") + "?mute=1";
    return (              
        <article className="card" key={challenge.id}>
            <h3 className="card-title items">{challenge.name}</h3>
                <iframe className="card-video" src={embedUrl}
                  title={`challenge-${challenge.id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                <div className="card-tags">
                    <p style={{backgroundColor: challenge.category.color}}>{challenge.category.name}</p>
                    <p style={{backgroundColor: challenge.difficulty.color}}>{challenge.difficulty.name}</p>
                    <p>{challenge.users.length} participants</p>
                </div>
                <Link to={`/challenges/${challenge.id}`} className="default-button card-details">Détails</Link>
        </article>  
    )
}