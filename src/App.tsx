

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";
import Profil from "./pages/Profil";
import { Challenge } from "./pages/Challenge";
import { Connection } from "./pages/Connexion";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";



  
function App() {
  return (
    <>
      
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/challenges/" element={<Challenges />}/>
        <Route path="/challenges/:id" element={<Challenge/>}/>
        <Route path="/leaderboard/" element={<Leaderboard />} />
        <Route path="/connexion/" element={<Connection />} />
        <Route path="/profile/:id" element={<Profil />}/>
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />

      
     
    </>
  );
}
export default App;
