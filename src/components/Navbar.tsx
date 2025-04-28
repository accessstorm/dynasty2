import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RazorpayButton from './RazorpayButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Main nav links - Updated with the requested items in the exact order
  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'NECKTIES', href: '/necktie-products' },
    { name: 'GIFT SETS', href: '/gift-sets' },
    { name: 'POCKET SQUARES', href: '/pocket-squares' },
    { name: 'CUFFLINKS', href: '/cufflinks' },
    { name: 'BULK ORDERS', href: '/bulk-orders' },
    { name: 'HELP', href: '/help' },
    { name: 'FAQ', href: '/faq' }
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Mobile menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <header className="relative">
      {/* Main Navigation */}
      <motion.nav 
        className="fixed w-full top-0 z-40 bg-white shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Top section with logo and right icons */}
            <div className="w-full flex justify-between items-center py-6">
              {/* Left section - mobile menu or spacer for desktop */}
              <div className="w-28 flex justify-start">
                {/* Hamburger Menu Button (Mobile only) */}
                <div className="md:hidden">
                  <motion.button
                    className="text-black focus:outline-none menu-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.button>
                </div>
              </div>

              {/* Logo */}
              <motion.div 
                className="flex-shrink-0 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link to="/" className="text-black no-underline">
                    <img 
                      src="/images/navbar.png" 
                      alt="DYNASTY" 
                      className="h-16 w-auto"
                    />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Icons */}
              <div className="flex items-center space-x-5 w-28 justify-end">
                {/* Contact Us Link with Phone Icon */}
                <motion.div 
                  className="hidden sm:flex items-center text-black transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link to="/contact" className="flex items-center text-black no-underline">
                    <Phone className="h-5 w-5 mr-2" />
                    <span className="text-xs tracking-wide font-light">CONTACT US</span>
                  </Link>
                </motion.div>

                
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex justify-center space-x-6 pb-4">
              {navLinks.map((link) => (
                <motion.div 
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link
                    to={link.href}
                    className="text-black text-xs tracking-wider font-light transition-opacity no-underline"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed top-0 right-0 h-screen w-4/5 max-w-xs bg-white z-50 shadow-lg mobile-menu md:hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                <h2 className="text-lg font-serif">Menu</h2>
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-black focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              
              <div className="py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-5 py-3 text-black no-underline text-sm tracking-wider font-light hover:bg-gray-50"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <Link
                    to="/contact"
                    className="flex items-center px-5 py-3 text-black no-underline text-sm tracking-wider font-light hover:bg-gray-50"
                  >
                    <Phone className="h-4 w-4 mr-3" />
                    CONTACT US
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Spacer for the fixed navbar */}
      <div className="h-[120px]"></div>
    </header>
  );
};

export default Navbar;