import { useEffect, useState } from "react";
import { IChallenges } from "../@types";
import { getChallenges } from "../api";
import ChallengesCard from "../components/ChallengesCard";
import FormChallenge from "../components/FormChallenge";
import { Link } from "react-router-dom";
import useAuthStore from "../store";


export default function Challenges() {
    // Chargement des challenges depuis la BDD.
    const [challenges, setChallenges] = useState<IChallenges>([]);

    useEffect(() => {
        const loadData = async () => {
            const newChallenges = await getChallenges();
            setChallenges(newChallenges);
        };
        loadData();
    }, [])

    const { user } = useAuthStore();
    const [form, setForm] = useState(false);
    
    return (
        <main>
            <h1 className="main-title challenges-title">Tous les challenges en cours</h1>
            <h2 className="subtitle challenges-subtitle">Prêt à rentrer dans l'arène ? Choisis ton combat, envoie ta vidéo et gagne le respect !</h2>

                <div className="button-container">
                    {user ? (
                        <button 
                            className="default-button"
                            onClick={() => setForm(current => !current)}> {/* Toggle sur le bouton pour afficher ou fermer le formulaire de création d'un challenge */}
                                {form ? "Fermer le formulaire" : "Créer un challenge"} {/* On change le texte du bouton en fonction de l'état du formulaire (ouvert ou fermé) */}
                        </button>
                    ) : (
                        <Link className="default-button button-long-text" to="/connexion">
                            Connecte-toi pour créer un challenge
                        </Link>
                    )}
                </div> 
                {form && (
                    <section>
                        <FormChallenge isModal={true} />
                    </section>
                )}

                <div className="cards-container">
                    {challenges.map((challenge) => {
                        return <ChallengesCard key={challenge.id} challenge={challenge} />
                    })}
                
                </div>
                
                
        </main>
    )
    
}