import { Container, Title, Text, Paper, Button, Grid, TextInput, Textarea, Box } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { luxuryClasses } from '../components/LuxuryTheme';

const BulkOrders = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    requirements: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("Sending...");
    
    try {
      // Create FormData object
      const webFormData = new FormData();
      
      // Append form values
      webFormData.append("name", formData.name);
      webFormData.append("organization", formData.organization);
      webFormData.append("phone", formData.phone);
      webFormData.append("email", formData.email);
      webFormData.append("requirements", formData.requirements);
      
      // Important: Add subject so the email is properly titled
      webFormData.append("subject", "New Bulk Order Inquiry from Dynasty Website");
      
      // Add the Web3Forms access key
      webFormData.append("access_key", "326ec34d-562a-41a3-90b9-b0c9b8aa6aea");

      // Submit to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: webFormData
      });

      const data = await response.json();

      if (data.success) {
        // Form submitted successfully
        setFormStatus("Thank you for your inquiry. We will contact you shortly.");
        // Reset form
        setFormData({
          name: '',
          organization: '',
          phone: '',
          email: '',
          requirements: ''
        });
      } else {
        // Error occurred
        console.log("Error", data);
        setFormStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("An error occurred. Please try again later.");
    }
  };
  
  return (
    <motion.main 
      className="bg-[#fcfcfc] py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container size="xl" className="px-8 md:px-16">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <Title order={1} className={luxuryClasses.pageTitle}>BULK ORDERS</Title>
            <Text className={luxuryClasses.pageSubtitle}>
              Corporate gifting solutions and customized collections for business clients and special events
            </Text>
          </motion.div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
          <div className="flex-1 max-w-xl mx-auto w-full">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="h-full"
            >
              <Paper
                p={{ base: 'xl', md: 40 }}
                radius={0}
                className="h-full border-0 shadow-md bg-white relative overflow-hidden"
              >
                <Title order={2} className="text-2xl mb-8 font-serif text-center">CORPORATE GIFTING SOLUTIONS</Title>
                <Text className="text-gray-600 mb-12 leading-relaxed text-center">
                  Elevate your corporate gifting with our premium accessories. We offer custom branding, 
                  personalized packaging, and volume discounts for businesses looking to make a lasting impression.
                </Text>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border-l-4 border-[#D4AF37] pl-4 py-1">
                    <Text fw={600} className="text-lg mb-1">Custom Branding</Text>
                    <Text size="md" className="text-gray-600">Logo imprinting and monogramming options</Text>
                  </div>
                  
                  <div className="border-l-4 border-[#D4AF37] pl-4 py-1">
                    <Text fw={600} className="text-lg mb-1">Luxury Packaging</Text>
                    <Text size="md" className="text-gray-600">Personalized presentation boxes</Text>
                  </div>
                  
                  <div className="border-l-4 border-[#D4AF37] pl-4 py-1">
                    <Text fw={600} className="text-lg mb-1">Volume Discounts</Text>
                    <Text size="md" className="text-gray-600">Attractive pricing for large orders</Text>
                  </div>
                  
                  <div className="border-l-4 border-[#D4AF37] pl-4 py-1">
                    <Text fw={600} className="text-lg mb-1">Worldwide Shipping</Text>
                    <Text size="md" className="text-gray-600">Express delivery available</Text>
                  </div>
                </div>
              </Paper>
            </motion.div>
          </div>
          
          <div className="flex-1 max-w-xl mx-auto w-full">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="h-full"
            >
              <Paper
                p={{ base: 'xl', md: 40 }}
                radius={0}
                className="h-full border-0 shadow-md bg-white"
              >
                <Title order={2} className="text-2xl mb-12 font-serif text-center pt-6">REQUEST A QUOTE</Title>
                <Text className="text-gray-600 mb-12 text-center">
                  Fill out the form below and our team will get back<br /> to you within 24 hours
                </Text>
                
                <form onSubmit={handleSubmit} className="px-3">
                  <div className="space-y-8">
                    <TextInput
                      label="Name *"
                      name="name"
                      placeholder="Your Name"
                      required
                      size="md"
                      classNames={{
                        root: 'mb-6',
                        input: 'border border-gray-300 focus:border-[#D4AF37] py-3 px-4 rounded-sm',
                        label: 'font-medium text-gray-700 mb-2'
                      }}
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <br />
                    <TextInput
                      label="Organization Name *"
                      name="organization"
                      placeholder="Company or Organization"
                      required
                      size="md"
                      classNames={{
                        root: 'mb-6',
                        input: 'border border-gray-300 focus:border-[#D4AF37] py-3 px-4 rounded-sm',
                        label: 'font-medium text-gray-700 mb-2'
                      }}
                      value={formData.organization}
                      onChange={handleChange}
                    />
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <TextInput
                        label="Phone *"
                        name="phone"
                        placeholder="Contact Number"
                        required
                        size="md"
                        classNames={{
                          root: 'mb-6',
                          input: 'border border-gray-300 focus:border-[#D4AF37] py-3 px-4 rounded-sm',
                          label: 'font-medium text-gray-700 mb-2'
                        }}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      
                      <TextInput
                        label="Email *"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        required
                        size="md"
                        classNames={{
                          root: 'mb-6',
                          input: 'border border-gray-300 focus:border-[#D4AF37] py-3 px-4 rounded-sm',
                          label: 'font-medium text-gray-700 mb-2'
                        }}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <br />
                    <Textarea
                      label="Brief us about your requirement *"
                      name="requirements"
                      placeholder="Please describe your bulk order requirements, quantity, and any customization needs"
                      minRows={5}
                      required
                      size="md"
                      classNames={{
                        root: 'mb-6',
                        input: 'border border-gray-300 focus:border-[#D4AF37] py-3 px-4 rounded-sm',
                        label: 'font-medium text-gray-700 mb-2'
                      }}
                      value={formData.requirements}
                      onChange={handleChange}
                    />
                    <br />
                    <div className="pt-8 pb-6">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#D4B44A] to-[#D4AF37] text-white uppercase text-sm font-medium tracking-wider py-5 px-6 border-0 cursor-pointer rounded-md hover:shadow-lg transition-all duration-300"
                      >
                        SUBMIT INQUIRY
                      </button>
                      
                      {/* Form submission status */}
                      {formStatus && (
                        <div className={`mt-4 p-3 text-center rounded-sm ${
                          formStatus.includes("Thank you") 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {formStatus}
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </Paper>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.main>
  );
};

export default BulkOrders; 