import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyAEy_tjkGuwRVvc2OxmkI_Memqx0Rz_VrE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatbotButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Hello! How can I help you with Dynasty products today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when chat opens
    if (isChatOpen && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [isChatOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    const newUserMessage = { role: 'user', content: userInput };
    const currentInput = userInput;
    
    // Add user message to chat
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setLoading(true);
    
    try {
      // Create context for Gemini with information about Dynasty products
      const dynastyContext = `
        You are a customer service chatbot for Dynasty, a luxury clothing brand specializing in neckties, bow ties, pocket squares, and formal wear.
        Dynasty offers premium products ranging from ₹3,499 for pocket squares to ₹16,999 for premium collections.
        Delivery takes 3-4 days for prepaid orders and 1-2 days extra for COD orders. Same-day delivery is available within Delhi NCR.
        Dynasty offers returns and exchanges within 7 days of delivery, except for sale items which are non-returnable.
        Dynasty products are crafted from premium materials like silk and microfiber and come in various colors and patterns.
        
        Here are some frequently asked questions you should use to help answer customer inquiries:
        
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
        A: Our standard neckties are approximately 58 inches long and 3.25 inches wide at the widest point. Slim ties are 2.75 inches wide, while our bow ties come in adjustable sizes to fit neck sizes from 14.5 to 18.5 inches.
        
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
      `;
      
      // Combine context with user input
      const prompt = `${dynastyContext}\n\nCustomer: ${currentInput}\n\nAssistant:`;
      
      // Generate response from Gemini
      const result = await model.generateContent(prompt);
      const response = result.response;
      const responseText = response.text();
      
      // Add assistant response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error('Error with Gemini API:', error);
      
      // Fallback response
      let responseText = "I'm sorry, I encountered an error. Please try again.";
      
      // Simple keyword-based fallback
      const input = currentInput.toLowerCase();
      
      if (input.includes('necktie') || input.includes('tie')) {
        responseText = "Our neckties are crafted from premium materials like silk and microfiber. They come in various colors and patterns. Would you like to see our necktie collection?";
      } else if (input.includes('bow tie')) {
        responseText = "Our bow ties are perfect for formal events and come in classic and modern designs. Would you like to see our bow tie collection?";
      } else if (input.includes('pocket square')) {
        responseText = "Our pocket squares add a touch of elegance to any suit. They're available in matching designs with our ties. Would you like to see our pocket square collection?";
      } else if (input.includes('price') || input.includes('cost')) {
        responseText = "Our products range from ₹3,499 for pocket squares to ₹16,999 for premium collections. Is there a specific product you're interested in?";
      } else if (input.includes('delivery') || input.includes('shipping')) {
        responseText = "We offer 3-4 day delivery for prepaid orders and 1-2 days extra for COD orders. Same-day delivery is available within Delhi NCR.";
      } else if (input.includes('return') || input.includes('exchange')) {
        responseText = "We offer returns and exchanges within 7 days of delivery, except for sale items which are non-returnable.";
      } else if (input.includes('track') || input.includes('tracking')) {
        responseText = "Once your order is dispatched, you will receive a tracking link on your registered email and/or mobile number. You can monitor the delivery status using the tracking number provided.";
      } else if (input.includes('cancel')) {
        responseText = "Orders once placed cannot be cancelled, especially Cash on Delivery (COD) orders. Kindly review your order carefully before confirming payment.";
      } else if (input.includes('international') || input.includes('abroad')) {
        responseText = "Currently, Dynasty ships orders only within India. Stay tuned — we will be announcing international shipping options soon.";
      } else if (input.includes('material')) {
        responseText = "We use premium quality materials for all our products. Our ties and pocket squares are primarily made from silk, cotton, linen, and wool blends. Specific material information is listed on each product page.";
      } else if (input.includes('care') || input.includes('wash') || input.includes('clean')) {
        responseText = "For silk ties and pocket squares, we recommend dry cleaning only. Cotton and linen products should be hand washed in cold water and air-dried. Please refer to the care label on your specific product for detailed instructions.";
      } else if (input.includes('size')) {
        responseText = "Our standard neckties are approximately 58 inches long and 3.25 inches wide at the widest point. Slim ties are 2.75 inches wide, while our bow ties come in adjustable sizes to fit neck sizes from 14.5 to 18.5 inches.";
      } else if (input.includes('damaged') || input.includes('defective')) {
        responseText = "If you receive a damaged or defective product, please notify us within 3 days of delivery by writing to support@dynastyworld.in. Attach clear photos showing the issue, and our team will assist you with an exchange.";
      } else if (input.includes('payment') || input.includes('pay')) {
        responseText = "We accept the following payment methods: Credit Cards, Debit Cards, Net Banking, UPI, and Cash on Delivery (COD).";
      } else if (input.includes('secure') || input.includes('security')) {
        responseText = "Yes, all payment information is processed through secure and encrypted channels. We use Razorpay, a trusted payment gateway that ensures your financial information is protected.";
      } else if (input.includes('cod') || input.includes('cash on delivery')) {
        responseText = "Yes, Cash on Delivery (COD) is available for domestic orders within India. Please note that orders paid via COD may take 1-2 days longer to process.";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <div className="fixed bottom-8 sm:right-6 left-6 sm:left-auto z-50">
      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            className="bg-white rounded-lg shadow-lg border border-gray-200 w-80 sm:w-96 absolute bottom-20 sm:right-0 left-0 sm:left-auto overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Chat Header */}
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <h3 className="font-medium">Dynasty Chat Assistant</h3>
              <button 
                onClick={toggleChat}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto max-h-96">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-3 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div 
                    className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user' 
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-black'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-left mb-3">
                  <div className="inline-block max-w-[80%] rounded-lg px-4 py-2 bg-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
            
            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex">
              <input
                ref={chatInputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about our products..."
                className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:border-black"
                disabled={loading}
              />
              <button
                type="submit"
                className={`bg-black text-white rounded-r-lg px-3 flex items-center justify-center ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                }`}
                disabled={loading}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chat Button */}
      <motion.button
        onClick={toggleChat}
        className="bg-black text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
};

export default ChatbotButton; 