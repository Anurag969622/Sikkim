import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, Globe, Mountain } from 'lucide-react';

interface HeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const currentPath = location.pathname;

  const baseNavigationItems = [
    { id: '/', label: 'Home', labelNepali: 'घर', path: '/' },
    { id: '/virtual-tours', label: 'Virtual Tours', labelNepali: 'भर्चुअल टुर', path: '/virtual-tours' },
    { id: '/map', label: 'Map', labelNepali: 'नक्सा', path: '/map' },
    { id: '/archives', label: 'Archives', labelNepali: 'अभिलेखागार', path: '/archives' },
    { id: '/audio-guide', label: 'Audio Guide', labelNepali: 'अडियो गाइड', path: '/audio-guide' },
    { id: '/calendar', label: 'Calendar', labelNepali: 'पंचांग', path: '/calendar' }
  ];

  const protectedNavigationItems = [
    { id: '/community', label: 'Community', labelNepali: 'समुदाय', path: '/community' },
    { id: '/blog', label: 'Blog', labelNepali: 'ब्लग', path: '/blog' }
  ];

  const navigationItems = isAuthenticated ? [...baseNavigationItems, ...protectedNavigationItems] : baseNavigationItems;

  const languages = [
    { id: 'english', name: 'English', native: 'English' },
    { id: 'hindi', name: 'Hindi', native: 'हिंदी' },
    { id: 'nepali', name: 'Nepali', native: 'नेपाली' },
    { id: 'tibetan', name: 'Tibetan', native: 'བོད་སྐད་' }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="bg-monastery-primary p-2 rounded-lg mr-3 group-hover:bg-monastery-secondary transition-colors">
              <Mountain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-monastery-primary">Monastery360</h1>
              <p className="text-xs text-gray-600">Digital Heritage Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === item.path
                    ? 'text-monastery-primary bg-monastery-gold bg-opacity-10'
                    : 'text-gray-700 hover:text-monastery-primary hover:bg-gray-100'
                }`}
              >
                {language === 'nepali' ? item.labelNepali : item.label}
              </button>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Globe className="h-4 w-4 mr-2" />
              {languages.find(lang => lang.id === language)?.native}
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        onLanguageChange(lang.id);
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === lang.id
                          ? 'bg-monastery-gold bg-opacity-10 text-monastery-primary'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Welcome, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/login')}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-3 py-2 bg-monastery-primary text-white rounded-md text-sm font-medium hover:bg-monastery-secondary"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    currentPath === item.path
                      ? 'text-monastery-primary bg-monastery-gold bg-opacity-10'
                      : 'text-gray-700 hover:text-monastery-primary hover:bg-gray-100'
                  }`}
                >
                  {language === 'nepali' ? item.labelNepali : item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
