import { Link } from 'react-router-dom'
import { IChallenge, } from '../../@types'
import '../../App.css'
import { getYoutubeEmbedUrl } from '../../utils/youtube'
import { useState } from 'react'
import { updateUserSubmission } from '../../api'


interface CompletedChallenge {
    challenge: IChallenge;
    userId: number;
}

export default function CompletedChall({ challenge, userId }: CompletedChallenge) {
    const [videoUrl, setVideoUrl] = useState(challenge.Submission?.video_url || "");
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [succes, setSucces] = useState(false);
  
    const embedUrl = getYoutubeEmbedUrl(videoUrl);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSucces(false);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Tu dois être connecté pour modifier ta participation.");
            return;
        }

        if (!videoUrl.trim()) {
            setError("Le lien de la vidéo est obligatoire.");
        }

        try {
            const result = await updateUserSubmission(userId, challenge.id, videoUrl);
            if (result) {
                setSucces(true);
                setIsEditing(false);
            } else {
                setError("La mise à jour à échoué.");
            }
        } catch(error) {
            console.error("Erreur lors de la mise à jour", error);
            setError("Une erreur est survenue.")
        }
    }
  
    return (
            
        <article className="card default-box-design" key={challenge.id}>

            <h3 className="low-title card-title items">{challenge.name}</h3>
            <div className="challenge-actions-inline">
                <button
                    className="icon-button"
                    title="Modifier"
                    onClick={() => setIsEditing(!isEditing)} 
                >
                    ✏️
                </button>
                <button
                    className="icon-button"
                    title="Supprimer"
                    
                >
                    🗑️
                </button>
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {succes && <p style={{ color: "green" }}>Lien mis à jour !</p>}
                    <input 
                        type='text'
                        className='form-input'
                        name='video_url'
                        placeholder='URL de la vidéo'
                        value={videoUrl}
                        onChange={(event) => setVideoUrl(event.target.value)}
                    />
                    <div className='form-button'>
                        <button type='submit' className='default-button'>Enregistrer</button>
                        <button type='submit' className='default-button' onClick={() => setIsEditing(false)}>Annuler</button>

                    </div>
                </form>
            ) : (
                <iframe className="card-video" src={embedUrl}
                    title={`challenge-${challenge.id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            )}

            

            <div className="card-tags">

                <p className="default-tag-design challenges-tag" style={{backgroundColor: challenge.category.color}}>{challenge.category.name}</p>
                <p className="default-tag-design challenges-tag" style={{backgroundColor: challenge.difficulty.color}}>{challenge.difficulty.name}</p>

            </div>

                <Link to={`/challenges/${challenge.id}`} className="default-button card-details">Détails</Link>

        </article>  
    )
}