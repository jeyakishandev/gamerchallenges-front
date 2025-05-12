
import '../App.css'
import { IChallenge } from "../@types"
import { Link } from 'react-router-dom'

interface CreatedChallenges {
    challenge: IChallenge
}

export default function CreatedChall({ challenge }: CreatedChallenges) {

    const embedUrl = challenge.video_url.replace("watch?v=", "embed/") + "?mute=1";

    return (

        <article className="boxes default-box-design" key={challenge.id}>

            <h3 className="low-title card-title items">{challenge.name}</h3>
            <iframe className="card-video" src={embedUrl}
                    title={`challenge-${challenge.id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

            <div className="card-tags">

                <p className="default-tag-design challenges-tag" style={{backgroundColor: challenge.category.color}}>{challenge.category.name}</p>
                <p className="default-tag-design challenges-tag" style={{backgroundColor: challenge.difficulty.color}}>{challenge.difficulty.name}</p>
                <p className="default-tag-design challenges-tag" >{challenge.users.length} participants</p>
                
            </div>
                <Link to={`/challenges/${challenge.id}`} className="default-button card-details">Détails</Link>
        </article>  
    )
}