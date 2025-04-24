import { useState } from "react";
import logo from "../../assets/logo-transparent.svg";
import BurgerIcon from "./burgerIcon";
import "./style.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="header">
            <a href="#" className="logo">
                <img src={logo} alt="Logo Gamer Challenges" />
            </a>

            <ul className={`navbar${menuOpen ? " open" : ""}`}>
                <li><a href="#">Accueil</a></li>
                <li><a href="#">Challenges</a></li>
                <li><a href="#">Classement</a></li>
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