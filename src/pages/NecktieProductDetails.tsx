import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Text, Button, Badge, Accordion } from '@mantine/core';
import RazorpayButton from '../components/RazorpayButton';
import RazorpayQRButton from '../components/RazorpayQRButton';
import { ProductCardProps } from '../components/ProductCard';
import ProductCard from '../components/ProductCard';

interface Necktie {
  id: number;
  title: string;
  sku: string;
  price: number;
  originalPrice: number;
  quantity: number;
  pattern: string;
  description: string;
  styleGuide: string;
  image: string;
  color: string;
  isNew: boolean;
  material: string;
}

const NecktieProductDetails = () => {
  const { necktieId } = useParams<{ necktieId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);
  const [cartMessage, setCartMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [allNeckties, setAllNeckties] = useState<Necktie[]>([]);

  // Load all neckties on component mount
  useEffect(() => {
    const fetchNeckties = async () => {
      try {
        const response = await fetch('/data/neckties.json');
        if (!response.ok) {
          throw new Error('Failed to fetch neckties data');
        }
        
        const data = await response.json();
        setAllNeckties(data.neckties);
      } catch (err) {
        console.error('Error fetching neckties:', err);
      }
    };
    
    fetchNeckties();
  }, []);

  // Handle necktie lookup or redirect if needed
  useEffect(() => {
    if (!allNeckties.length) return; // Wait until neckties are loaded
    
    console.log("All necktie IDs:", allNeckties.map(tie => tie.id));
    
    // Try to find the requested necktie
    const foundNecktie = allNeckties.find(tie => tie.id === Number(necktieId));
    
    if (!foundNecktie) {
      console.log(`Necktie ID ${necktieId} not found, redirecting to first available necktie`);
      
      // If not found, redirect to the first available necktie
      if (allNeckties.length > 0) {
        const firstNecktie = allNeckties[0];
        navigate(`/necktie-product/${firstNecktie.id}`, { replace: true });
      } else {
        console.error("No neckties available for redirection");
        setLoading(false);
      }
      return;
    }
    
    // Necktie found, continue with display
    console.log("Found necktie:", foundNecktie);
    
    // Generate images
    const images = generateNecktieImages(foundNecktie.id, foundNecktie.title);
    setProductImages(images);
    
    // Set product data with first image
    setProduct({
      id: foundNecktie.id,
      name: foundNecktie.title,
      description: foundNecktie.description,
      price: foundNecktie.price,
      image: images[0],
      color: foundNecktie.color,
      isNew: foundNecktie.isNew,
      link: `/necktie-product/${foundNecktie.id}`,
      pattern: foundNecktie.pattern,
      material: foundNecktie.material,
      sku: foundNecktie.sku,
      quantity: foundNecktie.quantity
    });
    
    setLoading(false);
  }, [necktieId, allNeckties, navigate]);

  // Function to generate necktie images based on ID and title
  const generateNecktieImages = (id: number, title: string): string[] => {
    const images: string[] = [];
    
    console.log(`Generating images for necktie ID: ${id}, title: ${title}`);
    
    // Create image file name based on title
    const imageName = `${title}.jpg`;
    console.log(`Using image name: ${imageName} for necktie ID: ${id}`);
    
    // More aggressive cache busting with random number + timestamp
    const cacheBuster = `?v=${Math.random()}_${new Date().getTime()}`;
    
    // Add box image first with cache busting
    const boxImagePath = `/images/Aproducts/1Necktie/box/${imageName}${cacheBuster}`;
    console.log(`Box image path: ${boxImagePath}`);
    images.push(boxImagePath);
    
    // Add roll image with cache busting
    const rollImagePath = `/images/Aproducts/1Necktie/roll/${imageName}${cacheBuster}`;
    console.log(`Roll image path: ${rollImagePath}`);
    images.push(rollImagePath);
    
    // Add frontback image with cache busting
    const frontbackImagePath = `/images/Aproducts/1Necktie/frontback/${imageName}${cacheBuster}`;
    console.log(`Frontback image path: ${frontbackImagePath}`);
    images.push(frontbackImagePath);
    
    return images;
  };

  // Function to generate breadcrumbs
  const generateBreadcrumbs = () => {
    if (!product) return [];
    
    return [
      { label: "HOME", path: "/" },
      { label: "NECKTIES", path: "/necktie-products" },
      { label: product.name.toUpperCase(), path: "" }
    ];
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

  // Function to get Razorpay URL based on product name
  const getRazorpayUrl = (productName: string): string => {
    const razorpayUrls: { [key: string]: string } = {
      "Rosewood Reverie": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbrlicfFXdt",
      "Tangerine Tact": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbs2enjIPUv",
      "Purple Prism": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbscg2iraTd",
      "Jade Reverie": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbsLFq2YZnl",
      "Bold Blush Charm": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbsud7Xh33R",
      "Amber Grid Classic": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbtUW2soYIh",
      "Golden Gleam Check": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbtCYC0Nyit",
      "Crimson Board": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbtoTHzxpCT",
      "Midnight Stride": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbtUW2soYIh",
      "Rosé Rally": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbuNlk3jlxa",
      "Golden Charm": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbu6an5YXYg",
      "Royal Whimsy": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbutVg84mSt",
      "Vintage Charm": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbueRwcaFbH",
      "Highland Flair": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbv9kEFP2yc",
      "Midnight Maze": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbveO1xC29G",
      "Ocean Breeze": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbvOPOExQiC",
      "Royal Twilight": "https://pages.razorpay.com/stores/st_QOa81BePXBgrK3/product/li_QObsbvuuYcgJft"
    };

    return razorpayUrls[productName] || "#";
  };

  if (loading) {
    return (
      <Container className="py-20">
        <div className="flex justify-center">
          <Text size="xl">Loading product...</Text>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-20">
        <div className="flex flex-col items-center">
          <Text size="xl" className="mb-4">Necktie not found</Text>
          <Button component={Link} to="/necktie-products" variant="outline">
            Return to Neckties
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
          <div className="relative aspect-square overflow-hidden border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(`Error loading image: ${product.image}`);
                e.currentTarget.onerror = null; // Prevent infinite error loop
                e.currentTarget.src = '/images/placeholder.jpg'; // Use a placeholder image
              }}
            />
            {product.isNew && (
              <Badge 
                className="absolute top-4 left-4 bg-black text-white py-1 px-3"
                radius="xs"
              >
                NEW
              </Badge>
            )}
            
            {/* Navigation Arrows - only show if we have multiple images */}
            {productImages.length > 1 && (
              <>
                <button 
                  onClick={navigateToPrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-black p-2 rounded-full shadow-md z-10 transition-all w-10 h-10 flex items-center justify-center focus:outline-none"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button 
                  onClick={navigateToNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-black p-2 rounded-full shadow-md z-10 transition-all w-10 h-10 flex items-center justify-center focus:outline-none"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnail Navigation */}
          <div className="grid grid-cols-3 gap-2">
            {productImages.map((image, i) => {
              // Determine image label based on index
              let imageLabel = "View";
              if (i === 0) imageLabel = "In Box";
              else if (i === 1) imageLabel = "Rolled";
              else if (i === 2) imageLabel = "Front & Back";
              
              return (
                <div 
                  key={i} 
                  className={`aspect-square border cursor-pointer ${image === product.image ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}
                  onClick={() => setProduct({...product, image})}
                >
                  <div className="relative h-full">
                    <img
                      src={image}
                      alt={`${product.name} - ${imageLabel}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Error loading thumbnail image: ${image}`);
                        e.currentTarget.onerror = null; // Prevent infinite error loop
                        e.currentTarget.src = '/images/placeholder.jpg'; // Use a placeholder image
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs py-1 px-2 text-center">
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
          
          <div className="text-xl text-gray-900 mb-4">
            SKU: {product.sku}
          </div>
          
          {/* Price */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl md:text-3xl font-serif">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            <div className="text-lg md:text-xl line-through text-gray-500">
              ₹{(product.price * 1.25).toLocaleString('en-IN')}
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
              {allNeckties.find(tie => tie.id === product.id)?.styleGuide || 
              "Perfect for formal occasions, business meetings, and special events."}
            </Text>
          </div>

          {/* Why You'll Love It */}
          <div className="bg-gray-50 p-4 rounded-md">
            <Text fw={600} className="text-lg mb-3">Why you'll love it</Text>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#00C2CB] font-bold mr-2">•</span>
                <Text className="text-gray-700">Crafted with premium microfiber fabric</Text>
              </li>
              <li className="flex items-start">
                <span className="text-[#00C2CB] font-bold mr-2">•</span>
                <Text className="text-gray-700">Elegant design for all formal occasions</Text>
              </li>
              <li className="flex items-start">
                <span className="text-[#00C2CB] font-bold mr-2">•</span>
                <Text className="text-gray-700">Durable construction with attention to detail</Text>
              </li>
              <li className="flex items-start">
                <span className="text-[#00C2CB] font-bold mr-2">•</span>
                <Text className="text-gray-700">Presented in an elegant gift box</Text>
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
                  <td className="py-2 px-4 bg-black text-white border-t border-white">Fabric</td>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">{product.material}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">Tie Length</td>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">58" – 60"</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">Tie Width</td>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">3" (Standard Width)</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">Pattern</td>
                  <td className="py-2 px-4 bg-black text-white border-t border-white">{product.pattern || "Unique pattern"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Return/Exchange Policy Button */}
          <Button
            variant="subtle"
            className="bg-black text-white hover:bg-gray-800 w-full py-3 mt-4"
            radius="xs"
            onClick={() => navigate('/legal-policies')}
          >
            Return/Exchange Policy
          </Button>

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
            <Accordion.Item value="description">
              <Accordion.Control>
                <Text fw={500}>PRODUCT FEATURES</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text className="text-gray-700 leading-relaxed">
                  This premium {product.color} necktie is designed with attention to detail, 
                  adding a sophisticated touch to any formal attire. Crafted from high-quality microfiber,
                  it offers a silky finish and excellent durability for everyday wear.
                  <br /><br />
                  Each piece is meticulously handcrafted by our master artisans, ensuring the highest 
                  quality and attention to detail that Dynasty is renowned for.
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
            
            <Accordion.Item value="care">
              <Accordion.Control>
                <Text fw={500}>CARE INSTRUCTIONS</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text className="text-gray-700 leading-relaxed">
                  • Dry clean only<br />
                  • Store properly rolled or hung to prevent creasing<br />
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
              // Get similar products based on color or pattern
              const similarByColorOrPattern = allNeckties
                .filter(necktie => 
                  necktie.id !== Number(necktieId) && 
                  (necktie.color === product?.color || necktie.pattern === product?.pattern)
                );
              
              // Ensure we use unique products (no duplicates)
              const uniqueSimilarProducts = [...new Map(similarByColorOrPattern.map(item => [item.id, item])).values()];
              
              // If we don't have enough similar products, get some random ones that aren't already included
              let productsToShow = [...uniqueSimilarProducts];
              
              if (uniqueSimilarProducts.length < 4) {
                const remainingProducts = allNeckties
                  .filter(necktie => 
                    necktie.id !== Number(necktieId) && 
                    !uniqueSimilarProducts.some(p => p.id === necktie.id)
                  )
                  .slice(0, 4 - uniqueSimilarProducts.length);
                
                productsToShow = [...uniqueSimilarProducts, ...remainingProducts];
              }
              
              // Take first 4 products
              return productsToShow.slice(0, 4).map(necktie => (
                <ProductCard 
                  key={necktie.id}
                  id={necktie.id}
                  name={necktie.title}
                  price={necktie.price}
                  image={`/images/Aproducts/1Necktie/box/${necktie.title}.jpg`}
                  description={necktie.description}
                  isNew={necktie.isNew}
                  link={`/necktie-product/${necktie.id}`}
                  pattern={necktie.pattern}
                  color={necktie.color}
                  quantity={necktie.quantity}
                />
              ));
            })()}
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default NecktieProductDetails; 