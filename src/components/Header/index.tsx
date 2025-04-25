import { useEffect, useState } from "react";
import "./style.css";
import logo from "../../assets/logo-transparent.svg";
import BurgerIcon from "./BurgerIcon";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false); // Menu burger fermé par défaut.

    useEffect(() => {
        // Vérifier la largeur de la fenêtre du navigateur et fermer le menu burger si elle est supérieure à 768px.
        const checkScreenSize = () => {
            if (window.innerWidth > 768 && menuOpen) {
                setMenuOpen(false);
            }
        };
        
        // Ajouter d'un écouteur d'évenement sur la taille de la fenêtre.
        window.addEventListener('resize', checkScreenSize);

        // Appeler de la fonction.
        checkScreenSize();

        // Nettoyer l'écouter d'évenement lors du démontage du composant.
        return () => {
            window.removeEventListener('resize', checkScreenSize)
        };
    }, [menuOpen]) // Appeler le hook que si menuOpen === true.
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Logo Gamer Challenges" />
                </Link>
            </div>
            

            <ul className={`navbar${menuOpen ? " open" : ""}`}>
                <li><NavLink to="/">Accueil</NavLink></li>
                <li><NavLink to="/challenges">Challenges</NavLink></li>
                <li><NavLink to={`/leaderboard`}>Classement</NavLink></li>
                <li className="mobile-only"><a href="#">Se connecter</a></li>                
            </ul>

            <div className="login desktop-only">
                <a href="#">Se connecter</a>
            </div>
            
            <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
                <BurgerIcon />
            </button>
        </header>
    )
}