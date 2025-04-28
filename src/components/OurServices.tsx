import { Text, Button, Group, SimpleGrid } from '@mantine/core';
import { motion } from 'framer-motion';
import { useState } from 'react';

const OurServices = () => {
  const [expanded, setExpanded] = useState(false);

  const conciseServices = (
    <>
      <Text className="text-gray-700 leading-relaxed text-sm md:text-base text-center">
        At Dynasty, we blend craftsmanship, personalization, and style to deliver a regal experience through our range of specialized services.
      </Text>
      <div className="mt-6 text-center">
        <Button 
          onClick={() => setExpanded(true)} 
          variant="outline" 
          color="dark" 
          radius="xs"
          className="border-gray-400 hover:bg-gray-100 transition-colors duration-300"
        >
          Explore Our Services
        </Button>
      </div>
    </>
  );

  const fullServices = (
    <>
      <Text className="text-gray-700 leading-relaxed text-sm md:text-base mb-6 text-center">
        At Dynasty, we blend craftsmanship, personalization, and style to deliver a regal experience through our range of specialized services.
      </Text>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div>
          <Text className="font-medium text-base mb-1">1. Bespoke Necktie Design</Text>
          <Text className="text-gray-700 text-sm leading-relaxed">
            We craft custom-designed neckties that embody your personal style or corporate identity. From fabric selection to the final stitch, every detail is tailored with precision and care.
          </Text>
        </div>
        
        <div>
          <Text className="font-medium text-base mb-1">2. Corporate & Institutional Gifting Solutions</Text>
          <Text className="text-gray-700 text-sm leading-relaxed">
            Elevate your brand presence with Dynasty's premium gifting options — ideal for corporate events, employee rewards, client appreciation, and special occasions. Each gift can be customized to reflect your brand's unique essence.
          </Text>
        </div>
        
        <div>
          <Text className="font-medium text-base mb-1">3. Private Label Manufacturing</Text>
          <Text className="text-gray-700 text-sm leading-relaxed">
            Launch your own brand or exclusive collection with our full-service private-label manufacturing. From design consultation to production and packaging, we bring your vision to life seamlessly.
          </Text>
        </div>
        
        <div>
          <Text className="font-medium text-base mb-1">4. Wedding & Event Accessories</Text>
          <Text className="text-gray-700 text-sm leading-relaxed">
            Make every occasion unforgettable with our curated collection of wedding and event accessories. We offer special tie collections, coordinated sets, and bespoke designs for grooms, groomsmen, and distinguished guests.
          </Text>
        </div>
        
        <div>
          <Text className="font-medium text-base mb-1">5. Custom Branding & Embroidery</Text>
          <Text className="text-gray-700 text-sm leading-relaxed">
            Personalize your accessories with exquisite embroidery, logos, initials, or monograms — crafted to royal standards for a distinguished touch.
          </Text>
        </div>
        
        <div>
          <Text className="font-medium text-base mb-1">6. Export Services</Text>
          <Text className="text-gray-700 text-sm leading-relaxed">
            Expand your reach with Dynasty's export-ready products. We offer comprehensive support for international orders, packaging, and documentation, all while maintaining our hallmark quality standards.
          </Text>
        </div>
        
        <div className="md:col-span-2">
          <Text className="font-medium text-base mb-1">7. Style Consultation</Text>
          <Text className="text-gray-700 text-sm leading-relaxed">
            Achieve a polished, regal appearance with personalized styling advice from our experts. Whether through our AI chat assistant or direct consultation, we help you perfect your necktie, accessories, and formalwear styling.
          </Text>
        </div>
      </div>
      
      <div className="mt-8 text-center">
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
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <Text className="text-3xl font-serif mb-2">Our Services</Text>
          <Text className="text-base text-gray-600 max-w-2xl mx-auto">
            Craftsmanship, personalization, and unparalleled luxury
          </Text>
        </motion.div>
        
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div>
            {expanded ? fullServices : conciseServices}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices; 