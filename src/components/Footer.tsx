function Footer() {
    return (
      <footer className="bg-gray-800 text-white text-center p-4">
        <p className="text-sm">© 2025 - GamerChallenges - Tous droits réservés</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="/mentions-legales" className="hover:underline">Mentions légales</a>
          <a href="/a-propos" className="hover:underline">À propos</a>
          <a href="/confidentialite" className="hover:underline">Politique de confidentialité</a>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  