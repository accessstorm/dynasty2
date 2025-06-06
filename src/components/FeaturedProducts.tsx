import { useEffect, useState } from "react";
import { Card, Badge, Text, Button } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import CategoricalCollection from "./CategoricalCollection";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  pattern?: string;
  material?: string;
  color?: string;
}

interface TieData {
  id: number;
  name: string;
  pattern: string;
  material: string;
  color: string;
  description: string;
  price: number;
}

// Function to format price in Indian Rupees
const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

// Function to get image path based on product ID
const getImagePath = (id: number) => {
  // Determine category based on ID range
  if (id >= 16 && id <= 27) {
    // Bow ties
    const imageIndex = ((id - 16) % 6) + 1;
    return `/images/bowtie${imageIndex}.jpg`;
  } else if (id >= 28 && id <= 39) {
    // Pocket squares
    const imageIndex = ((id - 28) % 6) + 1;
    return `/images/pocketsquares${imageIndex}.jpg`;
  } else if (id >= 84 && id <= 95) {
    // Oversized tees
    return '/images/oversizedtees.jpg';
  } else if (id >= 96 && id <= 107) {
    // Wedding
    return '/images/wedding.jpg';
  } else if (id >= 108 && id <= 113) {
    // Cufflinks
    const imageIndex = ((id - 108) % 6);
    return `/images/cufflinks${imageIndex}.jpg`;
  } else if (id >= 64 && id <= 83) {
    // Gift sets
    const giftSetNames: {[key: number]: string} = {
      64: 'Coral Elegance.jpg',
      65: 'Rosewood Majesty.jpg',
      66: 'Serene Paisley.jpg',
      67: 'Azure Prism.jpg',
      68: 'Frosted Whirl.jpg',
      69: 'Blush Avenue.jpg',
      70: 'Golden Hour.jpg',
      71: 'Blush Mosaic.jpg',
      72: 'Midnight Paisley.jpg',
      73: 'Emerald Ivory Elegance.jpg',
      74: 'Teal Noir.jpg',
      75: 'Dark Green Fuchsia Paisley.jpg',
      76: 'Navy Brown Bloom.jpg',
      77: 'Aqua Lilac Paisley.jpg',
      78: 'Teal & Green Paisley.jpg',
      79: 'Royal Amethyst.jpg',
      80: 'whiteblue.jpg', // Keeping as is since it doesn't have a corresponding name
      81: 'Crimson Royale Brocade.jpg',
      82: 'Midnight Mirage Paisley.jpg',
      83: 'Crimson Checkmate.jpg'
    };
    const imageName = giftSetNames[id] || 'Coral Elegance.jpg';
    return `/images/Aproducts/2Giftset/box/${imageName}?v=${new Date().getTime()}`;
  } else if (id <= 16) {
    // Neckties with box images
    // Map ID to color names
    const colorMap: {[key: number]: string} = {
      1: 'navyblue',   // Royal Duchess Silk (blue)
      2: 'blackpurple', // Charcoal Herringbone (grey)
      3: 'navyblue',   // Midnight Blue Twill (navy)
      4: 'red',        // Burgundy Classic (burgundy)
      5: 'blackpink',  // Geometric Gold (black)
      6: 'blackpurple', // Silver Anniversary (grey)
      7: 'teal',       // Teal Elegance
      8: 'orange',     // Orange Distinction
      9: 'purple',     // Purple Royalty
      10: 'pinkd',     // Pink Diamond
      11: 'yellow',    // Yellow Sunlight
      12: 'cyan',      // Cyan Executive
      13: 'choco',     // Chocolate Sophistication
      14: 'blackpink', // Black Pink Contrast
      15: 'darkpurple', // Dark Purple Intensity
      16: 'orangewhite' // Orange White Stripe
    };
    
    const colorKey = colorMap[id] || 'navyblue';
    return `/images/Aproducts/1Necktie/box/box${colorKey}.jpg`;
  } else {
    // Other neckties (default)
    const imageIndex = ((id - 1) % 6) + 1;
    return `/images/necktie${imageIndex}.jpg`;
  }
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Category-specific product states
  const [necktieProducts, setNecktieProducts] = useState<Product[]>([]);
  const [bowTieProducts, setBowTieProducts] = useState<Product[]>([]);
  const [pocketSquareProducts, setPocketSquareProducts] = useState<Product[]>([]);
  const [cufflinkProducts, setCufflinkProducts] = useState<Product[]>([]);
  
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '/images/newArrivals.png',
      title: 'NEW ARRIVALS',
      subtitle: 'INTRODUCING MASTERPIECES'
    },
    {
      image: '/images/yes2.jpg',
      title: 'OUR STORY',
      subtitle: 'CRAFTING EXCELLENCE SINCE 1990s'
    },
    {
      image: '/images/ourServices.png',
      title: 'OUR SERVICES',
      subtitle: 'PERSONALIZED STYLING & CUSTOM DESIGNS'
    },
    {
      image: '/images/corporateOrders.jpg',
      title: 'CORPORATE ORDERS',
      subtitle: 'PREMIUM SOLUTIONS FOR BUSINESSES'
    }
  ];

  // Handle slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      // Move to next slide, loop back to first slide after the last
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // 3 seconds per slide instead of 4

    return () => clearInterval(timer); // Clean up on unmount
  }, [slides.length]);

  // Preload images for smoother transitions
  useEffect(() => {
    // Preload all slide images
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);
  
  // Fetch products from JSON file
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/ties.json');
        const data = await response.json();
        
        // Map the ties data to our Product interface
        const formattedProducts = data.ties.map((tie: TieData) => ({
          id: tie.id,
          name: tie.name,
          description: tie.description,
          price: tie.price,
          image: getImagePath(tie.id), // Use dynamic image path based on ID
          pattern: tie.pattern,
          material: tie.material,
          color: tie.color
        }));
        
        setProducts(formattedProducts);
        
        // Filter products by category (based on ID ranges)
        // Only take up to 6 products per category
        const neckties = formattedProducts.filter((p: Product) => p.id >= 1 && p.id <= 15).slice(0, 6);
        const bowTies = formattedProducts.filter((p: Product) => p.id >= 16 && p.id <= 27).slice(0, 6);
        const pocketSquares = formattedProducts.filter((p: Product) => p.id >= 28 && p.id <= 39).slice(0, 6);
        
        // Set the category-specific states
        setNecktieProducts(neckties);
        setBowTieProducts(bowTies);
        setPocketSquareProducts(pocketSquares);
        
        // Add sample cufflinks data
        setCufflinkProducts([
          {
            id: 101,
            name: "Silver Square Cufflinks",
            description: "Classic sterling silver square cufflinks with subtle engraving",
            price: 7999,
            image: "/images/cufflinks1.jpg",
            color: "silver"
          },
          {
            id: 102,
            name: "Gold Knot Cufflinks",
            description: "Elegant gold-plated knot design cufflinks",
            price: 9499,
            image: "/images/cufflinks2.jpg",
            color: "gold"
          },
          {
            id: 103,
            name: "Onyx Round Cufflinks",
            description: "Sophisticated black onyx stone set in silver",
            price: 8499,
            image: "/images/cufflinks3.jpg",
            color: "black"
          },
          {
            id: 104,
            name: "Navy Blue Enamel",
            description: "Navy blue enamel with silver detailing",
            price: 7299,
            image: "/images/cufflinks4.jpg",
            color: "blue"
          },
          {
            id: 105,
            name: "Burgundy Stone",
            description: "Deep burgundy stone set in gold plating",
            price: 8999,
            image: "/images/cufflinks5.jpg",
            color: "burgundy"
          },
          {
            id: 106,
            name: "Silver Initial",
            description: "Personalized silver initial cufflinks",
            price: 10999,
            image: "/images/cufflinks6.jpg",
            color: "silver"
          }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ties data:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Hero section variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };
  
  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Item variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Category render function - reusable for each product type
  const renderCategorySection = (title: string, description: string, products: Product[], path: string) => (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Text className="text-4xl font-serif mb-3">{title}</Text>
          <Text className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </Text>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {products.slice(0, 6).map((product, index) => (
            <Card 
              key={`featured-${index}`}
              shadow="sm" 
              padding="0"
              radius="sm"
              className="overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <Card.Section>
                <div className="h-64 overflow-hidden">
                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.image})` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </Card.Section>
              
              <div className="p-4">
                <Text fw={500} className="mb-1">{product.name}</Text>
                <Text fz="sm" c="dimmed">{formatINR(product.price)}</Text>
              </div>
            </Card>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Button
            component={Link}
            to={path}
            variant="outline"
            radius="0"
            className="border-black text-black hover:bg-black hover:text-white transition-all px-8 py-2 tracking-widest text-sm uppercase"
          >
            View All
          </Button>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {/* Hero Section with Slideshow */}
      <motion.section 
        className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Preload all images with absolute positioning but hidden */}
        {slides.map((slide, index) => (
          <div 
            key={`preload-${index}`}
            className="absolute inset-0 w-full h-full opacity-0"
            style={{
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }}
          />
        ))}
        
        {/* Slideshow with improved fade transition */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} // Faster 0.5 second fade transition
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('${slides[currentSlide].image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 1
            }}
          />
        </AnimatePresence>

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center justify-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-[0.15em] mb-4 px-4 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {slides[currentSlide].title}
          </motion.h1>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white tracking-widest mb-8 md:mb-16 font-light px-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {slides[currentSlide].subtitle}
          </motion.p>
          
          {/* Navigation dots */}
          <div className="flex space-x-2 mt-4 md:mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </motion.section>
      
      <CategoricalCollection />

      
    </>
  );
};

export default FeaturedProducts; 