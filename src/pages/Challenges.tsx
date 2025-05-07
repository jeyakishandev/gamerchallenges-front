import { useEffect, useState } from "react";
import { IChallenges } from "../@types";
import { getChallenges } from "../api";
import ChallengesCard from "../components/ChallengesCard";
import FormulaireChallenge from "../components/FormulaireChallenge";


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

    const [form, setForm] = useState(false);
    
    return (
        <main>
            <h1 className="main-title challenges-title">Tous les challenges en cours</h1>
            <h2 className="subtitle challenges-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Cras auctor, nisi tempus lacinia pulvinar, ligula 
                est efficitur tortor, sit amet rhoncus justo tellus sed erat.
                Sed hendrerit mauris id velit</h2>

                <div className="button-container">
                    <button 
                        className="default-button"
                        onClick={() => setForm(current => !current)}> {/* Toggle sur le bouton pour afficher ou fermer le formulaire de création d'un challenge */}
                            {form ? "Fermer le formulaire" : "Créer un challenge"} {/* On change le texte du bouton en fonction de l'état du formulaire (ouvert ou fermé) */}
                    </button>
                </div> 
                {form && (
                    <section>
                        <FormulaireChallenge />
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