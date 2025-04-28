import { useState } from 'react';
import { Text, Button } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoricalCollection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Categories based on the navigation links
  const categories = [
    { 
      id: 1, 
      name: 'NECKTIES', 
      href: '/necktie-products',
      image: '/images/collection/necktie.png',
      status: 'available' 
    },
    { 
      id: 2, 
      name: 'GIFT SETS', 
      href: '/gift-sets',
      image: '/images/collection/giftset.jpg',
      status: 'available'
    },
    { 
      id: 3, 
      name: 'POCKET SQUARES', 
      href: '/pocket-squares',
      image: '/images/collection/pocketsquare.jpg',
      status: 'coming-soon'
    },
    { 
      id: 4, 
      name: 'CUFFLINKS', 
      href: '/cufflinks',
      image: '/images/collection/cufflinks.jpg',
      status: 'coming-soon'
    }
  ];

  // Function to render card content based on status
  const renderCardContent = (category: typeof categories[0]) => {
    return (
      <div className="relative h-80">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <h3 className="text-lg font-medium bg-white inline-block px-4 py-1">
            {category.name}
          </h3>
        </div>
        
        {/* Hover overlay */}
        <AnimatePresence>
          {hoveredCard === category.id && (
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black"
            />
          )}
        </AnimatePresence>

        {/* Centered Content on Hover */}
        <AnimatePresence>
          {hoveredCard === category.id && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {category.status === 'available' ? (
                <div className="text-white text-center">
                  <h3 className="text-xl font-serif mb-2">View Collection</h3>
                </div>
              ) : (
                <div className="text-white text-center">
                  <h3 className="text-xl font-serif mb-2">Coming Soon</h3>
                  <p className="text-sm opacity-80">This collection will be available shortly</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile indicator */}
        {category.status === 'available' ? (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-center sm:hidden">
            <span className="text-sm">Tap to view collection</span>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-center sm:hidden">
            <span className="text-sm">Coming Soon</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Text className="text-4xl font-serif mb-3">Our Premium Collections</Text>
          <Text className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of premium accessories, each crafted with precision and elegance.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="relative overflow-hidden"
              onHoverStart={() => setHoveredCard(category.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {category.status === 'available' ? (
                <Link 
                  to={category.href}
                  className="block h-full w-full relative overflow-hidden border border-gray-200"
                >
                  {renderCardContent(category)}
                </Link>
              ) : (
                <div className="block h-full w-full relative overflow-hidden border border-gray-200">
                  {renderCardContent(category)}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            component={Link}
            to="/necktie-products"
            variant="outline"
            radius="0"
            className="border-black text-black hover:bg-black hover:text-white transition-all px-8 py-2 tracking-widest text-sm uppercase"
          >
            Shop Necktie
          </Button>
          <Button
            component={Link}
            to="/gift-sets"
            variant="outline"
            radius="0"
            className="border-black text-black hover:bg-black hover:text-white transition-all px-8 py-2 tracking-widest text-sm uppercase"
          >
            Shop Giftset
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoricalCollection; 