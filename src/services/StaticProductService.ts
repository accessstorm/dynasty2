import { ProductCardProps } from '../components/ProductCard';

export interface CategoryProducts {
  neckties: ProductCardProps[];
  bowTies: ProductCardProps[];
  pocketSquares: ProductCardProps[];
  men: ProductCardProps[];
  women: ProductCardProps[];
  combos: ProductCardProps[];
  oversizedTees: ProductCardProps[];
  wedding: ProductCardProps[];
  home: ProductCardProps[];
  cufflinks: ProductCardProps[];
}

// Generate product data manually
export const getStaticProducts = (): CategoryProducts => {
  // Base product template
  const createProduct = (
    id: number, 
    name: string, 
    description: string, 
    price: number,
    color: string,
    isNew: boolean = true
  ): ProductCardProps => {
    // Determine the category and image path based on the product ID
    let imagePath;
    
    if (id >= 84 && id <= 95) {
      // Oversized tees use the base category image
      imagePath = '/images/oversizedtees.jpg';
    } else if (id >= 96 && id <= 107) {
      // Wedding products use the base category image
      imagePath = '/images/wedding.jpg';
    } else if (id <= 16) {
      // Neckties use box images as primary
      // Map neckties to specific color variants in the image folder
      const colorMap: {[key: string]: string} = {
        'blue': 'navyblue',
        'grey': 'blackpurple',
        'navy': 'navyblue',
        'burgundy': 'red',
        'black': 'blackpink',
        'teal': 'teal',
        'orange': 'orange',
        'purple': 'purple',
        'pink': 'pinkd',
        'yellow': 'yellow',
        'cyan': 'cyan',
        'choco': 'choco',
        'blackpink': 'blackpink',
        'darkpurple': 'darkpurple',
        'orangewhite': 'orangewhite'
      };
      
      const colorKey = colorMap[color.toLowerCase()] || 'navyblue';
      imagePath = `/images/Aproducts/1Necktie/box/box${colorKey}.jpg?v=${new Date().getTime()}`;
    } else if (id >= 64 && id <= 83) {
      // Gift sets use box images as primary
      const colorMap: {[key: number]: string} = {
        64: 'blue.jpg',
        65: 'black.jpg',
        66: 'chrome.jpg',
        67: 'cream.jpg',
        68: 'red.jpg',
        69: 'gold.jpg',
        70: 'pink.jpg',
        71: 'green.JPG',
        72: 'cyan.jpg',
        73: 'babypink.jpg',
        74: 'babypinkd.jpg',
        75: 'aqua.jpg',
        76: 'teal.jpg',
        77: 'violet.jpg',
        78: 'pinkd.jpg',
        79: 'greend.jpg',
        80: 'whiteblue.jpg',
        81: 'pinkblue.jpg',
        82: 'brightpink.jpg',
        83: 'lightgreen.jpg'
      };
      const colorKey = colorMap[id] || 'blue.jpg';
      imagePath = `/images/Aproducts/2Giftset/box/${colorKey}?v=${new Date().getTime()}`;
    } else {
      // Other products use numbered images
      let category = "necktie";
      let imageIndex = ((id - 1) % 6) + 1;
      
      if (id >= 16 && id <= 27) {
        category = "bowtie";
      } else if (id >= 28 && id <= 39) {
        category = "pocketsquares";
      }
      
      imagePath = `/images/${category}${imageIndex}.jpg`;
    }
    
    return {
      id,
      name,
      description,
      price,
      color: color.toLowerCase(),
      image: imagePath,
      isNew,
      link: `/product/${id}`
    };
  };

  // Create products for each category
  const neckties: ProductCardProps[] = [
    createProduct(1, "Royal Duchess Silk", "Handcrafted from the finest Mulberry silk", 8999, "blue", true),
    createProduct(2, "Charcoal Herringbone", "Timeless pattern with a modern twist", 6499, "grey", false),
    createProduct(3, "Midnight Blue Twill", "Deep navy tone with subtle texture", 5999, "navy", true),
    createProduct(4, "Burgundy Classic", "Rich burgundy tone for a sophisticated look", 7499, "burgundy", true),
    createProduct(5, "Geometric Gold", "Intricate gold pattern on black background", 9999, "black", false),
    createProduct(6, "Silver Anniversary", "Elegant silver tie for special occasions", 8499, "grey", true),
    createProduct(7, "Teal Elegance", "Vibrant teal with modern geometric pattern", 7999, "teal", true),
    createProduct(8, "Orange Distinction", "Bold orange necktie for a statement look", 6999, "orange", false),
    createProduct(9, "Purple Royalty", "Deep purple with subtle pattern", 8299, "purple", true),
    createProduct(10, "Pink Diamond", "Luxurious pink with diamond texture", 7699, "pink", false),
    createProduct(11, "Yellow Sunlight", "Bright yellow for a sunny disposition", 6799, "yellow", true),
    createProduct(12, "Cyan Executive", "Professional cyan blue for business attire", 7599, "cyan", false),
    createProduct(13, "Chocolate Sophistication", "Rich chocolate brown with elegant finish", 8199, "choco", true),
    createProduct(14, "Black Pink Contrast", "Striking black with pink accents", 8999, "blackpink", false),
    createProduct(15, "Dark Purple Intensity", "Deep, intense purple for evening events", 9299, "darkpurple", true),
    createProduct(16, "Orange White Stripe", "Classic orange and white striped pattern", 7299, "orangewhite", false)
  ];

  const bowTies: ProductCardProps[] = [
    createProduct(16, "Classic Black Bow", "Timeless black silk bow tie", 4999, "black", true),
    createProduct(17, "Navy Polka Dot", "Playful yet elegant navy bow tie", 5499, "navy", false),
    createProduct(18, "Burgundy Velvet", "Luxurious velvet texture", 6999, "burgundy", true),
    createProduct(19, "Diamond Point White", "Sharp diamond point for formal events", 5999, "white", true),
    createProduct(20, "Emerald Silk", "Vibrant green self-tie bow tie", 5799, "green", false),
    createProduct(21, "Charcoal Herringbone Bow", "Sophisticated pattern in grey", 6299, "grey", true),
    createProduct(22, "Gold Medallion", "Statement bow tie with medallion pattern", 7499, "beige", true),
    createProduct(23, "Ruby Red", "Bold red for striking contrast", 5299, "red", false),
    createProduct(24, "Midnight Blue", "Deep blue with subtle texture", 4899, "navy", true),
    createProduct(25, "Silver Celebration", "Lustrous silver for special occasions", 6899, "grey", true),
    createProduct(26, "Geometric Grey", "Modern geometric pattern", 5599, "grey", false),
    createProduct(27, "Tuxedo Black", "Classic black for black tie events", 6499, "black", true)
  ];

  const pocketSquares: ProductCardProps[] = [
    createProduct(28, "White Silk Square", "Pure silk with hand-rolled edges", 3499, "white", true),
    createProduct(29, "Navy Border", "White square with navy border", 3999, "navy", false),
    createProduct(30, "Burgundy Paisley", "Rich paisley pattern", 4599, "burgundy", true),
    createProduct(31, "Gold Polka", "White with gold polka dots", 4299, "beige", true),
    createProduct(32, "Forest Green Solid", "Deep green for a touch of color", 3799, "green", false),
    createProduct(33, "Charcoal Medallion", "Intricate medallion pattern", 4999, "grey", true),
    createProduct(34, "Azure Floral", "Delicate floral pattern in blue", 4799, "blue", true),
    createProduct(35, "Ruby Geometric", "Bold geometric pattern in red", 4499, "red", false),
    createProduct(36, "Silver Herringbone", "Subtle herringbone texture", 5299, "grey", true),
    createProduct(37, "Ivory Silk", "Classic ivory for weddings", 4999, "white", true),
    createProduct(38, "Emerald Pattern", "Rich emerald with detailed pattern", 4799, "green", false),
    createProduct(39, "Midnight Blue Solid", "Deep blue for versatility", 3899, "navy", true)
  ];

  const men: ProductCardProps[] = [
    createProduct(40, "Executive Navy", "Perfect for business meetings", 6999, "navy", true),
    createProduct(41, "Charcoal Pinstripe", "Subtle pinstripe pattern", 7499, "grey", false),
    createProduct(42, "Oxford Blue", "Classic blue for everyday elegance", 5999, "blue", true),
    createProduct(43, "Power Red", "Make a statement in meetings", 6499, "red", true),
    createProduct(44, "Slate Grey", "Versatile grey for any occasion", 5799, "grey", false),
    createProduct(45, "Black Diamond", "Textured black tie", 6899, "black", true),
    createProduct(46, "Navy Medallion", "Traditional pattern with modern touch", 7299, "navy", true),
    createProduct(47, "Forest Business", "Deep green for distinguished look", 6599, "green", false),
    createProduct(48, "Blue Steel", "Modern blue-grey blend", 5999, "blue", true),
    createProduct(49, "Burgundy Classic", "Timeless burgundy for professionals", 6799, "burgundy", true),
    createProduct(50, "Conservative Stripe", "Traditional striped pattern", 6299, "grey", false),
    createProduct(51, "Gentleman's Choice", "Sophisticated pattern in grey", 7599, "black", true)
  ];

  const women: ProductCardProps[] = [
    createProduct(52, "Coral Bloom", "Vibrant coral for a feminine touch", 5999, "pink", true),
    createProduct(53, "Lavender Whisper", "Delicate lavender tie", 6499, "purple", false),
    createProduct(54, "Rose Gold", "Shimmering rose gold pattern", 7999, "pink", true),
    createProduct(55, "Blush Pink", "Subtle pink for professional settings", 6299, "pink", true),
    createProduct(56, "Teal Elegance", "Rich teal with subtle pattern", 6799, "blue", false),
    createProduct(57, "Purple Passion", "Deep purple for bold statements", 7299, "purple", true),
    createProduct(58, "Crimson Slim", "Slimline tie in vibrant red", 5999, "red", true),
    createProduct(59, "Mint Refresh", "Fresh mint green for spring", 6199, "green", false),
    createProduct(60, "Sapphire Blue", "Deep blue with feminine details", 6899, "blue", true),
    createProduct(61, "Plum Perfect", "Rich plum tone for sophistication", 7199, "purple", true),
    createProduct(62, "Mauve Dream", "Soft mauve for subtle elegance", 6599, "pink", false),
    createProduct(63, "Berry Bright", "Vibrant berry tone", 6399, "burgundy", true)
  ];

  const combos: ProductCardProps[] = [
    createProduct(64, "Navy & Burgundy Set", "Tie and pocket square set", 9999, "blue", true),
    createProduct(65, "Black Formal Combo", "Bow tie and pocket square", 8999, "black", false),
    createProduct(66, "Silver Chrome Set", "Tie, pocket square, and cufflinks", 12999, "chrome", true),
    createProduct(67, "Wedding Cream", "Complete wedding accessory set", 15999, "cream", true),
    createProduct(68, "Power Red Set", "Red tie and gold cufflinks", 9499, "red", false),
    createProduct(69, "Golden Elegance Set", "Coordinated gold accessories", 10999, "gold", true),
    createProduct(70, "Pink Diamond Set", "Premium pink accessory collection", 11499, "pink", true),
    createProduct(71, "Green Executive Set", "Professional green accessory set", 9799, "green", false),
    createProduct(72, "Cyan Business Set", "Modern cyan accessory collection", 10999, "cyan", true),
    createProduct(73, "Light Pink Gift Set", "Delicate pink accessory set", 8999, "babypink", false),
    createProduct(74, "Deep Pink Collection", "Rich pink accessory set", 9999, "babypinkd", true),
    createProduct(75, "Aqua Marine Set", "Refreshing aqua accessory collection", 10499, "aqua", false),
    createProduct(76, "Teal Harmony Set", "Coordinated teal accessories", 11299, "teal", true),
    createProduct(77, "Violet Luxury Set", "Premium violet accessory set", 12499, "violet", false),
    createProduct(78, "Pink Delight Set", "Pink premium accessory collection", 9999, "pinkd", true),
    createProduct(79, "Deep Green Set", "Elegant green accessory package", 10799, "greend", false),
    createProduct(80, "White & Blue Set", "Classic white and blue accessories", 11999, "whiteblue", true),
    createProduct(81, "Pink & Blue Combo", "Stylish pink and blue collection", 10499, "pinkblue", false),
    createProduct(82, "Bright Pink Gift Set", "Vibrant pink accessory set", 9799, "brightpink", true),
    createProduct(83, "Light Green Collection", "Fresh light green accessories", 10299, "lightgreen", false)
  ];

  const oversizedTees: ProductCardProps[] = [
    createProduct(84, "Black Luxury Tee", "Oversized premium cotton t-shirt", 3999, "black", true),
    createProduct(85, "White Essential", "Staple white oversized tee", 3499, "white", false),
    createProduct(86, "Navy Comfort", "Relaxed fit navy t-shirt", 3799, "navy", true),
    createProduct(87, "Grey Marl", "Soft marl texture", 3599, "grey", true),
    createProduct(88, "Burgundy Statement", "Rich tone casual tee", 3899, "burgundy", false),
    createProduct(89, "Forest Casual", "Deep green for everyday wear", 3799, "green", true),
    createProduct(90, "Charcoal Minimal", "Subtle logo detail", 3699, "grey", true),
    createProduct(91, "Ivory Premium", "Luxurious ivory tee", 4299, "white", false),
    createProduct(92, "Blue Signature", "With subtle embroidered logo", 3999, "blue", true),
    createProduct(93, "Taupe Essential", "Neutral tone for versatility", 3599, "beige", true),
    createProduct(94, "Black Embroidered", "With gold embroidery detail", 4499, "black", false),
    createProduct(95, "Cream Luxury", "Soft cream tone premium tee", 3899, "beige", true)
  ];

  const wedding: ProductCardProps[] = [
    createProduct(96, "Ivory Celebration", "Pure silk for your special day", 9999, "white", true),
    createProduct(97, "Silver Anniversary", "Lustrous silver tie", 8999, "grey", false),
    createProduct(98, "Champagne Toast", "Warm champagne tone", 10499, "beige", true),
    createProduct(99, "White Diamond", "Textured white tie", 9499, "white", true),
    createProduct(100, "Platinum Special", "Platinum silk with subtle pattern", 11999, "grey", false),
    createProduct(101, "Gold Ceremony", "Elegant gold for ceremonies", 12499, "beige", true),
    createProduct(102, "Ivory Paisley", "Traditional pattern for weddings", 9799, "white", true),
    createProduct(103, "Pearl Elegance", "Pearlescent finish", 10999, "white", false),
    createProduct(104, "Blush Wedding", "Subtle blush tone for modern weddings", 9299, "pink", true),
    createProduct(105, "Silver Jacquard", "Intricate jacquard pattern", 11499, "grey", true),
    createProduct(106, "Cream Silk", "Pure silk with hand-rolled edges", 10799, "beige", false),
    createProduct(107, "White Celebration", "Traditional white for formal weddings", 9999, "white", true)
  ];

  // Create a function to ensure all products have images
  const ensureProductImages = (products: ProductCardProps[]): ProductCardProps[] => {
    return products.map(product => {
      // If the product doesn't have an image or has the default formal attire image
      if (!product.image || product.image.includes('Formal Attire Portrait')) {
        let imagePath;
        
        if (product.id >= 84 && product.id <= 95) {
          // Oversized tees use the base category image
          imagePath = '/images/oversizedtees.jpg';
        } else if (product.id >= 96 && product.id <= 107) {
          // Wedding products use the base category image
          imagePath = '/images/wedding.jpg';
        } else if (product.id >= 64 && product.id <= 83) {
          // Gift sets use box images as primary
          const colorMap: {[key: number]: string} = {
            64: 'blue.jpg',
            65: 'black.jpg',
            66: 'chrome.jpg',
            67: 'cream.jpg',
            68: 'red.jpg',
            69: 'gold.jpg',
            70: 'pink.jpg',
            71: 'green.JPG',
            72: 'cyan.jpg',
            73: 'babypink.jpg',
            74: 'babypinkd.jpg',
            75: 'aqua.jpg',
            76: 'teal.jpg',
            77: 'violet.jpg',
            78: 'pinkd.jpg',
            79: 'greend.jpg',
            80: 'whiteblue.jpg',
            81: 'pinkblue.jpg',
            82: 'brightpink.jpg',
            83: 'lightgreen.jpg'
          };
          const colorKey = colorMap[product.id] || 'blue.jpg';
          imagePath = `/images/Aproducts/2Giftset/box/${colorKey}?v=${new Date().getTime()}`;
        } else if (product.id >= 16 && product.id <= 27) {
          let category = "bowtie";
          let imageIndex = ((product.id - 16) % 6) + 1;
          imagePath = `/images/${category}${imageIndex}.jpg`;
        } else if (product.id >= 28 && product.id <= 39) {
          let category = "pocketsquares";
          let imageIndex = ((product.id - 28) % 6) + 1;
          imagePath = `/images/${category}${imageIndex}.jpg`;
        } else {
          // Other products use numbered images
          let category = "necktie";
          let imageIndex = ((product.id - 1) % 6) + 1; 
          imagePath = `/images/${category}${imageIndex}.jpg`;
        }
        
        return {
          ...product,
          image: imagePath
        };
      }
      return product;
    });
  };

  // Ensure all products have images
  const necktiesWithImages = ensureProductImages(neckties);
  const bowTiesWithImages = ensureProductImages(bowTies);
  const pocketSquaresWithImages = ensureProductImages(pocketSquares);
  const menWithImages = ensureProductImages(men);
  const womenWithImages = ensureProductImages(women);
  const combosWithImages = ensureProductImages(combos);
  const oversizedTeesWithImages = ensureProductImages(oversizedTees);
  const weddingWithImages = ensureProductImages(wedding);

  // Create cufflinks data
  const cufflinks: ProductCardProps[] = [
    {
      id: 108,
      name: "Silver Square Cufflinks",
      description: "Classic sterling silver square cufflinks with subtle engraving",
      price: 7999,
      color: "silver",
      image: "/images/cufflinks1.jpg",
      isNew: true,
      link: `/product/108`
    },
    {
      id: 109,
      name: "Gold Knot Cufflinks",
      description: "Elegant gold-plated knot design cufflinks",
      price: 9499,
      color: "gold",
      image: "/images/cufflinks2.jpg",
      isNew: false,
      link: `/product/109`
    },
    {
      id: 110,
      name: "Onyx Round Cufflinks",
      description: "Sophisticated black onyx stone set in silver",
      price: 8499,
      color: "black",
      image: "/images/cufflinks3.jpg",
      isNew: true,
      link: `/product/110`
    },
    {
      id: 111,
      name: "Navy Blue Enamel",
      description: "Navy blue enamel with silver detailing",
      price: 7299,
      color: "blue",
      image: "/images/cufflinks4.jpg",
      isNew: true,
      link: `/product/111`
    },
    {
      id: 112,
      name: "Burgundy Stone",
      description: "Deep burgundy stone set in gold plating",
      price: 8999,
      color: "burgundy",
      image: "/images/cufflinks5.jpg",
      isNew: false,
      link: `/product/112`
    },
    {
      id: 113,
      name: "Silver Initial",
      description: "Personalized silver initial cufflinks",
      price: 10999,
      color: "silver",
      image: "/images/cufflinks6.jpg",
      isNew: true,
      link: `/product/113`
    }
  ];

  // Home page features a mix of products from all categories
  // Ensure we have enough products for the home page
  const home: ProductCardProps[] = [
    // First row - neckties with box images
    { ...necktiesWithImages[0], image: `/images/Aproducts/1Necktie/box/boxnavyblue.jpg?v=${new Date().getTime()}` },
    { ...necktiesWithImages[1], image: `/images/Aproducts/1Necktie/box/boxblackpurple.jpg?v=${new Date().getTime()}` },
    { ...necktiesWithImages[2], image: `/images/Aproducts/1Necktie/box/boxnavyblue.jpg?v=${new Date().getTime()}` },
    { ...necktiesWithImages[3], image: `/images/Aproducts/1Necktie/box/boxred.jpg?v=${new Date().getTime()}` },
    
    // Second row - bow ties
    { ...bowTiesWithImages[0], image: '/images/bowtie1.jpg' },
    { ...bowTiesWithImages[1], image: '/images/bowtie2.jpg' },
    { ...bowTiesWithImages[2], image: '/images/bowtie3.jpg' },
    { ...bowTiesWithImages[3], image: '/images/bowtie4.jpg' },
    
    // Third row - pocket squares
    { ...pocketSquaresWithImages[0], image: '/images/pocketsquares1.jpg' },
    { ...pocketSquaresWithImages[1], image: '/images/pocketsquares2.jpg' },
    { ...pocketSquaresWithImages[2], image: '/images/pocketsquares3.jpg' },
    { ...pocketSquaresWithImages[3], image: '/images/pocketsquares4.jpg' },
    
    // Fourth row - mix of categories
    { ...oversizedTeesWithImages[0], image: '/images/oversizedtees.jpg' },
    { ...weddingWithImages[0], image: '/images/wedding.jpg' },
    { ...necktiesWithImages[4], image: `/images/Aproducts/1Necktie/box/boxblackpink.jpg?v=${new Date().getTime()}` },
    { ...necktiesWithImages[5], image: `/images/Aproducts/1Necktie/box/boxblackpurple.jpg?v=${new Date().getTime()}` }
  ];

  return {
    neckties: necktiesWithImages,
    bowTies: bowTiesWithImages,
    pocketSquares: pocketSquaresWithImages,
    men: menWithImages,
    women: womenWithImages,
    combos: combosWithImages,
    oversizedTees: oversizedTeesWithImages,
    wedding: weddingWithImages,
    home,
    cufflinks
  };
};

export default {
  getStaticProducts
}; 