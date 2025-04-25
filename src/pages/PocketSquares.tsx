import { Container, Title, Text, Paper, Button, Group, Box } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { luxuryClasses } from '../components/LuxuryTheme';

const PocketSquares = () => {
  return (
    <motion.main 
      className="py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container size="xl">
        <Box className="mb-16 text-center">
          <Title order={1} className={luxuryClasses.pageTitle}>POCKET SQUARES</Title>
          <Text className={luxuryClasses.pageSubtitle}>
            The perfect finishing touch for your suit or jacket
          </Text>
        </Box>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Paper 
            p="xl" 
            className="max-w-3xl mx-auto py-16 flex flex-col items-center border border-gray-200 hover:border-[#D4AF3730] transition-all"
          >
            <Title order={2} className="text-3xl mb-6 text-center font-serif font-medium">Coming Soon</Title>
            <Text className="text-center max-w-xl mb-10 text-lg font-light tracking-wide text-gray-700 leading-relaxed">
              Our collection of premium pocket squares is in the final stages of design and will be available soon.
              Crafted from the finest silk and cotton blends, each piece adds a touch of elegance to any ensemble.
            </Text>
            
            <Group>
              <Button 
                variant="filled" 
                color="dark"
                radius="xs"
                size="md"
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-900 uppercase tracking-wider text-xs px-6 py-3 hover:-translate-y-0.5 hover:shadow-md transition-all font-medium"
                component={Link}
                to="/"
              >
                JOIN NEWSLETTER
              </Button>
              <Button 
                variant="outline" 
                color="dark"
                radius="xs"
                size="md"
                className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-[#D4AF37] uppercase tracking-wider text-xs px-4 py-2 transition-colors"
                component={Link}
                to="/"
              >
                BACK TO HOME
              </Button>
            </Group>
          </Paper>
        </motion.div>
      </Container>
    </motion.main>
  );
};

export default PocketSquares; 