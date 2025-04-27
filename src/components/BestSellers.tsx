import { useEffect, useState } from "react";
import { Card, Text, Button } from "@mantine/core";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getStaticProducts, ProductCardProps } from "../services/StaticProductService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string; // "necktie" or "giftset"
  link: string;
}

// Function to format price in Indian Rupees
const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

const BestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Get products from StaticProductService
    const allProducts = getStaticProducts();
    
    // Get the available necktie IDs that have confirmed images
    const availableNecktieIds = [1, 2, 3, 4, 5, 6, 7, 8, 13];
    
    // Select top neckties with verified images (3)
    const topNeckties = allProducts.neckties
      .filter(tie => availableNecktieIds.includes(tie.id))
      .filter(tie => tie.isNew)
      .slice(0, 3)
      .map(tie => ({
        id: tie.id,
        name: tie.name,
        description: tie.description,
        price: tie.price,
        image: tie.image,
        type: "necktie",
        link: tie.link
      }));
      
    // Select top gift sets (3)
    const topGiftSets = allProducts.combos
      .slice(0, 3)
      .map(giftSet => ({
        id: giftSet.id,
        name: giftSet.name,
        description: giftSet.description,
        price: giftSet.price,
        image: giftSet.image,
        type: "giftset",
        link: giftSet.link
      }));
    
    // Combine the products
    setProducts([...topNeckties, ...topGiftSets]);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
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
          <Text className="text-4xl font-serif mb-3">Best Sellers</Text>
          <Text className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most popular products, handpicked for elegance and quality.
          </Text>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={`bestseller-${index}`}
              variants={itemVariants}
            >
              <Card 
                shadow="sm" 
                padding="0"
                radius="sm"
                className="overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                component={Link}
                to={product.link}
              >
                <Card.Section>
                  <div className="h-64 overflow-hidden">
                    <motion.img
                      src={`${product.image}?v=${Date.now()}`} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </Card.Section>
                
                <div className="p-4">
                  <Text fw={500} className="mb-1">{product.name}</Text>
                  <Text fz="sm" c="dimmed">{formatINR(product.price)}</Text>
                  <Text fz="xs" c="dimmed" className="mt-2 italic">
                    {product.type === "necktie" ? "Necktie" : "Gift Set"}
                  </Text>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center space-x-4 mt-12">
          <Button
            component={Link}
            to="/neckties"
            variant="outline"
            radius="0"
            className="border-black text-black hover:bg-black hover:text-white transition-all px-8 py-2 tracking-widest text-sm uppercase"
          >
            Shop Neckties
          </Button>
          <Button
            component={Link}
            to="/gift-sets"
            variant="outline"
            radius="0"
            className="border-black text-black hover:bg-black hover:text-white transition-all px-8 py-2 tracking-widest text-sm uppercase"
          >
            Shop Gift Sets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers; 