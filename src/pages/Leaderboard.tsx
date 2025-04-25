import "./Leaderboard.css"

export default function Leaderboard() {
    return (
        <>
            <main className="lead-content">
                <h2 className="main-title">Vous pourrez retrouver ici le classement des meilleurs joueurs et des challenges les plus jouer. </h2>

                <div className="lead-boxes">
                    <section className="best-challenges">
                        <h3>Challenges populaires</h3>
                        <ul className="list-chall">
                            <li className="first-li-chall">1- Speedrun : 35 899 participations </li>
                            <li>2- 100% : 32 408 participations </li>
                            <li>3- Shiny Race : 30 941 participations </li>
                            <li>4- Any Damage : 27 369 participations </li>
                            <li>5- Nuzlock Challenge : 24 197 participations </li>
                            <li>6- Randomizer : 23 572 participations </li>
                            <li>7- Record de Kills : 20 753 participations </li>
                            <li>8- No Death Run : 14 125 participations </li>
                            <li>9- Pascifist Run : 10 193 participations </li>
                            <li className="last-li-chall">10- Instrument Challenge : 999 participations </li>
                        </ul>
                    </section>

                    <section className="best-players">
                        <h3>Meilleurs joueurs</h3>
                        <ul className="list-players">
                            <li className="first-li-players">1- Alice : 456 challenges</li>
                            <li>2- Benjamin : 367 challenges</li>
                            <li>3- Clara : 359 challenges</li>
                            <li>4- David : 304 challenges</li>
                            <li>5- Emma : 291 challenges</li>
                            <li>6- Félix : 246 challenges</li>
                            <li>7- Gabrielle : 199 challenges</li>
                            <li>8- Hugo : 120 challenges</li>
                            <li>9- Inès : 92 challenges</li>
                            <li className="last-li-players">10- Julien : 78 challenges</li>
                            <li className="perso-li-players">46 - Moi : 1 challenge</li>
                        </ul>
                    </section>
                </div>

            </main>
            
        </>
    )
}