

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

  
function App() {
  return (
    <>
      
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/challenges/" />
        <Route path="/challenges/:id" />
        <Route path="/leaderbord/" />
        <Route path="/profile/:id" />
      </Routes>

      <Footer />

      
     
    </>
  );
}
export default App;
