import { Link } from "react-router-dom"
import { IChallenge } from "../@types"
import "../App.css"
import { getYoutubeEmbedUrl } from "../utils/youtube";


interface ChallengesCardProps {
    challenge: IChallenge
}

export default function ChallengesCard({ challenge }: ChallengesCardProps) {
    const embedUrl = getYoutubeEmbedUrl(challenge.video_url);
    return (              
        <article className="card default-box-design " key={challenge.id}>
            <h3 className="low-title card-title items ">{challenge.name}</h3>
                <iframe className="card-video" src={embedUrl}
                title={`challenge-${challenge.id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="no-referrer" allowFullScreen></iframe>

                <div className="card-tags">
                    <p className="default-tag-design challenges-tag" style={{backgroundColor: challenge.category.color}}>{challenge.category.name}</p>
                    <p className="default-tag-design challenges-tag" style={{backgroundColor: challenge.difficulty.color}}>{challenge.difficulty.name}</p>
                    <p className="default-tag-design challenges-tag" >{challenge.users.length} participants</p>
                </div>
                <Link to={`/challenges/${challenge.id}`} className="default-button card-details">Détails</Link>
        </article>  
    )
}