export interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  color: string;
  pattern?: string;
  material?: string;
  category?: string;
  isNew?: boolean;
  link: string;
  sku?: string;
  quantity?: number;
}

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
    isNew: boolean = true,
    sku: string = `GS-${id}`,
    quantity: number = 10,
    pattern: string = 'Various',
    material: string = 'Microfiber'
  ): ProductCardProps => {
    // Determine the category and image path based on the product ID
    let imagePath;
    
    if (id >= 84 && id <= 95) {
      // Oversized tees use the base category image
      imagePath = '/images/oversizedtees.jpg';
    } else if (id >= 96 && id <= 107) {
      // Wedding products use the base category image
      imagePath = '/images/wedding.jpg';
    } else if (id <= 19) {
      // Neckties use the new naming convention with direct file names
      const necktieNames: {[key: number]: string} = {
        1: 'Rosewood Reverie.jpg',
        2: 'Tangerine Tact.jpg',
        3: 'Purple Prism.jpg',
        4: 'Jade Reverie.jpg',
        5: 'Bold Blush Charm.jpg',
        6: 'Amber Grid Classic.jpg', 
        7: 'Golden Gleam Check.jpg',
        8: 'Crimson Board.jpg',
        9: 'Midnight Stride.jpg',
        10: 'Rosé Rally.jpg',
        11: 'Blush Boulevard.jpg',
        12: 'Lavender Lines.jpg',
        13: 'Golden Charm.jpg',
        14: 'Royal Whimsy.jpg',
        15: 'Vintage Charm.jpg',
        16: 'Highland Flair.jpg',
        17: 'Midnight Maze.jpg',
        18: 'Ocean Breeze.jpg',
        19: 'Royal Twilight.jpg'
      };
      
      const imageName = necktieNames[id] || 'Rosewood Reverie.jpg';
      // More aggressive cache busting with random number + timestamp
      const cacheBuster = `?v=${Math.random()}_${new Date().getTime()}`;
      imagePath = `/images/Aproducts/1Necktie/box/${imageName}${cacheBuster}`;
    } else if (id >= 64 && id <= 83) {
      // Gift sets use box images as primary
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
      imagePath = `/images/Aproducts/2Giftset/box/${imageName}?v=${new Date().getTime()}`;
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
      link: `/product/${id}`,
      sku,
      quantity,
      pattern,
      material
    };
  };

  // Create products for each category
  const neckties: ProductCardProps[] = [
    createProduct(1, "Rosewood Reverie", "Infused with timeless charm, the Rosewood Reverie necktie showcases a classic paisley motif in rich shades of pink and soft silver.", 799, "pink", true, "SKUDYNENT001", 16, "Elegant Bold Paisley", "Microfiber"),
    createProduct(2, "Tangerine Tact", "Bold yet refined, the Tangerine Tact necktie features a lively orange hue accentuated by a delicate chevron weave.", 799, "orange", false, "SKUDYNENT002", 16, "Subtle Chevron Texture", "Microfiber"),
    createProduct(3, "Purple Prism", "The Purple Prism necktie showcases a rich purple tone layered with a fine geometric texture that catches the light beautifully.", 799, "purple", true, "SKUDYNENT003", 15, "Geometric Micro-Texture", "Microfiber"),
    createProduct(4, "Jade Reverie", "The Jade Reverie tie features a calming green background intricately woven with a soft paisley pattern in muted silver tones.", 799, "green", true, "SKUDYNENT004", 16, "Classic Paisley Weave", "Microfiber"),
    createProduct(5, "Bold Blush Charm", "With a deep black base and intricate dusty pink paisley embroidery, the Noir Paisley Charm tie strikes a perfect balance between classic sophistication and modern flair.", 799, "pink", false, "SKUDYNENT005", 16, "Paisley", "Microfiber"),
    createProduct(6, "Amber Grid Classic", "Bright and charismatic, the Amber Grid Classic tie features a vivid orange tone with a refined grid pattern highlighted by subtle silver accents.", 799, "orange", true, "SKUDYNENT006", 16, "Geometric Grid", "Microfiber"),
    createProduct(7, "Golden Gleam Check", "Radiating positivity and charm, the Golden Gleam Check tie is crafted with a bright yellow hue and a refined micro-checkered pattern.", 799, "yellow", true, "SKUDYNENT007", 16, "Micro Checkered Grid", "Microfiber"),
    createProduct(8, "Crimson Board", "Deep crimson with an intricate shadow weave, this tie creates a bold yet refined look, perfect for leaving a memorable impression.", 799, "burgundy", false, "SKUDYNENT008", 16, "Subtle Geometric Texture", "Microfiber"),
    createProduct(9, "Midnight Stride", "A sophisticated navy base with tonal textured stripes, this tie is designed for timeless elegance and versatility.", 799, "navy", true, "SKUDYNENT009", 16, "Diagonal Woven Stripes", "Microfiber"),
    createProduct(10, "Rosé Rally", "A vibrant fusion of blush pink, deep navy, white, and a touch of magenta creates a bold yet tasteful tie.", 799, "pink", false, "SKUDYNENT010", 16, "Wide Diagonal Stripes", "Microfiber"),
    createProduct(11, "Blush Boulevard", "This sophisticated tie blends soft pink with sharp black and white plaid accents, offering a contemporary twist on a classic pattern.", 799, "pink", true, "SKUDYNENT011", 16, "Modern Plaid", "Microfiber"),
    createProduct(12, "Lavender Lines", "A stylish lavender tie featuring fine white, navy, and greenish stripes, perfect for a fresh, confident look.", 799, "purple", false, "SKUDYNENT012", 16, "Sleek Stripes", "Microfiber"),
    createProduct(13, "Golden Charm", "A vibrant golden-yellow tie featuring an elegant checkered texture, ideal for adding a lively yet polished touch.", 799, "yellow", true, "SKUDYNENT013", 16, "Subtle Checkered Weave", "Microfiber"),
    createProduct(14, "Royal Whimsy", "A luxurious lavender tie adorned with a classic deep purple paisley design, embodying charm and sophistication.", 799, "purple", true, "SKUDYNENT014", 16, "Paisley", "Microfiber"),
    createProduct(15, "Vintage Charm", "A rich brown tie with intricate gold paisley patterns, offering a vintage yet polished elegance.", 799, "brown", false, "SKUDYNENT015", 16, "Paisley", "Microfiber"),
    createProduct(16, "Highland Flair", "A bold plaid design in shades of blue and purple, blending classic tradition with modern attitude.", 799, "blue", true, "SKUDYNENT016", 16, "Plaid", "Microfiber"),
    createProduct(17, "Midnight Maze", "A modern twist with an intricate navy and light blue geometric weave that captures light and attention effortlessly.", 799, "navy", false, "SKUDYNENT017", 16, "Geometric", "Microfiber"),
    createProduct(18, "Ocean Breeze", "Fresh aqua blues, navy, and green stripes bring vibrant energy and effortless charm to your outfit.", 799, "blue", true, "SKUDYNENT018", 16, "Striped", "Microfiber"),
    createProduct(19, "Royal Twilight", "Deep violets, lilacs, and sharp white accents make this tie a bold, confident choice for both formal and smart-casual looks.", 799, "purple", false, "SKUDYNENT019", 16, "Plaid", "Microfiber")
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
    createProduct(64, "Coral Elegance", "A testament to timeless refinement, The Coral Elegance pairs a finely woven microfibre necktie with a matching pocket square and bold, elegant cufflinks.", 2799, "coral", true, "GS-CORAL-01", 15, "Solid with subtle texture"),
    createProduct(65, "Rosewood Majesty", "A celebration of classic elegance, the Rosewood Majesty set brings together a finely textured microfibre necktie, a matching pocket square, and sleek rose gold striped cufflinks.", 2799, "rosewood", false, "GS-ROSE-02", 12, "Textured solid"),
    createProduct(66, "Serene Paisley", "A tribute to timeless sophistication, the Serene Paisley set showcases a finely detailed microfibre necktie, an elegantly matching pocket square, and striking black cufflinks.", 2799, "navy", true, "GS-NAVY-03", 8, "Paisley"),
    createProduct(67, "Azure Prism", "The Azure Prism set speaks to the bold and modern gentleman, combining a vibrant microfibre necktie, a coordinated pocket square, and distinguished rose gold cufflinks.", 2799, "azure", true, "GS-AZURE-04", 10, "Geometric"),
    createProduct(68, "Frosted Whirl", "Step into refined elegance with the Frosted Whirl set, featuring a microfibre tie and matching pocket square with a beautifully detailed paisley design.", 2799, "frosted", false, "GS-FROST-05", 7, "Paisley"),
    createProduct(69, "Blush Avenue", "Add a pop of sophistication with the Blush Avenue set, featuring a microfibre tie and matching pocket square adorned in pink, white, and deep navy stripes.", 2799, "blush", true, "GS-BLUSH-06", 14, "Striped"),
    createProduct(70, "Golden Hour", "Illuminate your look with the Golden Hour set, featuring a glossy chevron-patterned tie and a matching pocket square in a rich, sunlit gold.", 2799, "gold", true, "GS-GOLD-07", 9, "Chevron"),
    createProduct(71, "Blush Mosaic", "Stand out with the Blush Mosaic set, featuring a shimmering micro-checkered tie and pocket square in vibrant shades of blush, red, and light grey.", 2799, "blush", false, "GS-BLUSH-08", 11, "Micro-checkered"),
    createProduct(72, "Midnight Paisley", "The Midnight Paisley set brings together a bold black backdrop with intricate swirling blue and blush paisley embroidery, paired with sleek copper toned checkered cufflinks.", 2799, "midnight", true, "GS-MDNT-09", 8, "Paisley"),
    createProduct(73, "Emerald Ivory Elegance", "The Emerald Elegance set showcases a luxurious deep green silk base with intricate paisley embroidery, paired with hexagonal silver cufflinks with black pattern.", 2799, "emerald", false, "GS-EMER-10", 6, "Paisley"),
    createProduct(74, "Teal Noir", "The Teal Noir set brings a sharp, modern twist with vivid teal and subtle ivory lines against a deep background, finished with sleek, dark-toned cufflinks.", 2799, "teal", true, "GS-TEAL-11", 10, "Linear"),
    createProduct(75, "Dark Green Fuchsia Paisley", "The Dark Green Fuchsia Paisley set captures vibrant energy with rich green tones and lively fuchsia pink paisley patterns, complete with sleek black cufflinks.", 1899, "green", false, "GS-GREEN-12", 15, "Paisley"),
    createProduct(76, "Navy Brown Bloom", "The Navy Brown Bloom set merges deep navy tones with intricate brown floral patterns, creating a refined, textured look, complete with striking blue cufflinks.", 2799, "navy", true, "GS-NAVY-13", 9, "Floral"),
    createProduct(77, "Aqua Lilac Paisley", "The Aqua Lilac Paisley set brings a refreshing play of soft aqua blues and muted lilac tones across an elegant black base, completed with gold-toned cufflinks.", 2799, "aqua", false, "GS-AQUA-14", 12, "Paisley"),
    createProduct(78, "Teal & Green Paisley", "The Teal Green Paisley set showcases vibrant teal and green paisley patterns over a dark base, paired with antique gold-toned cufflinks for a classic, elegant touch.", 2799, "teal", true, "GS-TEAL-15", 8, "Paisley"),
    createProduct(79, "Royal Amethyst", "The Royal Amethyst set dazzles with a rich mix of deep purple and lilac hues, paired with subtle woven details for a touch of sophistication.", 2799, "purple", false, "GS-PURP-16", 7, "Woven texture"),
    createProduct(80, "White & Blue Set", "Classic white and blue accessories for a timeless, versatile look, perfect for both formal occasions and professional settings.", 2799, "whiteblue", true, "GS-WHTBL-17", 10, "Classic solid"),
    createProduct(81, "Crimson Royale Brocade", "The Crimson Royale Brocade set radiates bold elegance with its intricate, regal patterns woven into rich crimson fabric, paired with classic dark cufflinks.", 2799, "crimson", false, "GS-CRIM-18", 6, "Brocade"),
    createProduct(82, "Midnight Mirage Paisley", "Dive into deep elegance with the Midnight Mirage Paisley set. Shades of blue, indigo, and sapphire swirl in a hypnotic paisley dance, matched with starry cufflinks.", 1899, "midnight", true, "GS-MDNT-19", 15, "Paisley"),
    createProduct(83, "Crimson Checkmate", "Striking a perfect balance between playful and polished, the Crimson Checkmate set features a vibrant plaid design in shades of red and pink.", 2799, "crimson", false, "GS-CRIM-20", 9, "Plaid"),
    createProduct(84, "Mint Reverie Paisley", "Light, fresh, and effortlessly sophisticated, the Mint Reverie Paisley set infuses your look with a breath of elegance. Detailed swirling patterns on a soft mint canvas, paired with golden, finely etched cufflinks.", 2799, "mint", true, "SKUDYNEGS019", 4, "Whispered Paisley Brocade")
  ];

  // Update the link property for gift sets (combo items)
  const giftSetsWithUpdatedLinks = combos.map(item => {
    console.log(`Mapping gift set ID ${item.id} to URL path`);
    return {
      ...item,
      link: `/gift-set/${item.id}`
    };
  });

  // Debug info to check gift set IDs
  console.log("Gift set IDs after mapping:", giftSetsWithUpdatedLinks.map(item => item.id));

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
          // Gift sets use the real image names
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
          const imageName = giftSetNames[product.id] || 'Coral Elegance.jpg';
          imagePath = `/images/Aproducts/2Giftset/box/${imageName}?v=${new Date().getTime()}`;
        } else if (product.id >= 16 && product.id <= 27) {
          let category = "bowtie";
          let imageIndex = ((product.id - 16) % 6) + 1;
          imagePath = `/images/${category}${imageIndex}.jpg`;
        } else if (product.id >= 28 && product.id <= 39) {
          let category = "pocketsquares";
          let imageIndex = ((product.id - 28) % 6) + 1;
          imagePath = `/images/${category}${imageIndex}.jpg`;
        } else if (product.id >= 1 && product.id <= 19) {
          // Neckties use the new image structure
          const necktieNames: {[key: number]: string} = {
            1: 'Rosewood Reverie.jpg',
            2: 'Tangerine Tact.jpg',
            3: 'Purple Prism.jpg',
            4: 'Jade Reverie.jpg',
            5: 'Bold Blush Charm.jpg',
            6: 'Amber Grid Classic.jpg', 
            7: 'Golden Gleam Check.jpg',
            8: 'Crimson Board.jpg',
            9: 'Midnight Stride.jpg',
            10: 'Rosé Rally.jpg',
            11: 'Blush Boulevard.jpg',
            12: 'Lavender Lines.jpg',
            13: 'Golden Charm.jpg',
            14: 'Royal Whimsy.jpg',
            15: 'Vintage Charm.jpg',
            16: 'Highland Flair.jpg',
            17: 'Midnight Maze.jpg',
            18: 'Ocean Breeze.jpg',
            19: 'Royal Twilight.jpg'
          };
          
          const imageName = necktieNames[product.id] || 'Rosewood Reverie.jpg';
          const cacheBuster = `?v=${Math.random()}_${new Date().getTime()}`;
          imagePath = `/images/Aproducts/1Necktie/box/${imageName}${cacheBuster}`;
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
    { ...necktiesWithImages[0], image: `/images/Aproducts/1Necktie/box/Rosewood Reverie.jpg?v=${Math.random()}_${new Date().getTime()}` },
    { ...necktiesWithImages[1], image: `/images/Aproducts/1Necktie/box/Tangerine Tact.jpg?v=${Math.random()}_${new Date().getTime()}` },
    { ...necktiesWithImages[2], image: `/images/Aproducts/1Necktie/box/Purple Prism.jpg?v=${Math.random()}_${new Date().getTime()}` },
    { ...necktiesWithImages[3], image: `/images/Aproducts/1Necktie/box/Jade Reverie.jpg?v=${Math.random()}_${new Date().getTime()}` },
    
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
    { ...necktiesWithImages[4], image: `/images/Aproducts/1Necktie/box/Golden Gleam Check.jpg?v=${Math.random()}_${new Date().getTime()}` },
    { ...necktiesWithImages[5], image: `/images/Aproducts/1Necktie/box/Highland Flair.jpg?v=${Math.random()}_${new Date().getTime()}` }
  ];

  return {
    neckties: necktiesWithImages,
    bowTies: bowTiesWithImages,
    pocketSquares: pocketSquaresWithImages,
    men: menWithImages,
    women: womenWithImages,
    combos: giftSetsWithUpdatedLinks,
    oversizedTees: oversizedTeesWithImages,
    wedding: weddingWithImages,
    home,
    cufflinks
  };
};

export default {
  getStaticProducts
}; 