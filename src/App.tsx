

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";
import { ChallengePage } from "./pages/Challenge";


  
function App() {
  return (
    <>
      
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/challenges/" element={<Challenges />}/>
        <Route path="/challenges/:id" element={<ChallengePage/>}/>
        <Route path="/leaderboard/" element={<Leaderboard />} />
        <Route path="/profile/:id" />
      </Routes>

      <Footer />

      
     
    </>
  );
}
export default App;
