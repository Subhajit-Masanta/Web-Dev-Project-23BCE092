/*SUBHAJIT MASANTA 23BCE0292*/
import { useEffect, useState, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Encoder from "./Encoder";
import Decoder from "./Decoder";
import Landing from "./Landing";
import Login from "./Login";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (isAuthenticated) {
          alert("Logged out due to inactivity.");
          logout();
        }
      }, 100000); // 60 sec = 60000ms
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);
    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [isAuthenticated, logout]);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Secret Spy Ciphers</h1>
        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>
      <main className="app-main">
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />} /*SUBHAJIT MASANTA 23BCE0292*/
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/encode"
            element={
              <ProtectedRoute>
                <Encoder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/decode"
            element={
              <ProtectedRoute>
                <Decoder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>CLASSIFIED: For Authorized Agents Only</p>
        <p>Created by Subhajit Masanta</p>
        <p>© 2025 XEON Intelligence Division | All Rights Reserved | Classified</p>
      </footer>
    </div>
  );
}

export default App;
/*SUBHAJIT MASANTA 23BCE0292*/
