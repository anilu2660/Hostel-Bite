import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems, toggleCart } = useCart();
  const location = useLocation();
  const { scrollY } = useScroll();

  const navBackgroundOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);
  const navBackdropBlur = useTransform(scrollY, [0, 50], [0, 12]);
  const navBorderOpacity = useTransform(scrollY, [0, 50], [0, 0.1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Orders', path: '/orders' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      style={{
        backgroundColor: useTransform(
          scrollY,
          [0, 50],
          ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)'] // Adjust for dark mode via CSS var or class handled below
        ),
        backdropFilter: useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(16px)']),
        borderBottom: useTransform(scrollY, [0, 50], ['1px solid transparent', '1px solid rgba(0,0,0,0.05)']),
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 dark:border-dark-700/50 ${isScrolled ? 'dark:bg-dark-900/80 shadow-sm' : 'dark:bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24 transition-all duration-300"
          style={{ height: isScrolled ? '4rem' : '5rem' }}>

          {/* Logo with Animation */}
          <Link to="/" className="flex items-center space-x-3 group relative z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-dark-800 p-1.5 shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                <img src="/logo.png" alt="HostelBite" className="w-full h-full object-contain" />
              </div>
            </div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl md:text-2xl font-black tracking-tight"
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                HostelBite
              </span>
            </motion.span>
          </Link>

          {/* Desktop Navigation with Magnetic Float Effect */}
          <div className="hidden md:flex items-center space-x-2 bg-white/5 dark:bg-black/5 backdrop-blur-sm p-1.5 rounded-full border border-white/10 dark:border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => setActiveHover(link.path)}
                onMouseLeave={() => setActiveHover(null)}
                className="relative px-5 py-2 rounded-full transition-all duration-300"
              >
                {/* Active/Hover Background */}
                {(isActive(link.path) || activeHover === link.path) && (
                  <motion.div
                    layoutId="navBackground"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className={`absolute inset-0 rounded-full ${isActive(link.path)
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-md'
                        : 'bg-gray-100 dark:bg-dark-700'
                      }`}
                  />
                )}

                <span className={`relative z-10 text-sm font-bold transition-colors duration-200 ${isActive(link.path)
                    ? 'text-white'
                    : activeHover === link.path
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Cart Button */}
            {user && !isAdmin && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                className="relative p-2.5 bg-gray-50 dark:bg-dark-800 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
              >
                <div className="absolute inset-0 bg-purple-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <AnimatePresence>
                  {getTotalItems() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-sm border-2 border-white dark:border-dark-900 z-20"
                    >
                      {getTotalItems()}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Auth Buttons */}
            {user ? (
              <div className="hidden md:flex items-center ml-2 pl-2 border-l border-gray-200 dark:border-dark-700 space-x-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs font-bold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                  >
                    Admin Panel
                  </Link>
                )}
                <div className="group relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-gray-50 dark:bg-dark-800 p-1 pr-4 rounded-full border border-gray-200 dark:border-dark-700"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-sm">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {user.name?.split(' ')[0]}
                    </span>
                  </motion.button>

                  {/* Dropdown for Logout */}
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-gray-100 dark:border-dark-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-bold flex items-center"
                    >
                      <span className="mr-2">🚪</span> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login" className="px-5 py-2.5 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors">
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/signup" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current rounded-full origin-left transition-all"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-current rounded-full transition-all"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current rounded-full origin-left transition-all"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-dark-700"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg font-bold ${isActive(link.path)
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-gray-100 dark:bg-dark-700 my-4" />

              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full py-3 rounded-xl bg-gray-100 dark:bg-dark-800 text-center font-bold text-gray-900 dark:text-white mb-2"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full py-3 rounded-xl border-2 border-red-500 text-red-500 font-bold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 rounded-xl text-center font-bold text-gray-700 dark:text-white bg-gray-100 dark:bg-dark-800"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 rounded-xl text-center font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
