import Footer from "./components/Footer/Footer";
import "./App.css";


function App() {
  return (
    <>
      {/* plus tard le Header ici */}
      <main className="home-content">
        <h1>Prêt à relever le challenge ?</h1>
        <p>
          Montrez-nous ce que vous avez dans le ventre !<br />
          Postez vos vidéos, défiez les autres, et grimpez au sommet.
        </p>

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
