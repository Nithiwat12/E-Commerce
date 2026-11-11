import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";
import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import Navbar from "./component/navbar";
import axios from "axios";

function AppContent() {
  const [IsLogin, setIsLogin] = useState(false);
  const hideNavbar = ["/login", "/register"];
  const location = useLocation();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.get(
          "http://localhost:5000/api/auth/me",
          { withCredentials: true }
        );

        setIsLogin(true);
      } catch {
        setIsLogin(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <>
      {!hideNavbar.includes(location.pathname) && (
        <Navbar IsLogin={IsLogin} setIsLogin={setIsLogin} />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsLogin={setIsLogin} />}
        />
      </Routes>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;