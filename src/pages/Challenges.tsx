import ChallengesCard from "../components/ChallengesCard";
import "./Challenges.css";
export default function Challenges() {
    
    return (
        <main>
            <h1>Tous les challenges en cours</h1>
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Cras auctor, nisi tempus lacinia pulvinar, ligula 
                est efficitur tortor, sit amet rhoncus justo tellus sed erat.
                Sed hendrerit mauris id velit</h2>

                <div className="button-container">
                    <a href="#" className="default-button">Créer un challenge</a>
                </div> 

                <div className="cards-container">
                <ChallengesCard />
                </div>
                
                
        </main>
    )
    
}