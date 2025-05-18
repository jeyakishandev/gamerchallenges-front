import { Link } from 'react-router-dom';
import { IChallenge } from '../@types';
import '../App.css';
import { getYoutubeEmbedUrl } from '../utils/youtube';
import { useState } from 'react';
import { deleteUserSubmission, updateUserSubmission } from '../api';
import useAuthStore from '../store';

interface CompletedChallenge {
    challenge: IChallenge;
    userId: number;
}

export default function CompletedChall({ challenge, userId }: CompletedChallenge) {
    const [videoUrl, setVideoUrl] = useState(challenge.Submission?.video_url || "");
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const embedUrl = getYoutubeEmbedUrl(videoUrl);

    const token = useAuthStore(state => state.token);
    const user = useAuthStore(state => state.user);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(false);

        if (!token) {
            setError("Tu dois être connecté pour modifier ta participation.");
            return;
        }

        if (!videoUrl.trim()) {
            setError("Le lien de la vidéo est obligatoire.");
            return;
        }

        try {
            const result = await updateUserSubmission(userId, challenge.id, videoUrl, token);
            if (result) {
                setSuccess(true);
                setIsEditing(false);
            } else {
                setError("La mise à jour à échoué.");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour", error);
            setError("Une erreur est survenue.");
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Es-tu sûr de vouloir supprimer ta participation ?");
        if (!confirmed) return;

        if (!token) {
            setError("Tu dois être connecté pour supprimer ta participation.");
            return;
        }

        try {
            const result = await deleteUserSubmission(userId, challenge.id, token);
            if (result) {
                setDeleted(true);
            } else {
                setError("Erreur lors de la suppression.");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression", error);
            setError("Une erreur est survenue. Suppression impossible, merci de réessayer plus tard.");
        }
    };

    if (deleted) return null;

    return (
        <article className="boxes default-box-design" key={challenge.id}>
            <h3 className="low-title card-title items">{challenge.name}</h3>
            {user?.id === userId && (
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
                        onClick={handleDelete}
                    >
                        🗑️
                    </button>
                </div>
            )}
            {isEditing ? (
                <form onSubmit={handleSubmit} className="profile-edit-form">
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">Lien mis à jour !</p>}
                    <input
                        type='text'
                        className='form-input profile-form-input'
                        name='video_url'
                        placeholder='URL de la vidéo'
                        value={videoUrl}
                        onChange={(event) => setVideoUrl(event.target.value)}
                    />
                    <div className='form-button profile-form-buttons'>
                        <button type='submit' className='default-button profile-button'>Enregistrer</button>
                        <button type='button' className='default-button profile-button' onClick={() => setIsEditing(false)}>Annuler</button>
                    </div>
                </form>
            ) : (
                <iframe className="card-video" src={embedUrl}
                    title={`challenge-${challenge.id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="no-referrer" allowFullScreen></iframe>
                        )}
                        <div className="card-tags">
                            {challenge.category && (
                                <p className="default-tag-design challenges-tag" style={{ backgroundColor: challenge.category.color }}>
                                    {challenge.category.name}
                                </p>
                            )}
                            {challenge.difficulty && (
                                <p className="default-tag-design challenges-tag" style={{ backgroundColor: challenge.difficulty.color }}>
                                    {challenge.difficulty.name}
                                </p>
                            )}
            </div>
            <Link to={`/challenges/${challenge.id}`} className="default-button card-details">Détails</Link>
        </article>
    );
}