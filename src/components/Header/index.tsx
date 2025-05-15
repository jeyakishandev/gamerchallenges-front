import { useEffect, useRef, useState } from "react";
import "./style.css";
import logo from "../../assets/logo-transparent.svg";
import BurgerIcon from "./BurgerIcon";
import { NavLink, Link } from "react-router-dom";
import useAuthStore from "../../store";

export default function Header() {
    // Etat pour gérer l'ouverture/fermeture du menu burger (mobile).
    const [menuOpen, setMenuOpen] = useState(false); // Fermé par défaut.

    // Références vers les éléments du DOM pour le menu (ul) et le bouton burger (button).
    const menuRef = useRef<HTMLUListElement | null>(null);
    const burgerRef = useRef<HTMLButtonElement | null>(null);

     // Récupère l'utilisateur connecté depuis dans le store d'authentification.
    const { user } = useAuthStore();
    const baseUrl = import.meta.env.VITE_API_URL;
    const [localAvatarUrl, setLocalAvatarUrl] = useState(user?.avatar_url ? `${baseUrl}/uploads/${user.avatar_url}` : null);

    //* Use effect to handle avatar changes 
    useEffect(() => {
        if (user?.avatar_url) {
            setLocalAvatarUrl(`${baseUrl}/uploads/${user.avatar_url}`);
        }
    }, [user?.avatar_url]);

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

        // Nettoie l'écouteur lors du démontage du composant (= quand le menu n'est plus ouvert).
        return () => {
            window.removeEventListener('resize', checkScreenSize)
        };
    }, [menuOpen]) // S'exécute à chaque changement de menuOpen, mais agit uniquement si menuOpen est ouvert.

    // Fermer le menu burger si clic en dehors du menu ET du bouton.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuOpen) {
                
                const clickOutsideMenu = menuRef.current && !menuRef.current.contains(event.target as Node);
                const clickOutsideBurger = burgerRef.current && !burgerRef.current.contains(event.target as Node);

                /**
                 * Si le clic ne se produit NI sur le menu (menuRef) 
                 * NI sur le bouton burger (burgerRef), alors on ferme le menu.
                 */
                if (clickOutsideMenu && clickOutsideBurger) {
                    setMenuOpen(false);
                }
            }
        };
        // Ajoute un écouteur dsur tous les clics de la page.
        document.addEventListener("mousedown", handleClickOutside);

        // Nettoie l'écouteur lors du démontage du composant.
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Logo Gamer Challenges" />
                </Link>
            </div>
            
            <ul ref={menuRef} className={`navbar${menuOpen ? " open" : ""}`}>
                {/** Quand un utilisateur est authentifé, son avatar s'affiche dans le header. Au clic il est renvoyé vers sa page de profil */}
                {user && (
                    
                        <NavLink to={`/profile/${user.id}`}>
                        <img
                            src={localAvatarUrl ? localAvatarUrl : undefined}
                            alt={`Profil de ${user.pseudo}`}
                            className="profil-picture mobile-only"
                        />
                        </NavLink>
                           
                )}
                <li><NavLink to="/">Accueil</NavLink></li>
                <li><NavLink to="/challenges">Challenges</NavLink></li>
                <li><NavLink to={`/leaderboard`}>Classement</NavLink></li>

                {/** S'il n'y a pas d'utilisateur authentifié, lien pour se connecter, sinon lien pour se déconnecter. */}
                {!user ?
                    <li className="mobile-only"><NavLink to="/connexion">Se connecter</NavLink></li>
                    : 
                    <li className="mobile-only"><NavLink to="/logout">Se déconnecter</NavLink></li>
                }
                                
            </ul>
            <div className="desktop-only">
                {!user ? 
                    <NavLink to="/connexion">Se connecter</NavLink>
                    :
                    <>
                        <NavLink to={`/profile/${user.id}`}>
                            <img 
                                src={localAvatarUrl ? localAvatarUrl : undefined} 
                                alt={`photo de profil de ${user.pseudo}`} 
                                className="profil-picture"
                            />
                        </NavLink>
                        <NavLink to="/logout">Se déconnecter</NavLink>
                    </>
                    
                }
            </div>
            
            <button ref={burgerRef} className="burger" onClick={() => setMenuOpen(!menuOpen)}>
                <BurgerIcon />
            </button>
        </header>
    )
}