import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [user, setUser] = useState({name:"ali",email:"uui@iut.com"});
  
  const userMenuRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: "fas fa-home" },
    { to: "/about", label: "About", icon: "fas fa-info-circle" },
    { to: "/services", label: "Services", icon: "fas fa-cogs" },
    { to: "/contact", label: "Contact", icon: "fas fa-envelope" }
  ];

  return (
    <>
      <nav className={`shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-xl' 
          : 'backdrop-blur-md bg-white/50 dark:bg-gray-900/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 shadow-lg">
                  <p className=" text-white text-2xl">S</p>
                </div>
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  Social
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                {navLinks.map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    href={to}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 group text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    <i className={`${icon} group-hover:scale-110 transition-transform duration-200`}></i>
                    <span>{label}</span>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
                  darkMode ? 'transform translate-x-6' : ''
                }`}>
                  <i className={`${darkMode ? 'fas fa-moon text-purple-600' : 'fas fa-sun text-yellow-500'} text-xs`}></i>
                </div>
              </button>

              {/* User section */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
                  >
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
                  </button>

                  {/* User dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 transition-colors duration-200">
                          <i className="fas fa-tachometer-alt mr-3 text-purple-500"></i>
                          Dashboard
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 transition-colors duration-200">
                          <i className="fas fa-cog mr-3 text-purple-500"></i>
                          Settings
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                          <i className="fas fa-sign-out-alt mr-3"></i>
                          Sign out
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-3">
                  <a
                    href="/login"
                    className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <i className="fas fa-sign-in-alt"></i>
                    <span>Login</span>
                  </a>
                  <a
                    href="/register"
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <i className="fas fa-user-plus"></i>
                    <span>Get Started</span>
                  </a>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} transition-all duration-300`}></i>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700">
            {navLinks.map(({ to, label, icon }) => (
              <a
                key={to}
                href={to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <i className={`${icon} w-5 text-center`}></i>
                <span>{label}</span>
              </a>
            ))}
            
            {!user && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <a
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors duration-200"
                >
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Login</span>
                </a>
                <a
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-300"
                >
                  <i className="fas fa-user-plus"></i>
                  <span>Get Started</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}