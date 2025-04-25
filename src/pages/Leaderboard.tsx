export default function Leaderboard() {
    return (
        <>
            <main className="lead-content">
                <p>Vous pourrez retrouver ici le classement des meilleurs joueurs et des challenges les plus jouer. </p>

                <section className="best-challenges">
                    <p>Challenges populaires</p>
                    <ul>
                        <li>1- Speedrun : 35 899 participations </li>
                        <li>2- 100% : 32 408 participations </li>
                        <li>3- Shiny Race : 30 941 participations </li>
                        <li>4- Any Damage : 27 369 participations </li>
                        <li>5- Nuzlock Challenge : 24 197 participations </li>
                        <li>6- Randomizer : 23 572 participations </li>
                        <li>7- Record de Kills : 20 753 participations </li>
                        <li>8- No Death Run : 14 125 participations </li>
                        <li>9- Pascifist Run : 10 193 participations </li>
                        <li>10- Instrument Challenge : 9 999 participations </li>
                    </ul>
                </section>

                <section className="best-players">
                    <p>Meilleurs joueurs</p>
                    <ul>
                    <li>1- Alice : 456 challenges</li>
                    <li>2- Benjamin : 367 challenges</li>
                    <li>3- Clara : 359 challenges</li>
                    <li>4- David : 304 challenges</li>
                    <li>5- Emma : 291 challenges</li>
                    <li>6- Félix : 246 challenges</li>
                    <li>7- Gabrielle : 199 challenges</li>
                    <li>8- Hugo : 120 challenges</li>
                    <li>9- Inès : 92 challenges</li>
                    <li>10- Julien : 78 challenges</li>
                    <li>46 - Moi : 1 challenge</li>
                    </ul>
                </section>

                <ul className="best-players">

                </ul>
            </main>
            
        </>
    )
}