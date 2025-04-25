import { Container, Title, Text, Paper, Button, Card, Grid, Accordion, Group, Box, Divider, List } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconPhone, IconMail, IconMapPin, IconHeadset, IconSearch } from '@tabler/icons-react';

const Help = () => {
  return (
    <motion.main
      className="bg-[#f8f8f8] py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Title order={1} className="text-4xl font-serif tracking-wide mb-6">
            HELP CENTER
          </Title>
          <Text className="text-gray-600 max-w-2xl mx-auto text-center text-lg">
            Resources and support for your inquiries
          </Text>
          
          <div className="relative max-w-2xl mx-auto mt-10">
            <input
              type="text"
              placeholder="What can we help you with?"
              className="w-full py-4 px-12 border-0 outline-none shadow-lg text-lg rounded-full"
            />
            <IconSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Button className="bg-black hover:bg-gray-800 text-white absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6 py-2">
              Search
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16 bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="bg-black text-white py-8 px-10 flex items-center">
            <IconHeadset size={36} className="mr-6" />
            <div>
              <Title order={2} className="font-serif">WAYS TO CONTACT US</Title>
              <Text size="sm" className="text-gray-300">Our team is here to help you</Text>
            </div>
          </div>
          
          <div className="p-10">
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card className="h-full border-0 bg-gray-50 p-6">
                  <div className="rounded-full bg-black text-white w-14 h-14 flex items-center justify-center mb-4">
                    <IconPhone size={24} />
                  </div>
                  <Title order={3} className="text-xl mb-2">Phone Support</Title>
                  <Text className="text-lg font-medium">+919820238241</Text>
                  <Text size="sm" className="text-gray-500 mb-4">Mon-Sat: 10am - 7pm</Text>
                  <Text size="sm">
                    Speak directly with our customer service team for immediate assistance with orders, returns, or product inquiries.
                  </Text>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card className="h-full border-0 bg-gray-50 p-6">
                  <div className="rounded-full bg-black text-white w-14 h-14 flex items-center justify-center mb-4">
                    <IconMail size={24} />
                  </div>
                  <Title order={3} className="text-xl mb-2">Email Support</Title>
                  <Text className="text-lg font-medium">support@dynasty.com</Text>
                  <Text size="sm" className="text-gray-500 mb-4">24/7 Support</Text>
                  <Text size="sm">
                    Email us anytime for non-urgent inquiries. Our team typically responds within 24 hours to all customer emails.
                  </Text>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card className="h-full border-0 bg-gray-50 p-6">
                  <div className="rounded-full bg-black text-white w-14 h-14 flex items-center justify-center mb-4">
                    <IconMapPin size={24} />
                  </div>
                  <Title order={3} className="text-xl mb-2">Visit Us</Title>
                  <Text className="text-lg font-medium"></Text>
                  <Text size="sm" className="text-gray-500 mb-4">Mumbai, Maharashtra, India</Text>
                  <Text size="sm">
                    Visit our flagship store for in-person assistance, product browsing, and personalized styling advice.
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>
          </div>
        </motion.div>
        
        
      </Container>
    </motion.main>
  );
};

export default Help;