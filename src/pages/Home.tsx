import { motion } from 'framer-motion';
import FeaturedProducts from '../components/FeaturedProducts';
import Newsletter from '../components/Newsletter';
import NewsletterPopup from '../components/NewsletterPopup';
import OurStory from '../components/OurStory';
import BestSellers from '../components/BestSellers';
import HomeWhyChooseUs from '../components/HomeWhyChooseUs';

const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <FeaturedProducts />
      <BestSellers />
      <OurStory />
      <HomeWhyChooseUs />
      <Newsletter />
      <NewsletterPopup />
    </motion.main>
  );
};

export default Home; 