import "./About.css";

export default function About() {
    return(
        <>
            <h1>À propos</h1>

            <div className="about-content">
                <p>
                    <strong>Gamer Challenges</strong> est un projet développé par une équipe de 4 personnes dans le cadre de notre formation en développement web et web mobile.
                </p>
                <p>
                    Notre objectif est de créer une plateforme dédiée aux amateurs de jeux vidéos, où chacun peut proposer ou relever des défis sur ses jeux préférés.
                </p>
                <p>
                    L'équipe projet est composée de :
                    <ul>
                        <li>Benjamin</li>
                        <li>Kishan</li>
                        <li>Mathias</li>
                        <li>Sandrine</li>
                    </ul>
                </p>
            </div>
           
        </>
    )
}