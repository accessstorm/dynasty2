import { useEffect, useState } from "react";
import { Card, Text, Button } from "@mantine/core";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string; // "necktie" or "giftset"
}

// Function to format price in Indian Rupees
const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

const BestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // For now, we'll use placeholder products
    // TODO: Replace with actual products once the images are uploaded
    const placeholderProducts: Product[] = [
      // Neckties placeholders (3)
      {
        id: 101,
        name: "Premium Necktie 1",
        description: "Elegant necktie placeholder",
        price: 4999,
        image: "/images/necktie1.jpg", // Using existing image as placeholder
        type: "necktie"
      },
      {
        id: 102,
        name: "Premium Necktie 2",
        description: "Elegant necktie placeholder",
        price: 5999,
        image: "/images/necktie2.jpg",
        type: "necktie"
      },
      {
        id: 103,
        name: "Premium Necktie 3",
        description: "Elegant necktie placeholder",
        price: 6999,
        image: "/images/necktie3.jpg",
        type: "necktie"
      },
      // Gift Sets placeholders (6)
      {
        id: 201,
        name: "Premium Gift Set 1",
        description: "Elegant gift set placeholder",
        price: 9999,
        image: "/images/pocketsquares1.jpg", // Using existing image as placeholder for now
        type: "giftset"
      },
      {
        id: 202,
        name: "Premium Gift Set 2",
        description: "Elegant gift set placeholder",
        price: 12999,
        image: "/images/pocketsquares2.jpg",
        type: "giftset"
      },
      {
        id: 203,
        name: "Premium Gift Set 3",
        description: "Elegant gift set placeholder",
        price: 14999,
        image: "/images/pocketsquares3.jpg",
        type: "giftset"
      },
      {
        id: 204,
        name: "Premium Gift Set 4",
        description: "Elegant gift set placeholder",
        price: 11999,
        image: "/images/pocketsquares4.jpg",
        type: "giftset"
      },
      {
        id: 205,
        name: "Premium Gift Set 5",
        description: "Elegant gift set placeholder",
        price: 13999,
        image: "/images/pocketsquares5.jpg",
        type: "giftset"
      },
      {
        id: 206,
        name: "Premium Gift Set 6",
        description: "Elegant gift set placeholder",
        price: 10999,
        image: "/images/pocketsquares6.jpg",
        type: "giftset"
      }
    ];
    
    setProducts(placeholderProducts);
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
                  <Text fz="xs" c="dimmed" className="mt-2 italic">
                    {product.type === "necktie" ? "Necktie" : "Gift Set"}
                  </Text>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center space-x-8 mt-12">
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