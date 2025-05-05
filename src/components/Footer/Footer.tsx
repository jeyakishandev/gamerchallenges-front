import { Link } from "react-router-dom";
import "../Footer/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">© 2025 - GamerChallenges - Tous droits réservés</p>
      <div className="footer-links">
        <a href="/mentions-legales">Mentions légales</a>
        <Link to="/about">À propos</Link>
        <a href="/confidentialite">Politique de confidentialité</a>
      </div>
    </footer>
  );
}

export default Footer;
