import { useEffect, useState } from "react";
import { IChallenges } from "../@types";
import "./Challenges.css";
import { getChallenges } from "../api";
import ChallengesCard from "../components/ChallengesCard";


export default function Challenges() {
    const [challenges, setChallenges] = useState<IChallenges>([]);

    useEffect(() => {
        const loadData = async () => {
            const newChallenges = await getChallenges();
            setChallenges(newChallenges);
        };
        loadData();
    }, [])
    
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
                    {challenges.map((challenge) => {
                        return <ChallengesCard key={challenge.id} challenge={challenge} />
                    })}
                
                </div>
                
                
        </main>
    )
    
}