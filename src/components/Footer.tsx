import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialMediaLinks = [
    { icon: Instagram, label: 'Instagram' },
    { icon: Facebook, label: 'Facebook' },
    { icon: Twitter, label: 'Twitter' }
  ];

  const footerLinks = [
    { name: 'HOME', href: '/' },
    { name: 'NECKTIES', href: '/neckties' },
    { name: 'BOW TIES', href: '/bow-ties' },
    { name: 'POCKET SQUARES', href: '/pocket-squares' },
    { name: 'TRACKING', href: '#' },
    { name: 'CONTACT US', href: '/contact' }
  ];

  const contactInfo = [
    { icon: Phone, text: '+919820238241', href: 'tel:+919820238241' },
    { icon: Mail, text: 'dynastyneckties@gmail.com', href: 'mailto:dynastyneckties@gmail.com' },
    { icon: MapPin, text: 'Mumbai, Maharashtra, India', href: '#' }
  ];

  const paymentMethods = [
    { name: 'Visa', image: '/images/visa.jpg' },
    { name: 'MasterCard', image: '/images/MasterCard.jpg' },
    { name: 'Maestro', image: '/images/Maestro.jpg' },
    { name: 'Visa Electron', image: '/images/visa electron.jpg' },
    { name: 'PayPal', image: '/images/paypal.jpg' }
  ];

  const iconVariants = {
    hover: { 
      scale: 1.1,
      transition: { type: 'spring', stiffness: 400 }
    }
  };

  return (
    <footer className="bg-white text-gray-600 pt-12 md:pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-black text-lg font-light mb-4 md:mb-6">QUICK LINKS</h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link 
                      to={link.href} 
                      className="text-gray-600 hover:text-black transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-black text-lg font-light mb-4 md:mb-6">CONTACT US</h3>
            <ul className="space-y-3 md:space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start justify-center sm:justify-start">
                  <item.icon size={16} className="mt-1 mr-3" />
                  <a href={item.href} className="text-gray-600 hover:text-black transition-colors text-sm">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter & Social */}
          <div className="text-center sm:text-left">
            <h3 className="text-black text-lg font-light mb-4 md:mb-6">FOLLOW US</h3>
            <div className="flex space-x-4 mb-6 justify-center sm:justify-start">
              {socialMediaLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href="#" 
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label={social.label}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Sign up for our newsletter to receive special offers, news, and events.
            </p>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <p className="w-full text-center text-xs text-gray-500 mb-3">We accept:</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {paymentMethods.map((method) => (
              <div key={method.name} className="flex items-center justify-center">
                <img 
                  src={method.image} 
                  alt={method.name} 
                  className="h-6 md:h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  title={method.name}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-6 md:pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} DYNASTY. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            All prices in INR (₹)
          </p>
        </div>
        
        {/* Made by Zyberly */}
        <div className="mt-6 md:mt-8 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden">
              <img 
                src="/images/zyberly.png" 
                alt="Zyberly" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Made by Zyberly
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

 