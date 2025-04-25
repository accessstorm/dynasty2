import { Text } from '@mantine/core';
import { motion } from 'framer-motion';

const OurStory = () => {
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
          <Text className="text-4xl font-serif mb-3">Our Story</Text>
          <Text className="text-lg text-gray-600 max-w-2xl mx-auto">
            The legacy of Dynasty - crafting premium neckwear since 1975.
          </Text>
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="/images/logo.jpg" 
              alt="Dynasty Logo" 
              className="w-full max-w-md mx-auto h-auto object-contain rounded-sm"
            />
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mt-8 text-center md:text-left">
              <Text className="text-gray-700 leading-relaxed">
                Started in the heart of Mumbai, Dynasty has grown from a small family-owned shop to one of India's premier tie and accessory brands. Our commitment to quality and craftsmanship has earned us the trust of discerning gentlemen across the country.
              </Text>
              <Text className="text-gray-700 leading-relaxed mt-4">
                Each piece in our collection is meticulously handcrafted by our master artisans, using only the finest materials sourced from around the world. We take pride in our attention to detail and our dedication to preserving traditional techniques while embracing modern designs.
              </Text>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory; 