import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { ArticlesContainer } from "./components/ArticlesContainer";
//import { Header } from "./components/Header";
import { MainArticle } from "./components/MainArticle";
import { NewContainer } from "./components/NewContainer";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light'); // Estado para el tema

  // Verificar si hay un tema guardado en localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/user', { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Función para alternar entre los temas
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log("Changing theme to:", newTheme); // Debug
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Router>
      <NavBar user={user} toggleTheme={toggleTheme} theme={theme} />
      <main className="px-4 pt-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-xl">Cargando...</p>
          </div>
        ) : user ? (
          <>            
            <div className="sm:flex sm:gap-8">
              <MainArticle />
              <NewContainer />
            </div>
            <ArticlesContainer />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
            <button 
              onClick={() => window.location.href = 'http://localhost:5000/auth/google'} 
              className="bg-blue-500 text-white py-2 px-4 rounded mb-2"
            >
              Iniciar con Google
            </button>
            <button 
              onClick={() => window.location.href = 'http://localhost:5000/auth/github'} 
              className="bg-gray-700 text-white py-2 px-4 rounded"
            >
              Iniciar con GitHub
            </button>
          </div>
        )}
      </main>
    </Router>
  );
}

export default App;
