import { Link } from 'react-router-dom'
import { IChallenge, } from '../../@types'
import '../../App.css'
import '../../pages/Profil.css'

interface CompletedChallenge {
    challenge: IChallenge
}

export default function CompletedChall({challenge}: CompletedChallenge) {
    console.log("challenge:", challenge.name)
    return (
            <div className="chall-box">

                <div className="chall-pres">

                    <section className="video">
                        <iframe className="card-video" src={challenge.video_url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </section>

                    <section className="chall-info">
                        <p className="chall-name">{challenge.name}</p>
                        <p className="chall-tag" /* style={{backgroundColor: challenge.category.color}} */>{/* {challenge.category.name} */}</p>
                        <p className="chall-diff" /* style={{backgroundColor: challenge.difficulty.color}} */ >{/* {challenge.difficulty.name} */}</p>
                        <p className="chall-submission"> Particpations : {/* {challenge.users.length} */}</p>
                    </section>

                </div>

                <div className="button-container">
                    <Link to={`/challenges/${challenge.id}`} className="default-button card-details">Détails</Link>
                </div>

            </div>
    )
}