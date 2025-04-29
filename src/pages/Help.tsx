import { Container, Title, Text, Paper, Button, Card, Grid, Accordion, Group, Box, Divider, List } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconPhone, IconMail, IconMapPin, IconHeadset, IconSearch, IconMessageCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ChatbotButton from '../components/ChatbotButton';
import { luxuryClasses } from '../components/LuxuryTheme';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyAEy_tjkGuwRVvc2OxmkI_Memqx0Rz_VrE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const Help = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsSearching(true);
    setShowResult(true);
    
    try {
      // Create context for Gemini with information about Dynasty products
      const dynastyContext = `
        You are a help center search assistant for Dynasty, a luxury clothing brand specializing in neckties, bow ties, pocket squares, and formal wear.
        You should provide helpful, concise responses to customer questions based on the following FAQ information.
        Always keep responses brief and to the point, focusing only on answering the specific question asked.
        
        ORDERS & SHIPPING FAQs:
        Q: How long will it take to receive my order?
        A: We aim to dispatch all orders within 1–2 working days. Delivery timelines typically range between 3–5 business days, depending on your location. In rare cases, shipping may take up to 7 business days due to unforeseen delays.
        
        Q: How can I track my order?
        A: Once your order is dispatched, you will receive a tracking link on your registered email and/or mobile number. You can monitor the delivery status using the tracking number provided.
        
        Q: Can I cancel my order after placing it?
        A: No. Orders once placed cannot be cancelled, especially Cash on Delivery (COD) orders. Kindly review your order carefully before confirming payment.
        
        Q: Do you ship internationally?
        A: Currently, Dynasty ships orders only within India. Stay tuned — we will be announcing international shipping options soon.
        
        PRODUCTS FAQs:
        Q: Why does the product look slightly different from the pictures online?
        A: At Dynasty, we make every effort to accurately showcase the colors, textures, and details of our products through high-quality photography. However, slight variations may occur due to lighting conditions, screen settings, and the natural characteristics of fabrics. Such minor differences do not qualify as defects.
        
        Q: What materials are used in your products?
        A: We use premium quality materials for all our products. Our ties and pocket squares are primarily made from silk, cotton, linen, and wool blends. Specific material information is listed on each product page.
        
        Q: How should I care for my Dynasty products?
        A: For silk ties and pocket squares, we recommend dry cleaning only. Cotton and linen products should be hand washed in cold water and air-dried. Please refer to the care label on your specific product for detailed instructions.
        
        Q: What are the sizes of your ties?
        A: Our standard neckties are approximately 58 inches long and 3 inches wide at the widest point. Slim ties are 2.5 inches wide, while our bow ties come in adjustable sizes to fit neck sizes from 14.5 to 18.5 inches.
        
        RETURNS & EXCHANGES FAQs:
        Q: Do you accept returns?
        A: We do not accept returns. However, we offer exchanges in the following cases: If the product received is defective or damaged, or if the wrong product has been delivered. To request an exchange, please email us at support@dynastyworld.in within 3 days of delivery, along with photos and your Order ID. Shipping costs for exchanges must be borne by the customer.
        
        Q: What if the product I received is damaged?
        A: If you receive a damaged or defective product, please notify us within 3 days of delivery by writing to support@dynastyworld.in. Attach clear photos showing the issue, and our team will assist you with an exchange. Please note that Dynasty reserves the right to verify the claim before approving any exchange.
        
        PAYMENT FAQs:
        Q: What payment methods do you accept?
        A: We accept the following payment methods: Credit Cards, Debit Cards, Net Banking, UPI, and Cash on Delivery (COD).
        
        Q: Is my payment information secure?
        A: Yes, all payment information is processed through secure and encrypted channels. We use Razorpay, a trusted payment gateway that ensures your financial information is protected.
        
        Q: Is Cash on Delivery available?
        A: Yes, Cash on Delivery (COD) is available for domestic orders within India. Please note that orders paid via COD may take 1-2 days longer to process.
        
        CONTACT INFORMATION:
        Phone Support: +919820238241 (Mon-Sat: 10am - 7pm)
        Email Support: dynastyneckties@gmail.com (24/7 Support)
        Location: Mumbai, Maharashtra, India
      `;
      
      // Combine context with user input
      const prompt = `${dynastyContext}\n\nCustomer: ${query}\n\nPlease provide a helpful, concise answer based on the information above:`;
      
      // Generate response from Gemini
      const result = await model.generateContent(prompt);
      const response = result.response;
      const responseText = response.text();
      
      // Set the search result
      setSearchResult(responseText);
    } catch (error) {
      console.error('Error with Gemini API:', error);
      
      // Fallback response
      let responseText = "I'm sorry, I couldn't find an answer to your question. Please try rephrasing or contact our customer support.";
      
      // Simple keyword-based fallback
      const input = query.toLowerCase();
      
      if (input.includes('necktie') || input.includes('tie')) {
        responseText = "Our neckties are crafted from premium materials like silk and microfiber. They come in various colors and patterns.";
      } else if (input.includes('bow tie')) {
        responseText = "Our bow ties are perfect for formal events and come in classic and modern designs.";
      } else if (input.includes('pocket square')) {
        responseText = "Our pocket squares add a touch of elegance to any suit. They're available in matching designs with our ties.";
      } else if (input.includes('price') || input.includes('cost')) {
        responseText = "Our products range from ₹3,499 for pocket squares to ₹16,999 for premium collections.";
      } else if (input.includes('delivery') || input.includes('shipping')) {
        responseText = "We offer 3-4 day delivery for prepaid orders and 1-2 days extra for COD orders. Same-day delivery is available within Delhi NCR.";
      } else if (input.includes('return') || input.includes('exchange')) {
        responseText = "We offer exchanges for defective or damaged products within 3 days of delivery.";
      } else if (input.includes('track') || input.includes('tracking')) {
        responseText = "Once your order is dispatched, you will receive a tracking link on your registered email and/or mobile number.";
      } else if (input.includes('cancel')) {
        responseText = "Orders once placed cannot be cancelled, especially Cash on Delivery (COD) orders.";
      } else if (input.includes('international') || input.includes('abroad')) {
        responseText = "Currently, Dynasty ships orders only within India.";
      }
      
      setSearchResult(responseText);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowResult(false);
  };

  return (
    <motion.main
      className="bg-[#fcfcfc] py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container size="xl" className="px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <Title order={1} className={luxuryClasses.pageTitle}>
            HELP CENTER
          </Title>
          <Text className="text-lg font-light tracking-wide text-gray-700 max-w-2xl mx-auto text-center mb-8 leading-relaxed">
            Resources and support for your inquiries
          </Text>
          
          <div className="mt-10 relative max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What can we help you with?"
                  className="w-full py-4 px-12 border-0 outline-none shadow-lg text-lg rounded-full"
                />
                <IconMessageCircle className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <IconSearch size={18} />
                  </button>
                )}
                <button 
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6 py-2"
                  disabled={isSearching}
                >
                  {isSearching ? 'Searching...' : 'Ask'}
                </button>
              </div>
            </form>

            {/* Search Results */}
            {showResult && (
              <div className="mt-6 bg-white rounded-lg shadow-xl p-4 text-left">
                <p className="text-lg font-medium mb-2">Response:</p>
                {isSearching ? (
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                  </div>
                ) : (
                  <p className="text-gray-700">{searchResult}</p>
                )}
              </div>
            )}
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
                  <Text className="text-lg font-medium">dynastyneckties@gmail.com</Text>
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
        
        {/* Keep the ChatbotButton component */}
        <ChatbotButton />
      </Container>
    </motion.main>
  );
};

export default Help;