import { Link } from 'react-router-dom'
import { IChallenge, } from '../../@types'
import '../../App.css'

interface CompletedChallenge {
    challenge: IChallenge
}

    export default function CompletedChall({ challenge }: CompletedChallenge) {

        const embedUrl = challenge.video_url.replace("watch?v=", "embed/") + "?mute=1";

        return ( 

            <article className="card default-box-design" key={challenge.id}>

                <h3 className="low-title card-title items">{challenge.name}</h3>
                <iframe className="card-video" src={embedUrl}
                        title={`challenge-${challenge.id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    
                <div className="card-tags">

                    <p className="default-tag-design challenges-tag" style={{backgroundColor: challenge.category.color}}>{challenge.category.name}</p>
                    <p className="default-tag-design challenges-tag" style={{backgroundColor: challenge.difficulty.color}}>{challenge.difficulty.name}</p>

                </div>

                    <Link to={`/challenges/${challenge.id}`} className="default-button card-details">Détails</Link>

            </article>  
        )
}