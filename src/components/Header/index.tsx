import { useEffect, useState } from "react";
import "./style.css";
import logo from "../../assets/logo-transparent.svg";
import BurgerIcon from "./BurgerIcon";
import { NavLink, Link } from "react-router-dom";
import useAuthStore from "../../store";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false); // Menu burger fermé par défaut.
    const { user } = useAuthStore();

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
                {user && (
                    
                        <NavLink to={`/profil`}>
                        <img
                            src={`http://localhost:3000/uploads/${user.avatar_url}`}
                            alt={`Profil de ${user.pseudo}`}
                            className="profil-picture mobile-only"
                        />
                        </NavLink>
                           
                )}
                <li><NavLink to="/">Accueil</NavLink></li>
                <li><NavLink to="/challenges">Challenges</NavLink></li>
                <li><NavLink to={`/leaderboard`}>Classement</NavLink></li>
                {!user ?
                    <li className="mobile-only"><NavLink to="/connexion">Se connecter</NavLink></li>
                    : 
                    <li className="mobile-only"><NavLink to="/logout">Se déconnecter</NavLink></li>
                }
                                
            </ul>
            <div className="login desktop-only">
                {!user ? 
                    <NavLink to="/connexion">Se connecter</NavLink>
                    :
                    <>
                        <NavLink to="/profil">
                            <img 
                                src={`http://localhost:3000/uploads/${user.avatar_url}`} 
                                alt={`photo de profil de ${user.pseudo}`} 
                                className="profil-picture"
                            />
                        </NavLink>
                        <NavLink to="/logout">Se déconnecter</NavLink>
                    </>
                    
                }
            </div>
            
            <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
                <BurgerIcon />
            </button>
        </header>
    )
}