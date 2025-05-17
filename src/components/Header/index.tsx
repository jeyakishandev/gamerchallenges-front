import { useEffect, useRef, useState } from "react";
import "./style.css";
import logo from "../../assets/logo-transparent.svg";
import BurgerIcon from "./BurgerIcon";
import { NavLink, Link } from "react-router-dom";
import useAuthStore from "../../store";

export default function Header() {
    // État pour gérer l'ouverture/fermeture du menu burger (mobile).
    const [menuOpen, setMenuOpen] = useState(false); // Fermé par défaut.

    // Références vers les éléments du DOM pour le menu (ul desktop) et le bouton burger (button).
    const menuRef = useRef<HTMLUListElement | null>(null);
    const burgerRef = useRef<HTMLButtonElement | null>(null);
    // Référence pour le conteneur du menu fullscreen pour arrêter la propagation des clics.
    const fullscreenMenuRef = useRef<HTMLElement | null>(null);

     // Récupère l'utilisateur connecté depuis dans le store d'authentification.
    const { user } = useAuthStore();
    const baseUrl = import.meta.env.VITE_API_URL;
    const [localAvatarUrl, setLocalAvatarUrl] = useState(user?.avatar_url ? `${baseUrl}/uploads/${user.avatar_url}` : null);

    //* Use effect to handle avatar changes
    useEffect(() => {
        if (user?.avatar_url) {
            setLocalAvatarUrl(`${baseUrl}/uploads/${user.avatar_url}`);
        }
    }, [user?.avatar_url, baseUrl]);

    /**
     * Ferme le menu burger automatiquement si la fenêtre
     * est redimensionnée au delà de 768px de largeur
     */
    useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth > 768 && menuOpen) {
                setMenuOpen(false);
            }
        };

        // Ajoute un écouteur d'évenement lors du redimensionnement de la fenêtre.
        window.addEventListener('resize', checkScreenSize);

        // Appelle la fonction immédiatement pour gérer le cas initial.
        checkScreenSize();

        // Nettoie l'écouteur lors du démontage du composant.
        return () => {
            window.removeEventListener('resize', checkScreenSize)
        };
    }, [menuOpen]) // S'exécute à chaque changement de menuOpen, mais agit uniquement si menuOpen est ouvert.

    // Fermer le menu burger si clic en dehors du menu fullscreen ET du bouton burger.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuOpen) {
                // Vérifie si le clic est en dehors du contenu du menu fullscreen
                const clickOutsideFullscreenContent = fullscreenMenuRef.current && !fullscreenMenuRef.current.contains(event.target as Node);
                // Vérifie si le clic est en dehors du bouton burger
                const clickOutsideBurger = burgerRef.current && !burgerRef.current.contains(event.target as Node);

                // Fermer le menu si le clic est en dehors du contenu du menu *et* du bouton burger
                if (clickOutsideFullscreenContent && clickOutsideBurger) {
                    setMenuOpen(false);
                }
            }
        };
        // Ajoute un écouteur sur tous les clics de la page.
        document.addEventListener("mousedown", handleClickOutside);

        // Nettoie l'écouteur lors du démontage du composant.
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]); // Dépend de menuOpen


    // Fonction pour fermer le menu lorsqu'un lien est cliqué
    const handleNavLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Logo Gamer Challenges" />
                </Link>
            </div>

            {/* NAVBAR DESKTOP */}
            <ul ref={menuRef} className={`navbar desktop-only`}>
                
                <li><Link to="/" className="link-color">ACCUEIL</Link></li>
                <li><Link to="/challenges" className="link-color">CHALLENGES</Link></li>
                <li><Link to="/leaderboard" className="link-color">CLASSEMENT</Link></li>
            </ul>

            {/* AUTH LINKS DESKTOP */}
            <div className="desktop-only">
                {!user ?
                    <NavLink to="/connexion" className="default-button">Se connecter</NavLink>
                    :
                    <>
                        <NavLink to="/logout" className="default-button">Se déconnecter</NavLink>
                         {/* L'avatar desktop */}
                        <NavLink to={`/profile/${user.id}`}>
                            <img
                                src={localAvatarUrl ? localAvatarUrl : undefined}
                                alt={`photo de profil de ${user.pseudo}`}
                                className="profil-picture"
                            />
                        </NavLink>
                    </>
                }
            </div>

            {/* BOUTON BURGER MOBILE */}
            <button ref={burgerRef} className="burger mobile-only" onClick={() => setMenuOpen(!menuOpen)}>
                <BurgerIcon />
            </button>

            {/* MENU FULLSCREEN MOBILE */}
            {menuOpen && (
                <div className="fullscreen-menu" onClick={() => setMenuOpen(false)}>
                    <nav ref={fullscreenMenuRef} className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
                        <ul className="fullscreen-links">
                            {user && (
                                <li>
                                    <NavLink to={`/profile/${user.id}`} className="link-color" onClick={handleNavLinkClick}>
                                        <img
                                            src={localAvatarUrl ? localAvatarUrl : undefined}
                                            alt={`Profil de ${user.pseudo}`}
                                            className="profil-picture mobile-only"
                                        />
                                    </NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink to="/" className="link-color" onClick={handleNavLinkClick}>
                                🏠 Accueil
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/challenges" className="link-color" onClick={handleNavLinkClick}>
                                🎯 Challenges
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/leaderboard" className="link-color" onClick={handleNavLinkClick}>
                                🏆 Classement
                                </NavLink>
                            </li>
                        </ul>
                        <div className="fullscreen-logo">
                            <img src={logo} alt="Logo Gamer Challenges" />
                        </div>
                        <div className="fullscreen-footer">
                            {!user ? (
                                <NavLink to="/connexion" className="default-button" onClick={handleNavLinkClick}>
                                    Se connecter
                                </NavLink>
                            ) : (
                                <NavLink to="/logout" className="default-button" onClick={handleNavLinkClick}>
                                    Se déconnecter
                                </NavLink>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}



        
        

