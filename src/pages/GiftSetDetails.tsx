import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Text, Button, Badge, Accordion } from '@mantine/core';
import { getStaticProducts } from '../services/StaticProductService';
import { ProductCardProps } from '../components/ProductCard';
import ProductCard from '../components/ProductCard';

const GiftSetDetails = () => {
  const { giftSetId } = useParams<{ giftSetId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);
  const [cartMessage, setCartMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [allGiftSets, setAllGiftSets] = useState<ProductCardProps[]>([]);

  // Map gift set IDs to their respective SKUs
  const giftSetSkus: {[key: number]: string} = {
    64: "SKUDYNEGS001",
    65: "SKUDYNEGS002",
    66: "SKUDYNEGS003",
    67: "SKUDYNEGS004",
    68: "SKUDYNEGS005",
    69: "SKUDYNEGS006",
    70: "SKUDYNEGS007",
    71: "SKUDYNEGS008",
    72: "SKUJPKDEGS009",
    73: "SKUDYNEGS010",
    74: "SKUDYNEGS011",
    75: "SKUDYNEGS012",
    76: "SKUDYNEGS013",
    77: "SKUDYNEGS014",
    78: "SKUDYNEGS015",
    79: "SKUDYNEGS016",
    80: "SKUDYNEGS019",
    81: "SKUDYNEGS017",
    82: "SKUDYNEGS018",
    83: "SKUDYNEGS020"
  };

  // Map gift set IDs to their respective patterns
  const giftSetPatterns: {[key: number]: string} = {
    64: "Subtle diamond weave",
    65: "Geometric Overlapping Squares",
    66: "Classic Paisley Weave",
    67: "Geometric square-in-square weave",
    68: "Intricate Paisley Swirl",
    69: "Bold Striped Contrast",
    70: "Chevron Shine Texture",
    71: "Micro-Checkered",
    72: "Paisley Embroidery",
    73: "Paisley",
    74: "Diagonal Stripes",
    75: "Paisley",
    76: "Floral Brocade",
    77: "Paisley",
    78: "Paisley",
    79: "Diagonal Stripes",
    80: "Whispered Paisley Brocade",
    81: "Baroque Floral Brocade",
    82: "Paisley Weave",
    83: "Bold Crimson Plaid"
  };

  // Load all gift sets on component mount
  useEffect(() => {
    const allProducts = getStaticProducts();
    setAllGiftSets(allProducts.combos);
  }, []);

  // Handle gift set lookup or redirect if needed
  useEffect(() => {
    if (!allGiftSets.length) return; // Wait until sets are loaded
    
    console.log("All gift set IDs:", allGiftSets.map(set => set.id));
    
    // Try to find the requested gift set
    const foundGiftSet = allGiftSets.find(gs => gs.id === Number(giftSetId));
    
    if (!foundGiftSet) {
      console.log(`Gift set ID ${giftSetId} not found, redirecting to first available gift set`);
      
      // If not found, redirect to the first available gift set
      if (allGiftSets.length > 0) {
        const firstGiftSet = allGiftSets[0];
        navigate(`/gift-set/${firstGiftSet.id}`, { replace: true });
      } else {
        console.error("No gift sets available for redirection");
        setLoading(false);
      }
      return;
    }
    
    // Gift set found, continue with display
    console.log("Found gift set:", foundGiftSet);
    
    // Generate images
    const images = generateGiftSetImages(foundGiftSet.id);
    setProductImages(images);
    
    // Set product data with first image and correct SKU based on ID
    setProduct({
      ...foundGiftSet,
      image: images[0],
      originalPrice: 3000, // Set a fixed originalPrice for gift sets
      sku: giftSetSkus[foundGiftSet.id] || foundGiftSet.sku,
      pattern: giftSetPatterns[foundGiftSet.id] || foundGiftSet.pattern
    });
    
    setLoading(false);
  }, [giftSetId, allGiftSets, navigate]);

  // Function to generate gift set images based on ID
  const generateGiftSetImages = (id: number): string[] => {
    const images: string[] = [];
    
    console.log(`Generating images for gift set ID: ${id}`);
    
    // Map ID to actual gift set names
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
      80: 'Mint Reverie Paisley.jpg',
      81: 'Crimson Royale Brocade.jpg',
      82: 'Midnight Mirage Paisley.jpg',
      83: 'Crimson Checkmate.jpg'
    };
    
    const imageName = giftSetNames[id] || `${id}.jpg`;
    console.log(`Using image name: ${imageName} for gift set ID: ${id}`);
    
    // More aggressive cache busting with random number + timestamp
    const cacheBuster = `?v=${Math.random()}_${new Date().getTime()}`;
    
    // Add box image first with cache busting
    const boxImagePath = `/images/Aproducts/2Giftset/box/${imageName}${cacheBuster}`;
    console.log(`Box image path: ${boxImagePath}`);
    images.push(boxImagePath);
    
    // Add set image with cache busting
    const setImagePath = `/images/Aproducts/2Giftset/set/${imageName}${cacheBuster}`;
    console.log(`Set image path: ${setImagePath}`);
    images.push(setImagePath);
    
    return images;
  };

  const handleIncrement = () => {
    if (product && product.quantity !== undefined && quantity < product.quantity) {
      setQuantity(prev => prev + 1);
      setMaxQuantityReached(quantity + 1 >= product.quantity);
    } else if (product && product.quantity !== undefined) {
      setMaxQuantityReached(true);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      setMaxQuantityReached(false);
    }
  };
  
  // Add a function to handle direct quantity input with validation
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    
    if (isNaN(value) || value < 1) {
      setQuantity(1);
      setMaxQuantityReached(false);
      return;
    }
    
    if (product && product.quantity !== undefined) {
      if (value > product.quantity) {
        setQuantity(product.quantity);
        setMaxQuantityReached(true);
      } else {
        setQuantity(value);
        setMaxQuantityReached(value >= product.quantity);
      }
    } else {
      setQuantity(value);
    }
  };
  
  // Function to generate breadcrumbs
  const generateBreadcrumbs = () => {
    if (!product) return [];
    
    return [
      { label: "HOME", path: "/" },
      { label: "GIFT SETS", path: "/gift-sets" },
      { label: product.name.toUpperCase(), path: "" }
    ];
  };

  // Navigate to the previous image
  const navigateToPrevImage = () => {
    if (!product || productImages.length <= 1) return;
    const currentIndex = productImages.findIndex(img => img === product.image);
    const prevIndex = currentIndex <= 0 ? productImages.length - 1 : currentIndex - 1;
    setProduct({...product, image: productImages[prevIndex]});
  };

  // Navigate to the next image
  const navigateToNextImage = () => {
    if (!product || productImages.length <= 1) return;
    const currentIndex = productImages.findIndex(img => img === product.image);
    const nextIndex = (currentIndex + 1) % productImages.length;
    setProduct({...product, image: productImages[nextIndex]});
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigateToPrevImage();
      } else if (e.key === 'ArrowRight') {
        navigateToNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, productImages]);

  // Handle add to cart functionality
  const handleAddToCart = () => {
    if (!product) return;
    
    // Enforce quantity limit
    if (product.quantity !== undefined) {
      if (product.quantity === 0) {
        setCartMessage({
          text: "Sorry, this product is out of stock.",
          type: 'error'
        });
        return;
      }
      
      if (quantity > product.quantity) {
        setCartMessage({
          text: `Sorry, only ${product.quantity} units available.`,
          type: 'error'
        });
        // Reset quantity to max available
        setQuantity(product.quantity);
        setMaxQuantityReached(true);
        return;
      }
    }
    
    // Here you would normally implement actual cart functionality
    console.log(`Added to cart: ${quantity} x ${product.name}`);
    
    setCartMessage({
      text: `${quantity} x ${product.name} added to cart!`,
      type: 'success'
    });
    
    // Clear the message after 3 seconds
    setTimeout(() => {
      setCartMessage(null);
    }, 3000);
  };

  // Function to get Razorpay URL based on gift set name
  const getRazorpayUrl = (productName: string): string => {
    const razorpayUrls: { [key: string]: string } = {
      "Coral Elegance": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbwBiP40sC5",
      "Rosewood Majesty": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbwRlB25Yaj",
      "Serene Paisley": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbwguibLEyA",
      "Azure Prism": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbwxk6thyh4",
      "Frosted Whirl": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbxDRbIikhH",
      "Blush Avenue": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbxTx4DtMD2",
      "Golden Hour": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbxmSG9JjTE",
      "Blush Mosaic": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsby1gXDQQOw",
      "Midnight Paisley": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbyIxiUdJRE",
      "Emerald Ivory Elegance": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbyIxiUdJRE",
      "Teal Noir": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbyqJMKYo05",
      "Dark Green Fuchsia Paisley": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbz3yv2aSqR",
      "Navy Brown Bloom": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbzJLyRq5gG",
      "Aqua Lilac Paisley": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbzdCScNK6l",
      "Teal & Green Paisley": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbzrfGxa2U7",
      "Royal Amethyst": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsc07tme0AZE",
      "Crimson Royale Brocade": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsc0Pr647fWq",
      "Midnight Mirage Paisley": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsc0hxIbEMCQ",
      "Mint Reverie Paisley": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsc103dmRWqJ",
      "Crimson Checkmate": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsc1Gb2yqBrX"
    };

    return razorpayUrls[productName] || "#";
  };

  // Function to get the style guide based on product name
  const getStyleGuide = (productName: string): string => {
    const styleGuides: { [key: string]: string } = {
      "Coral Elegance": "Best paired with a black or dark grey blazer and a light pastel shirt for a bold, sophisticated look.\nFor a sleek, modern style without a blazer, a crisp black shirt complements the coral tones beautifully.",
      
      "Rosewood Majesty": "Best paired with a deep navy or charcoal blazer and a crisp white shirt for an elevated, polished look.\nFor a more contemporary feel without a blazer, pair it with a tailored black shirt to enhance the richness of the rosewood tones.",
      
      "Serene Paisley": "Best paired with a light grey or navy blue blazer and a crisp white or soft pastel shirt for a distinguished, polished ensemble.\nFor a more relaxed yet refined look without a blazer, pair it with a soft powder blue or classic white shirt to enhance the delicate hues of the set.",
      
      "Azure Prism": "Best paired with a navy blue or charcoal grey blazer and a light pastel shirt to highlight the intricate pattern and cool tones.\nFor a sleek, blazer-free look, a crisp white or deep blue shirt will accentuate the vibrant details perfectly.",
      
      "Frosted Whirl": "Matches exceptionally well with a steel grey or classic black suit for a sharp, polished look.\nFor a more relaxed yet stylish option, pair it with a crisp white shirt and skip the jacket to let the intricate pattern and rich cufflink accents shine.",
      
      "Blush Avenue": "Best paired with a navy or charcoal suit for a fresh, standout look.\nFor a casual yet sharp statement, combine it with a light grey blazer and white shirt to let the vibrant stripes do all the talking.",
      
      "Golden Hour": "Perfect for weddings, cocktail events, or celebrations — pair with a deep navy, dark green, or classic black suit to let the golden tones truly pop.",
      
      "Blush Mosaic": "Ideal for daytime weddings, garden parties, or semi-formal events — matches beautifully with grey, charcoal, or cream suits for a lively yet polished impression.",
      
      "Midnight Paisley": "Best suited for evening events, cocktail parties, or formal dinners — complements black, navy, or even deep maroon suits for a striking, confident look.",
      
      "Emerald Ivory Elegance": "Perfect for winter weddings, formal events, or upscale soirées — pairs impeccably with charcoal grey, black, or deep green suits for a rich, distinguished look.",
      
      "Teal Noir": "Ideal for semi-formal to formal occasions; pair it with gray or black suits to make the teal hues pop effortlessly.",
      
      "Dark Green Fuchsia Paisley": "Perfect for weddings, festive events, and evening gatherings; pairs beautifully with black, deep green, or dark grey suits for a bold yet elegant statement.",
      
      "Navy Brown Bloom": "Perfect for weddings, receptions, and formal evenings; pairs best with navy, brown, or black suits to enhance the elegant contrast of the set.",
      
      "Aqua Lilac Paisley": "A standout choice for daytime weddings, receptions, or creative formal events; pairs beautifully with light grey, charcoal, or navy suits for a vibrant yet refined look.",
      
      "Teal & Green Paisley": "Perfect for formal occasions and evening events; pairs beautifully with black, navy, or deep green suits to highlight the rich teal accents.",
      
      "Royal Amethyst": "Perfect for gala events, weddings, and formal celebrations; pairs beautifully with black, or charcoal suits for a bold yet classy statement.",
      
      "Crimson Royale Brocade": "Ideal for black-tie events, weddings, or festive occasions; best styled with black, navy, or deep grey suits to let the vibrant red make a statement.",
      
      "Midnight Mirage Paisley": "Perfect for evening galas, weddings, or any event under the stars; pairs best with charcoal, navy, or black suits for a truly magnetic look.",
      
      "Mint Reverie Paisley": "Pairs beautifully with light gray, beige, or classic navy suits for a refined and refreshing ensemble.",
      
      "Crimson Checkmate": "Looks sharp with navy, or black suits, bringing a pop of color that's both commanding and stylish."
    };

    return styleGuides[productName] || "Best paired with a classic suit or blazer for a distinguished, elegant look.";
  };

  if (loading) {
    return (
      <Container className="py-20">
        <div className="flex justify-center">
          <Text size="xl">Loading gift set...</Text>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-20">
        <div className="flex flex-col items-center">
          <Text size="xl" className="mb-4">Gift set not found</Text>
          <Button component={Link} to="/gift-sets" variant="outline">
            Return to Gift Sets
          </Button>
        </div>
      </Container>
    );
  }

  // Generate breadcrumbs
  const breadcrumbs = generateBreadcrumbs();

  return (
    <Container size="xl" className="py-12">
      {/* Breadcrumbs navigation */}
      <div className="flex text-sm text-gray-500 mb-8 px-6 py-3 ml-2">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-2">›</span>}
            {crumb.path ? (
              <Link to={crumb.path} className="hover:text-black">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-black">
                {crumb.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto px-4 py-10">
        {/* Left: Product Images */}
        <div className="flex flex-col space-y-4">
          <div className="relative border border-gray-100 bg-white">
            <div className="relative w-full" style={{ paddingTop: '66.67%' }}>
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-contain"
                onError={(e) => {
                  console.error(`Error loading image: ${product.image}`);
                  e.currentTarget.onerror = null; // Prevent infinite error loop
                  e.currentTarget.src = '/images/placeholder.jpg'; // Use a placeholder image
                }}
              />
              {product.isNew && (
                <Badge 
                  className="absolute top-4 left-4 bg-black text-white py-1 px-3 z-10"
                  radius="xs"
                >
                  NEW
                </Badge>
              )}
            </div>
          </div>
          
          {/* Navigation Buttons - Moved below image */}
          {productImages.length > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-3">
              <button 
                onClick={navigateToPrevImage}
                className="bg-white hover:bg-gray-100 text-black p-2 rounded-full shadow-md transition-all w-12 h-12 flex items-center justify-center focus:outline-none border border-gray-200"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span className="text-gray-500 text-sm">
                {productImages.findIndex(img => img === product.image) + 1} of {productImages.length}
              </span>
              <button 
                onClick={navigateToNextImage}
                className="bg-white hover:bg-gray-100 text-black p-2 rounded-full shadow-md transition-all w-12 h-12 flex items-center justify-center focus:outline-none border border-gray-200"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
          
          {/* Thumbnail Navigation */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {productImages.map((image, i) => {
              // Determine image label based on index for gift set products
              let imageLabel = i === 0 ? "Box View" : "Set View";
              
              return (
                <div 
                  key={i} 
                  className={`relative border cursor-pointer ${image === product.image ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}
                  onClick={() => setProduct({...product, image})}
                >
                  <div style={{ paddingTop: '66.67%' }} className="relative">
                    <img
                      src={image}
                      alt={`${product.name} - ${imageLabel}`}
                      className="absolute inset-0 h-full w-full object-contain bg-white"
                      onError={(e) => {
                        console.error(`Error loading thumbnail image: ${image}`);
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs py-1 px-2 text-center z-10">
                      {imageLabel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col space-y-6">
          {/* Product Title & Info */}
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            {product.name}
          </h1>
          
          {/* SKU */}
          <div className="text-xl text-gray-900 mb-4">
            SKU: {product.sku}
          </div>
          
          {/* Pattern */}
          <div className="text-xl text-gray-900 mb-4">
            Pattern: {product.pattern}
          </div>
          
          {/* Price */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl md:text-3xl font-serif">
              ₹{product?.price.toLocaleString('en-IN')}
            </div>
            <div className="text-lg md:text-xl line-through text-gray-500">
              ₹{product.price === 1899 ? "2799" : "3699"}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Quantity:</span>
              <div className="flex border border-gray-300">
                <button 
                  onClick={handleDecrement}
                  className="px-3 py-1 text-lg border-r border-gray-300"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product?.quantity || 99}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 px-2 py-1 text-lg text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onBlur={() => {
                    // Validate on blur as well
                    if (product && product.quantity !== undefined && quantity > product.quantity) {
                      setQuantity(product.quantity);
                      setMaxQuantityReached(true);
                    }
                  }}
                />
                <button 
                  onClick={handleIncrement}
                  className={`px-3 py-1 text-lg border-l border-gray-300 ${
                    product && product.quantity !== undefined && quantity >= product.quantity 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                  disabled={product && product.quantity !== undefined && quantity >= product.quantity}
                >
                  +
                </button>
              </div>
            </div>
            {product && product.quantity !== undefined && (
              <div className="text-sm">
                <span className={maxQuantityReached ? "text-red-500" : "text-gray-500"}>
                  {maxQuantityReached 
                    ? `Maximum available quantity (${product.quantity}) reached` 
                    : `Available: ${product.quantity}`}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-4">
            {product?.quantity !== 0 ? (
              <Link
                to={getRazorpayUrl(product.name)}
                className="bg-blue-600 text-white hover:bg-blue-700 transition-all uppercase text-sm tracking-widest py-4 font-medium rounded-md w-full flex items-center justify-center"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Buy Now (Secured by Razorpay)
              </Link>
            ) : (
              <Button
                className="bg-gray-400 text-white uppercase text-sm tracking-widest py-4 font-medium cursor-not-allowed rounded-md w-full"
                radius="xs"
                disabled
              >
                Buy Now (Secured by Razorpay)
              </Button>
            )}
          </div>
          
          {/* Cart Message */}
          {cartMessage && (
            <div className={`mt-2 p-2 text-white text-center rounded-sm ${
              cartMessage.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}>
              {cartMessage.text}
            </div>
          )}
          
          {/* Short Description */}
          <div className="mt-4">
            <Text className="text-gray-700 leading-relaxed">
              {product.description}
            </Text>
          </div>
          
          {/* Style Guide */}
          <div>
            <Text fw={600} className="text-lg mb-2">Style Guide</Text>
            <Text className="text-gray-700 leading-relaxed">
              {getStyleGuide(product.name).split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </Text>
          </div>

          {/* Set Contents */}
          <div className="mt-4">
            <Text fw={600} className="text-lg mb-2">Set Contents</Text>
            <Text className="text-gray-700 leading-relaxed">
              Each {product.name} gift set contains a perfectly matched necktie, pocket square, and cufflinks, all presented in a premium gift box.
            </Text>
          </div>

          {/* Why You'll Love It */}
          <div className="bg-gray-50 p-4 rounded-md">
            <Text fw={600} className="text-lg mb-3">Why you'll love it</Text>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <Text className="text-gray-700">Pre-matched for effortless elegance</Text>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <Text className="text-gray-700">Ready-to-gift in premium packaging</Text>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <Text className="text-gray-700">Perfect for special occasions</Text>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <Text className="text-gray-700">Meticulously curated by our stylists</Text>
              </li>
            </ul>
          </div>

          {/* Component Details Table */}
          <div className="mt-4">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="py-2 px-4 bg-black text-white font-medium w-1/3">Component</td>
                  <td className="py-2 px-4 bg-black text-white font-medium w-2/3">Details</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">Necktie</td>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">Microfibre, 58" Length, 3" Width</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">Pocket Square</td>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">Microfibre, 10" × 10"</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">Cufflinks</td>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">Metal alloy, Matching design</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">Pattern</td>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">{product.pattern || "Unique pattern for each gift set"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Product Information Accordion */}
          <Accordion className="border-t border-b border-gray-200" 
            styles={{
              control: {
                padding: '16px 0',
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              },
              chevron: {
                display: 'none' // Hide the chevron/arrow icon
              },
              item: {
                borderBottom: '1px solid #eaeaea'
              },
              panel: {
                padding: '0 0 16px 0'
              }
            }}
          >
            <Accordion.Item value="return_policy">
              <Accordion.Control>
                <Text fw={500}>RETURN/EXCHANGE POLICY</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text className="text-gray-700 leading-relaxed">
                At Dynasty, customer satisfaction is of paramount importance. However, due to the nature of our merchandise and our commitment to maintaining product hygiene and quality, we do not offer returns or refunds. Only exchanges are permitted, subject to the following terms.

An exchange request must be initiated within forty-eight (48) hours of delivery. Customers are required to email support@dynastyworld.in, providing a detailed description and photographic evidence of the defect or damage. Exchanges shall be entertained solely in cases where the product is received in a defective or damaged condition, and not for reasons of personal preference.
                  <br /><br />
                  Products must be unused, unworn, and returned in their original packaging. Dynasty reserves the right to deny an exchange if, upon inspection, the returned product is found to have been used, tampered with, or damaged post-delivery.

The cost of shipping the product for exchange shall be borne solely by the customer. Dynasty shall not be responsible for any loss or damage incurred during the return shipping process. Exchanges shall be processed only after the returned product passes our quality checks.
                  </Text>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="display_policy">
              <Accordion.Control>
                <Text fw={500}>PRODUCT DISPLAY & ACCURACY POLICY </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text className="text-gray-700 leading-relaxed">
                Dynasty is committed to providing the most accurate visual representation and description of its products. All product images are captured using high-quality professional equipment under carefully controlled lighting conditions to reflect the true attributes of the merchandise.

However, minor variations in color, texture, and appearance may occur due to factors beyond our control, including but not limited to the lighting environment during photography, device screen settings, and individual perception.<br /><br />
Such variations shall not constitute a defect or grounds for return or exchange.

By purchasing from Dynasty, you acknowledge and accept the possibility of slight discrepancies between product images and actual products.</Text>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="features">
              <Accordion.Control>
                <Text fw={500}>PRODUCT FEATURES</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text className="text-gray-700 leading-relaxed">
                  This premium {product.name} gift set is designed with attention to detail, 
                  adding a sophisticated touch to any formal attire. Each component is carefully 
                  selected to complement each other perfectly.
                  <br /><br />
                  The set includes a luxurious necktie, matching pocket square, and elegant cufflinks, 
                  all presented in a premium gift box, making it perfect for special occasions or as a thoughtful gift.
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
            
            <Accordion.Item value="care">
              <Accordion.Control>
                <Text fw={500}>CARE INSTRUCTIONS</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text className="text-gray-700 leading-relaxed">
                  • Necktie & Pocket Square: Dry clean only<br />
                  • Store properly rolled or hung to prevent creasing<br />
                  • Cufflinks: Wipe with a soft, dry cloth<br />
                  • Avoid prolonged exposure to direct sunlight<br />
                  • Remove stains promptly with a clean, damp cloth
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
            
            <Accordion.Item value="shipping">
              <Accordion.Control>
                <Text fw={500}>SHIPPING & HANDLING</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text className="text-gray-700 leading-relaxed">
                  Dynasty endeavors to dispatch all confirmed orders within one (1) to two (2) business days, subject to operational exigencies. Upon dispatch, standard delivery timelines range between three (3) to seven (7) business days, depending on the delivery location and logistical factors.
                  <br /><br />
                  While we strive to ensure timely delivery, delays may occur due to unforeseen circumstances including but not limited to courier delays, natural disasters, or governmental restrictions. Dynasty shall not be held liable for any such delays beyond its reasonable control.
                  <br /><br />
                  Customers will receive shipping confirmation and tracking details via email upon dispatch. All deliveries shall be made through reputed third-party logistics providers, including but not limited to Delhivery.
                  <br /><br />
                  At present, Dynasty offers shipping exclusively within the territory of India.
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-16 border-t border-gray-200 pt-12 pb-8">
        <Container size="xl">
          <Text className="text-2xl font-medium mb-8 text-center">View Similar Products</Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {(() => {
              // Get similar products based on pattern
              const similarByPattern = allGiftSets
                .filter(giftSet => 
                  giftSet.id !== Number(giftSetId) && 
                  giftSet.pattern === product?.pattern
                );
              
              // Ensure we use unique products (no duplicates)
              const uniqueSimilarProducts = [...new Map(similarByPattern.map(item => [item.id, item])).values()];
              
              // If we don't have enough similar products, get some random ones that aren't already included
              let productsToShow = [...uniqueSimilarProducts];
              
              if (uniqueSimilarProducts.length < 4) {
                const remainingProducts = allGiftSets
                  .filter(giftSet => 
                    giftSet.id !== Number(giftSetId) && 
                    !uniqueSimilarProducts.some(p => p.id === giftSet.id)
                  )
                  .slice(0, 4 - uniqueSimilarProducts.length);
                
                productsToShow = [...uniqueSimilarProducts, ...remainingProducts];
              }
              
              // Take first 4 products
              return productsToShow.slice(0, 4).map(giftSet => (
                <ProductCard 
                  key={giftSet.id}
                  id={giftSet.id}
                  name={giftSet.name}
                  price={giftSet.price}
                  image={generateGiftSetImages(giftSet.id)[0]}
                  description={giftSet.description}
                  isNew={giftSet.isNew}
                  link={`/gift-set/${giftSet.id}`}
                  pattern={giftSetPatterns[giftSet.id] || giftSet.pattern}
                  color={giftSet.color}
                  quantity={giftSet.quantity}
                />
              ));
            })()}
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default GiftSetDetails; 