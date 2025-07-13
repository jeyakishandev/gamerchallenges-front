import './App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";
import Profil from "./pages/Profil";
import Challenge from "./pages/Challenge";
import { Connection } from "./pages/Connexion";
import { ForgotPassword } from './pages/ForgotPasswordForm';
import Creation from "./pages/Creation";
import RequireAuth from "./components/ProtectedRoute/RequireAuth";
import Logout from "./pages/logout";
import EditChallenge from "./pages/EditChallenge";
import { UpdateProfile } from "./pages/UpdateProfile";
import NotFound from "./pages/404NotFound";
import { ResetPassword } from './pages/ResetPassword';





  
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
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile/:id" element={<Profil />}/>
        <Route path="/mot-de-passe-oublie" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/creation" element={ 
          <RequireAuth>
            <Creation />
          </RequireAuth>
        } />
        <Route path="/challenges/:id/edit" element={
          <RequireAuth>
            <EditChallenge />
          </RequireAuth>
        } />
        <Route path="/profile/:id/modifier" element={
          <RequireAuth>
            <UpdateProfile />
          </RequireAuth>
        }/>
        <Route path="*" element={<NotFound />} />        
      </Routes>
      <Footer />

      
     
    </>
  )
}

export default App
