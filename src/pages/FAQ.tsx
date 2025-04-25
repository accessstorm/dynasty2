import { Container, Title, Text, Grid, Box, Tabs, Badge, Group, ThemeIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconQuestionMark, IconSearch, IconPlus, IconMinus } from '@tabler/icons-react';
import { useState } from 'react';

// Define types for our data structures
interface FAQItem {
  question: string;
  answer: string;
}

type FAQCategory = 'orders' | 'products' | 'returns' | 'payment';

type FAQData = {
  [key in FAQCategory]: FAQItem[];
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | FAQCategory>('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  // FAQ categories with text labels only - no icons/emojis
  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'orders', label: 'Orders & Shipping' },
    { id: 'products', label: 'Products' },
    { id: 'returns', label: 'Returns & Exchanges' },
    { id: 'payment', label: 'Payment' }
  ];
  
  // FAQ data organized by category
  const faqData: FAQData = {
    orders: [
      {
        question: 'How long does it take to process my order?',
        answer: 'We typically process orders within 24 hours of receiving them. During peak seasons or promotional periods, processing may take up to 48 hours.'
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you will receive a tracking number via email. You can use this number to track your package on our website or through the courier\'s website.'
      },
      {
        question: 'What are your shipping times?',
        answer: 'Domestic orders typically arrive within 3-4 business days for prepaid orders and 4-5 business days for COD orders. International shipping takes approximately 7-14 business days depending on the destination country.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. Please note that customers are responsible for any customs fees or import duties that may apply.'
      }
    ],
    products: [
      {
        question: 'What materials are used in your products?',
        answer: 'We use premium quality materials for all our products. Our ties and pocket squares are primarily made from silk, cotton, linen, and wool blends. Specific material information is listed on each product page.'
      },
      {
        question: 'How should I care for my Dynasty products?',
        answer: 'For silk ties and pocket squares, we recommend dry cleaning only. Cotton and linen products should be hand washed in cold water and air-dried. Please refer to the care label on your specific product for detailed instructions.'
      },
      {
        question: 'What are the sizes of your ties?',
        answer: 'Our standard neckties are approximately 58 inches long and 3.25 inches wide at the widest point. Slim ties are 2.75 inches wide, while our bow ties come in adjustable sizes to fit neck sizes from 14.5 to 18.5 inches.'
      },
      {
        question: 'Do you offer custom or personalized products?',
        answer: 'Yes, we offer customization and personalization services for bulk orders and corporate gifting. This includes custom patterns, colors, and monogramming. Please contact our customer service team for more information.'
      }
    ],
    returns: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 7-day return policy for all regular-priced items. Products must be in their original condition with tags attached. Sale items are non-returnable and non-exchangeable.'
      },
      {
        question: 'How do I exchange an item?',
        answer: 'To exchange an item, please contact our customer service team within 7 days of receiving your order. We\'ll guide you through the exchange process. Please note that you\'ll need to return the original item first.'
      },
      {
        question: 'How long does it take to process a refund?',
        answer: 'Once we receive your returned item, refunds are typically processed within 3-5 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution.'
      }
    ],
    payment: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), UPI payments, net banking, and Cash on Delivery (COD) for domestic orders.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, all payment information is processed through secure and encrypted channels. We use Razorpay, a trusted payment gateway that ensures your financial information is protected.'
      },
      {
        question: 'Is Cash on Delivery available?',
        answer: 'Yes, Cash on Delivery (COD) is available for domestic orders within India. Please note that orders paid via COD may take 1-2 days longer to process.'
      }
    ]
  };
  
  // Function to get current category FAQs or all FAQs
  const getFAQs = () => {
    if (activeCategory === 'all') {
      return Object.entries(faqData) as [FAQCategory, FAQItem[]][];
    } else {
      return [[activeCategory, faqData[activeCategory]]] as [FAQCategory, FAQItem[]][];
    }
  };
  
  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-black text-white py-16 px-4">
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Title order={1} className="text-4xl font-serif mb-6">FREQUENTLY ASKED QUESTIONS</Title>
            <Text size="lg" className="text-gray-300 mb-10">
              Find answers to commonly asked questions about our products, ordering process, and more
            </Text>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full py-4 px-12 rounded-full border-0 shadow-lg text-lg text-black"
              />
              <IconSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </motion.div>
        </Container>
      </div>
      
      {/* FAQ Categories */}
      <Container size="xl" className="py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as 'all' | FAQCategory)}
                className={`
                  px-6 py-3 rounded-none transition-all text-base font-medium
                  ${activeCategory === category.id 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* FAQ Content */}
          <div className="space-y-10">
            {getFAQs().map(([category, questions], categoryIndex) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-10"
              >
                {activeCategory === 'all' && (
                  <div className="mb-6">
                    <Title order={2} className="text-2xl font-bold border-b border-gray-200 pb-2">
                      {categories.find(c => c.id === category)?.label}
                    </Title>
                  </div>
                )}
                
                <div className="space-y-4">
                  {questions.map((faq: FAQItem, index: number) => {
                    const faqId = `${category}-${index}`;
                    const isExpanded = expandedItems.includes(faqId);
                    
                    return (
                      <div 
                        key={faqId}
                        className="border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(faqId)}
                          className="flex justify-between items-center w-full text-left py-4 px-6 bg-white hover:bg-gray-50 focus:outline-none"
                        >
                          <span className="font-medium text-lg pr-8">{faq.question}</span>
                          <span className="text-xl font-light">
                            {isExpanded ? '−' : '+'}
                          </span>
                        </button>
                        
                        <div 
                          className={`
                            transition-all duration-300
                            ${isExpanded ? 'block' : 'hidden'}
                          `}
                        >
                          <Text className="px-6 py-4 bg-gray-50 text-gray-600 leading-relaxed">
                            {faq.answer}
                          </Text>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
      
      {/* Still Need Help */}
      <div className="bg-gray-100 py-16">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Title order={2} className="text-3xl mb-4">Still need help?</Title>
            <Text className="text-gray-600 mb-8 max-w-xl mx-auto">
              If you couldn't find what you're looking for, our customer service team is ready to assist you.
            </Text>
            <Link 
              to="/contact"
              className="inline-block bg-black text-white py-3 px-8 font-medium hover:bg-gray-800 transition-colors"
            >
              Contact Support
            </Link>
            <div className="flex justify-center mt-6 gap-4 text-gray-500">
              <Link to="/help" className="hover:text-black transition-colors">
                Help Center
              </Link>
              <span>•</span>
              <Link to="/shipping" className="hover:text-black transition-colors">
                Shipping Policy
              </Link>
              <span>•</span>
              <Link to="/returns" className="hover:text-black transition-colors">
                Returns Policy
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    </div>
  );
};

export default FAQ; 