import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Menu, X, Home, User, Settings, LogOut, Users } from 'lucide-react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function Header() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth'); // Redireciona para a página de autenticação após o logout
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Team HIIT
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => navigate(currentUser ? '/community' : '/auth')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <Users className="w-4 h-4" />
              <span>Comunidade</span>
            </button>

            {currentUser && (
              <>
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Foto de Perfil" className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span>Perfil</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                  <Settings className="w-4 h-4" />
                  <span>Configurações</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              </>
            )}
            {!currentUser && (
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <User className="w-4 h-4" />
                <span>Entrar</span>
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <nav className="space-y-2">
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-left"
              >
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => {
                  navigate(currentUser ? '/community' : '/auth');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-left"
              >
                <Users className="w-5 h-5" />
                <span>Comunidade</span>
              </button>
              
              {currentUser && (
                <>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-left"
                  >
                    {currentUser.photoURL ? (
                      <img src={currentUser.photoURL} alt="Foto de Perfil" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                    <span>Perfil</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-left"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Configurações</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sair</span>
                  </button>
                </>
              )}
              {!currentUser && (
                <button
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 text-left"
                >
                  <User className="w-5 h-5" />
                  <span>Entrar</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;



