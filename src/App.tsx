import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

<<<<<<< HEAD
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
=======

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

import Creation from "./pages/Creation";

import RequireAuth from "./components/ProtectedRoute/RequireAuth";

import Logout from "./pages/logout";

import EditChallenge from "./pages/EditChallenge";

import { UpdateProfile } from "./pages/UpdateProfile";

import NotFound from "./pages/404NotFound";





  
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
        <Route path="/creation" element={ 
        <RequireAuth>
          <Creation />
          </RequireAuth>
        } />

        <Route
          path="/challenges/:id/edit"
          element={
            <RequireAuth>
              <EditChallenge />
            </RequireAuth>
          }
        />

        <Route
          path="/profile/:id/modifier"
          element={
            <RequireAuth>
              <UpdateProfile />
            </RequireAuth>
          }
        />

       <Route path="*" element={<NotFound />} />


       
       <Route path="/challenges/:id/edit" element={<EditChallenge />} />
        
      </Routes>

      <Footer />

      
     
>>>>>>> f53580014555b12d0053dd7943cdcbdacf0f6fd2
    </>
  )
}

export default App
