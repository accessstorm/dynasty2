import { Container, Title, Text, Paper, Button, Group, Box, Grid, List, ThemeIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconCircleCheck } from '@tabler/icons-react';
import { luxuryClasses } from '../components/LuxuryTheme';

const BulkOrders = () => {
  return (
    <motion.main 
      className="bg-[#fcfcfc] py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container size="xl">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <Box mb={5} className="inline-block pb-2 border-b-2 border-[#D4AF37]">
              <Title order={1} className="text-3xl font-serif tracking-wide">BULK ORDERS</Title>
            </Box>
            <Text className="text-gray-600 mt-4 max-w-2xl mx-auto text-center">
              Corporate gifting solutions and customized collections for business clients and special events
            </Text>
          </motion.div>
        </div>
        
        <Grid gutter={40}>
          <Grid.Col span={{ base: 12 }}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="h-full"
            >
              <Paper
                p="xl"
                radius={0}
                className="h-full border-0 shadow-md bg-white relative overflow-hidden"
              >
                <Title order={2} className="text-2xl mb-6 font-serif text-center">CORPORATE GIFTING SOLUTIONS</Title>
                <Text className="text-gray-600 mb-8 leading-relaxed text-center max-w-3xl mx-auto">
                  Elevate your corporate gifting with our premium accessories. We offer custom branding, 
                  personalized packaging, and volume discounts for businesses looking to make a lasting impression.
                </Text>
                
                <Text fw={500} mb={15} size="lg" className="text-center">Our bulk order services include:</Text>
                
                <List
                  spacing="md"
                  size="lg"
                  center
                  icon={
                    <ThemeIcon color="rgba(212, 175, 55, 0.8)" size={24} radius="xl">
                      <IconCircleCheck size={16} />
                    </ThemeIcon>
                  }
                  className="mb-8 max-w-2xl mx-auto"
                >
                  <List.Item className="text-gray-600">Custom branding and monogramming</List.Item>
                  <List.Item className="text-gray-600">Personalized packaging options</List.Item>
                  <List.Item className="text-gray-600">Volume discounts for large orders</List.Item>
                  <List.Item className="text-gray-600">Corporate gift sets with logo imprinting</List.Item>
                  <List.Item className="text-gray-600">Event-specific collections</List.Item>
                  <List.Item className="text-gray-600">Express delivery for urgent requirements</List.Item>
                </List>
                
                <Text fw={500} size="lg" mb={15} className="text-center">Perfect for:</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 max-w-2xl mx-auto">
                  <Paper p="md" withBorder className="bg-gray-50 border-gray-200 hover:border-[#D4AF3740] transition-all text-center">
                    <Text fw={500}>Corporate Gifts</Text>
                    <Text size="sm" color="dimmed">Client appreciation and employee rewards</Text>
                  </Paper>
                  <Paper p="md" withBorder className="bg-gray-50 border-gray-200 hover:border-[#D4AF3740] transition-all text-center">
                    <Text fw={500}>Wedding Favors</Text>
                    <Text size="sm" color="dimmed">Coordinated accessories for wedding parties</Text>
                  </Paper>
                  <Paper p="md" withBorder className="bg-gray-50 border-gray-200 hover:border-[#D4AF3740] transition-all text-center">
                    <Text fw={500}>Conference Giveaways</Text>
                    <Text size="sm" color="dimmed">Premium branded merchandise</Text>
                  </Paper>
                  <Paper p="md" withBorder className="bg-gray-50 border-gray-200 hover:border-[#D4AF3740] transition-all text-center">
                    <Text fw={500}>Team Uniforms</Text>
                    <Text size="sm" color="dimmed">Matching accessories for professional teams</Text>
                  </Paper>
                </div>
              </Paper>
            </motion.div>
          </Grid.Col>
        </Grid>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <Paper
            p="xl" 
            radius={0}
            className="max-w-4xl mx-auto py-10 flex flex-col items-center text-center border-0 shadow-md bg-white"
          >
            <Title order={3} className="text-xl mb-5 font-serif text-center">NEED A SAMPLE BEFORE ORDERING?</Title>
            <Text className="mb-8 text-gray-600 max-w-xl mx-auto text-center">
              We offer sample kits for corporate clients to evaluate our product quality before placing a bulk order. Contact us to request yours today.
            </Text>
            <Button
              variant="filled"
              radius={0}
              size="md"
              className="bg-gradient-to-r from-[#1c1c1c] to-[#2a2a2a] text-white uppercase tracking-wider text-sm px-8 py-3 hover:from-[#2a2a2a] hover:to-[#3a3a3a] transition-all duration-300 font-medium"
              component={Link}
              to="/contact"
            >
              REQUEST SAMPLES
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </motion.main>
  );
};

export default BulkOrders; 