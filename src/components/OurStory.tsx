import { Text, Button } from '@mantine/core';
import { motion } from 'framer-motion';
import { useState } from 'react';

const OurStory = () => {
  const [expanded, setExpanded] = useState(false);

  const conciseStory = (
    <>
      <Text className="text-gray-700 leading-relaxed text-sm md:text-base">
        Rooted in the legacy of S.K. Enterprises, Dynasty redefines luxury for the modern gentleman.
      </Text>
      <Text className="text-gray-700 leading-relaxed mt-3 text-sm md:text-base">
        Born from decades of craftsmanship and timeless style, we carry forward a tradition of excellence — blending heritage with a bold, contemporary spirit.
      </Text>
      <Text className="text-gray-700 leading-relaxed mt-3 text-sm md:text-base">
        This is more than fashion.
        <br />
        This is Dynasty.
      </Text>
      <div className="mt-6">
        <Button 
          onClick={() => setExpanded(true)} 
          variant="outline" 
          color="dark" 
          radius="xs"
          className="border-gray-400 hover:bg-gray-100 transition-colors duration-300"
        >
          Learn More
        </Button>
      </div>
    </>
  );

  const fullStory = (
    <>
      <Text className="text-gray-700 leading-relaxed text-sm md:text-base">
        At the heart of Dynasty lies a legacy that began over three decades ago with <strong>S.K. Enterprises</strong> — a pioneer in crafting premium men's fashion accessories. Founded by <strong>Mr. Vinay Mehta</strong> in the vibrant city of Mumbai, S.K. became a symbol of craftsmanship, quality, and timeless style, serving prestigious clients across industries and continents.
      </Text>
      <Text className="text-gray-700 leading-relaxed mt-3 text-sm md:text-base">
        Dynasty is the next chapter in this journey — a bold evolution shaped by passion, precision, and a vision to create a new era of luxury. Rooted in heritage yet designed for today's discerning gentleman, Dynasty reimagines tradition with a modern, regal spirit.
      </Text>
      <Text className="text-gray-700 leading-relaxed mt-3 text-sm md:text-base">
        Every piece we create — from our meticulously crafted neckties to our curated accessories — carries forward a story of dedication, detail, and distinction.  
        <br />
        This is more than fashion. This is a legacy, reborn.
        <br />
        <strong>Welcome to Dynasty.</strong>
      </Text>
      <div className="mt-6">
        <Button 
          onClick={() => setExpanded(false)} 
          variant="outline" 
          color="dark" 
          radius="xs"
          className="border-gray-400 hover:bg-gray-100 transition-colors duration-300"
        >
          Show Less
        </Button>
      </div>
    </>
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <Text className="text-3xl font-serif mb-2">Our Story</Text>
          <Text className="text-base text-gray-600 max-w-2xl mx-auto">
            Born from legacy. Built for the future.
          </Text>
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
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
              className="w-full max-w-xs mx-auto h-auto object-contain rounded-sm"
            />
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mt-4 text-center md:text-left">
              {expanded ? fullStory : conciseStory}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory; 