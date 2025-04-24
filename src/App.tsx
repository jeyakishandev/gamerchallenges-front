

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

  
function App() {
  return (
    <>
      {/* plus tard le Header ici */}
      <Header />
      <main className="home-content">
      <h1 className="joti-title">Prêt à relever le challenge ?</h1>

        <p>
          Montrez-nous ce que vous avez dans le ventre !<br />
          Postez vos vidéos, défiez les autres, et grimpez au sommet.
        </p>
        <h1 style={{ fontFamily: 'Joti One, cursive', fontSize: '2rem' }}>
  Test Font Joti One ?
</h1>

        <div className="home-buttons">
          <button>Créer</button>
          <button>Participer</button>
        </div>
      </main>

      <Footer />

      
     
    </>
  );
}
export default App;
