import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Text, Button, Badge, Accordion } from '@mantine/core';
import { getStaticProducts } from '../services/StaticProductService';
import { ProductCardProps } from '../components/ProductCard';
import RazorpayButton from '../components/RazorpayButton';
import RazorpayQRButton from '../components/RazorpayQRButton';

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [category, setCategory] = useState('necktie'); // Default category

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const allProducts = getStaticProducts();
        // Flatten all product categories into a single array
        const productsArray = [
          ...allProducts.neckties,
          ...allProducts.bowTies,
          ...allProducts.pocketSquares,
          ...allProducts.men,
          ...allProducts.women,
          ...allProducts.combos,
          ...allProducts.oversizedTees,
          ...allProducts.wedding,
        ];
        
        // Find the product with the matching ID
        const foundProduct = productsArray.find(p => p.id === Number(productId));
        
        if (foundProduct) {
          console.log(`Found product with ID ${productId}:`, foundProduct);
          
          // Determine product category
          let category = "necktie"; // Default
          
          if (allProducts.bowTies.some(p => p.id === foundProduct.id)) category = "bowtie";
          else if (allProducts.pocketSquares.some(p => p.id === foundProduct.id)) category = "pocketsquares";
          else if (allProducts.oversizedTees.some(p => p.id === foundProduct.id)) category = "oversizedtees";
          else if (allProducts.wedding.some(p => p.id === foundProduct.id)) category = "wedding";
          else if (allProducts.combos.some(p => p.id === foundProduct.id)) category = "giftset";
          
          // Ensure necktie products use the new image structure
          if (category === "necktie" || foundProduct.id <= 16) {
            category = "necktie"; // Override category if ID matches necktie range
          }
          
          console.log(`Product category determined as: ${category}`);
          
          // Store the category in state
          setCategory(category);
          
          // Generate product images based on category
          const images = generateProductImages(category, foundProduct.id);
          console.log(`Generated ${images.length} images for product:`, images);
          setProductImages(images);
          
          // Update product with the first image
          setProduct({
            ...foundProduct,
            image: images[0]
          });
          
          // Preload images to prevent loading issues
          images.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => console.log(`Successfully preloaded image: ${src}`);
            img.onerror = () => console.error(`Failed to preload image: ${src}`);
          });
        } else {
          console.error(`Product with ID ${productId} not found`);
          setProduct(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);

  // Function to generate product images based on category and ID
  const generateProductImages = (category: string, id: number): string[] => {
    const images: string[] = [];
    
    // For neckties, use the folder structure with box, frontback, and roll images
    if (category === "necktie" && id <= 19) {
      // Map ID to actual necktie names
      const necktieNames: {[key: number]: string} = {
        1: 'Rosewood Reverie.jpg',      // ID in details.txt: 1
        2: 'Tangerine Tact.jpg',        // ID in details.txt: 2
        3: 'Purple Prism.jpg',          // ID in details.txt: 3
        4: 'Jade Reverie.jpg',          // ID in details.txt: 4
        5: 'Bold Blush Charm.jpg',      // ID in details.txt: 5
        6: 'Amber Grid Classic.jpg',    // ID in details.txt: 6
        7: 'Golden Gleam Check.jpg',    // ID in details.txt: 7
        8: 'Crimson Board.jpg',         // ID in details.txt: 8
        9: 'Midnight Stride.jpg',       // ID in details.txt: 9
        10: 'Rosé Rally.jpg',           // ID in details.txt: 10
        11: 'Blush Boulevard.jpg',      // ID in details.txt: 11
        12: 'Lavender Lines.jpg',       // ID in details.txt: 12
        13: 'Golden Charm.jpg',         // ID in details.txt: 13
        14: 'Royal Whimsy.jpg',         // ID in details.txt: 14
        15: 'Vintage Charm.jpg',        // ID in details.txt: 15
        16: 'Highland Flair.jpg',       // ID in details.txt: 16
        17: 'Midnight Maze.jpg',        // ID in details.txt: 17
        18: 'Ocean Breeze.jpg',         // ID in details.txt: 18
        19: 'Royal Twilight.jpg'        // ID in details.txt: 19
      };
      
      const imageName = necktieNames[id] || 'Rosewood Reverie.jpg';
      console.log(`Using necktie image name: ${imageName} for ID: ${id}`);
      
      // More aggressive cache busting with random number + timestamp
      const cacheBuster = `?v=${Math.random()}_${new Date().getTime()}`;
      
      // Add box image first with cache busting
      const boxImagePath = `/images/Aproducts/1Necktie/box/${imageName}${cacheBuster}`;
      console.log(`Box image path: ${boxImagePath}`);
      images.push(boxImagePath);
      
      // Add frontback image with cache busting
      const frontbackImagePath = `/images/Aproducts/1Necktie/frontback/${imageName}${cacheBuster}`;
      console.log(`Frontback image path: ${frontbackImagePath}`);
      images.push(frontbackImagePath);
      
      // Add roll image with cache busting
      const rollImagePath = `/images/Aproducts/1Necktie/roll/${imageName}${cacheBuster}`;
      console.log(`Roll image path: ${rollImagePath}`);
      images.push(rollImagePath);
      
      return images;
    }
    
    // For gift sets, use the box and set images (only two images per product)
    if (category === "giftset") {
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
        80: 'whiteblue.jpg', // Keeping as is since it doesn't have a corresponding name
        81: 'Crimson Royale Brocade.jpg',
        82: 'Midnight Mirage Paisley.jpg',
        83: 'Crimson Checkmate.jpg'
      };
      
      const imageName = giftSetNames[id] || 'Coral Elegance.jpg';
      
      // Add box image first with cache busting
      images.push(`/images/Aproducts/2Giftset/box/${imageName}?v=${new Date().getTime()}`);
      
      // Add set image with cache busting
      images.push(`/images/Aproducts/2Giftset/set/${imageName}?v=${new Date().getTime()}`);
      
      return images;
    }
    
    // Map product ID to image index (1-6)
    const imageIndex = ((id - 1) % 6) + 1;
    
    // Add main product image
    images.push(`/images/${category}${imageIndex}.jpg`);
    
    // Add additional images (repeating if needed)
    for (let i = 1; i <= 2; i++) {
      const additionalIndex = ((imageIndex + i - 1) % 6) + 1;
      images.push(`/images/${category}${additionalIndex}.jpg`);
    }
    
    return images;
  };

  // Function to handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  // Function to handle size selection
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleIncrement = () => {
    if (product && product.quantity !== undefined && quantity < product.quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
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
    const currentIndex = productImages.length - 1;
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
          <Text size="xl" className="mb-4">Product not found</Text>
          <Button component={Link} to="/" variant="outline">
            Return to Home
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container size="xl" className="py-12">
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
              // Determine image label based on index for necktie products
              let imageLabel = `View ${i+1}`;
              if (productImages.length === 3 && category === "necktie") {
                if (i === 0) imageLabel = "In Box";
                else if (i === 1) imageLabel = "Front & Back";
                else if (i === 2) imageLabel = "Rolled";
              }
              
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
          
          {/* Only show SKU for products other than 16 */}
          {product.id !== 16 && (
            <div className="text-xl text-gray-900 mb-4">
              SKU: TTH-SNT-{product.id}
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl md:text-3xl font-serif">
              ₹{product?.price.toLocaleString('en-IN')}
            </div>
            <div className="text-lg md:text-xl line-through text-gray-500">
              ₹{category === "giftset" ? 
                  (product.price === 2799 ? "3699" : "2799") : 
                  (product.price === 1899 ? "2799" : "1899")}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex border border-gray-300">
              <button 
                onClick={handleDecrement}
                className="px-3 py-1 text-lg border-r border-gray-300"
              >
                -
              </button>
              <span className="px-4 py-1 text-lg">{quantity}</span>
              <button 
                onClick={handleIncrement}
                className="px-3 py-1 text-lg border-l border-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              className="bg-black text-white hover:bg-[#D4AF37] hover:text-black transition-all uppercase text-sm tracking-widest py-4 font-medium"
              radius="xs"
              onClick={() => console.log("Cart clicked")}
            >
               Cart
            </Button>
            
            <RazorpayButton
              amount={product?.price * quantity}
              name={product?.name || "Product"}
              description={product?.description || "Description"}
              className="bg-black text-white hover:bg-[#D4AF37] hover:text-black transition-all uppercase text-sm tracking-widest py-4 font-medium"
              buttonText="Buy Now"
            />
          </div>
          
          {/* UPI Payment Option */}
          <div className="mt-2">
            <RazorpayQRButton
              amount={product?.price * quantity}
              name={product?.name || "Product"}
              description={product?.description || "Description"}
              className="w-full bg-[#528FF0] text-white hover:bg-[#4169E1] transition-all uppercase text-sm tracking-widest py-3 font-medium"
              buttonText="Pay with UPI / QR Code"
            />
          </div>
          
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
              Perfect for formal occasions, business meetings, and special events.
            </Text>
          </div>

          {/* Why You'll Love It */}
          <div className="bg-gray-50 p-4 rounded-md">
            <Text fw={600} className="text-lg mb-3">Why you'll love it</Text>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#00C2CB] font-bold mr-2">•</span>
                <Text className="text-gray-700">Pre-matched for effortless elegance</Text>
              </li>
              <li className="flex items-start">
                <span className="text-[#00C2CB] font-bold mr-2">•</span>
                <Text className="text-gray-700">Crafted with attention to detail</Text>
              </li>
              <li className="flex items-start">
                <span className="text-[#00C2CB] font-bold mr-2">•</span>
                <Text className="text-gray-700">Ideal for gifting or personal styling</Text>
              </li>
              <li className="flex items-start">
                <span className="text-[#00C2CB] font-bold mr-2">•</span>
                <Text className="text-gray-700">Packaged in a premium gift box</Text>
              </li>
            </ul>
          </div>

          {/* Component Details Table */}
          <div className="mt-4">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="py-2 px-4 bg-[#00C2CB] text-white font-medium w-1/3">Component</td>
                  <td className="py-2 px-4 bg-[#00C2CB] text-white font-medium w-2/3">Details</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 bg-[#00C2CB] text-white border-t border-white">Fabric</td>
                  <td className="py-2 px-4 bg-[#00C2CB] text-white border-t border-white">Woven Microfibre</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 bg-[#00C2CB] text-white border-t border-white">Tie Length</td>
                  <td className="py-2 px-4 bg-[#00C2CB] text-white border-t border-white">58" – 60"</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 bg-[#00C2CB] text-white border-t border-white">Tie Width</td>
                  <td className="py-2 px-4 bg-[#00C2CB] text-white border-t border-white">3" (Standard Width)</td>
                </tr>
                {category === "giftset" && (
                  <tr>
                    <td className="py-2 px-4 bg-[#00C2CB] text-white border-t border-white">Pocket Square</td>
                    <td className="py-2 px-4 bg-[#00C2CB] text-white border-t border-white">10" x 10"</td>
                  </tr>
                )}
                <tr>
                  <td className="py-2 px-4 border border-gray-200">Pattern</td>
                  <td className="py-2 px-4 border border-gray-200">{product.pattern || "Unique pattern for each product"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Return/Exchange Policy Button */}
          <Button
            variant="subtle"
            className="bg-[#00C2CB] text-white hover:bg-[#00A9B0] w-full py-3 mt-4"
            radius="xs"
            onClick={() => console.log("Return policy clicked")}
          >
            Return/Exchange Policy
          </Button>

          {/* Product Display & Accuracy Policy */}
          <Button
            variant="subtle"
            className="bg-[#00C2CB] text-white hover:bg-[#00A9B0] w-full py-3"
            radius="xs"
            onClick={() => console.log("Product Display policy clicked")}
          >
            Product Display & Accuracy Policy
          </Button>
          
          {/* Add to Wishlist */}
          <div className="mb-6">
            <Button
              variant="subtle"
              className="text-gray-500 hover:text-black underline p-0"
              radius="none"
            >
              ADD TO WISHLIST
            </Button>
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
            <Accordion.Item value="description">
              <Accordion.Control>
                <Text fw={500}>PRODUCT FEATURES</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text className="text-gray-700 leading-relaxed">
                  This premium {product.color} {category === "necktie" ? "necktie" : "gift set"} is designed with attention to detail, 
                  adding a sophisticated touch to any formal attire. Crafted from high-quality microfiber,
                  our products offer a silky finish and excellent durability for everyday wear.
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
                  Free standard shipping on all orders within India. Orders are typically 
                  processed within 24 hours and delivered within 3-5 business days.
                  <br /><br />
                  International shipping is available for select countries. Shipping rates 
                  and delivery times vary by location.
                  <br /><br />
                  For more information, please visit our shipping policy page.
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails; 