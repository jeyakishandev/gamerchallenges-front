

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Challenge from "./pages/Challenge";
import Challenges from "./pages/Challenges";

  
function App() {
  return (
    <>
      
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/leaderboard/" element={<Leaderboard />} />
        <Route path="/challenges/"  element={<Challenges />}/>
        <Route path="/challenges/:id" element={<Challenge/>}/>
        <Route path="/leaderbord/" />
        <Route path="/profile/:id" />
      </Routes>

      <Footer />

      
     
    </>
  );
}
export default App;
