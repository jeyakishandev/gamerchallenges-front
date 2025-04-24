import logo from "../../assets/logo-transparent.svg";
//import "./style.css";

export default function Header() {
    return (
        <header className="header">
            <a href="#" className="logo">
                <img src={logo} alt="Logo Gamer Challenges" />
            </a>
            <ul className="navbar">
                <li><a href="#">Accueil</a></li>
                <li><a href="#">Challenges</a></li>
                <li><a href="#">Classement</a></li>
            </ul>
            <a href="#">Inscription/Connexion</a>
        </header>
    )
}