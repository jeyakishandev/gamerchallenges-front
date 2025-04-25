import { Link } from "react-router-dom"
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
                            <li className="first-li-chall">1- <Link to="/challenge/1">Speedrun : 35 899 participations</Link></li>
                            <li>2- <Link to="/challenge/2">100% : 32 408 participations </Link></li>
                            <li>3- <Link to="/challenge/3">Shiny Race : 30 941 participations </Link></li>
                            <li>4- <Link to="/challenge/4">Any Damage : 27 369 participations </Link></li>
                            <li>5- <Link to="/challenge/5">Nuzlock Challenge : 24 197 participations </Link></li>
                            <li>6- <Link to="/challenge/6">Randomizer : 23 572 participations </Link></li>
                            <li>7- <Link to="/challenge/7">Record de Kills : 20 753 participations </Link></li>
                            <li>8- <Link to="/challenge/8">No Death Run : 14 125 participations </Link></li>
                            <li>9- <Link to="/challenge/9">Pascifist Run : 10 193 participations </Link></li>
                            <li className="last-li-chall">10- <Link to="/challenge/10">Instrument Challenge : 999 participations </Link></li>
                        </ul>
                    </section>

                    <section className="best-players">
                        <h3>Meilleurs joueurs</h3>
                        <ul className="list-players">
                            {/* Remplacer les ids dans le Link to par l'id de la base de donnée */}
                            <li className="first-li-players">1- <Link to="/profile/1">Alice : 456 challenges</Link></li>
                            <li>2- <Link to="/profile/2">Benjamin : 367 challenges</Link></li>
                            <li>3- <Link to="/profile/3">Clara : 359 challenges</Link></li>
                            <li>4- <Link to="/profile/4">David : 304 challenges</Link></li>
                            <li>5- <Link to="/profile/5">Emma : 291 challenges</Link></li>
                            <li>6- <Link to="/profile/6">Félix : 246 challenges</Link></li>
                            <li>7- <Link to="/profile/7">Gabrielle : 199 challenges</Link></li>
                            <li>8- <Link to="/profile/8">Hugo : 120 challenges</Link></li>
                            <li>9- <Link to="/profile/9">Inès : 92 challenges</Link></li>
                            <li className="last-li-players">10- <Link to="/profile/10">Julien : 78 challenges</Link></li>
                            <li className="perso-li-players">46 - <Link to="/profile/99">Moi : 1 challenge</Link></li>
                        </ul>
                    </section>
                </div>

            </main>
            
        </>
    )
}