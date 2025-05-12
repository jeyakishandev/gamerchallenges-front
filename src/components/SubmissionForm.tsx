import { useState } from "react";
import "../App.css";
import { addSubmissionToChallenge } from "../api";

interface SubmissionFormProps {
    close: () => void;
    challengeId: number;
    onSuccess: () => void;
}

export default function SubmissionForm({ close, challengeId, onSuccess }: SubmissionFormProps){
    const [videoUrl, setVideoUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSucces] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            // Récupérer le token, il sera envoyé dans la requête HTTP vers l'API.
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Connectes toi pour participer à un challenge.");
                return;
            }

            // Vérifier si l'URL de la vidéo est bien fournie.
            if (!videoUrl.trim()) {
                setError("L'URL de la vidéo est obligatoire pour participer.");
                return;
            }

            // Soumettre la participation à l'API pour l'enregistrer en BDD.
            await addSubmissionToChallenge(
                challengeId,
                videoUrl,
                token
            );

            setSucces(true);
            onSuccess();
            close();

        } catch(error) {
            console.error("Erreur lors de l'enregistrement.", error)
        }
    }
    

    return (
        <div className="default-form-container default-form default-box-design">
            <form onSubmit={handleSubmit}>
                <p className="default-text">Envoie nous tes exploits !</p>
                {error && <div style={{ color: "red" }}>{error}</div>}
                {success && <div style={{ color: "green"}}>Participation enregistrée !</div>}

                <input 
                    type="text"
                    className="form-input"
                    name="video_url"
                    placeholder="URL de la vidéo"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />
                
                <div className="form-button">
                    <button 
                        type="submit" 
                        className="default-button"
                    >
                        Soumettre
                    </button>

                    <button 
                        className="default-button"
                        onClick={close}
                    >
                        Fermer
                    </button>
                </div>
                
                
            </form>
        </div>
    )
}