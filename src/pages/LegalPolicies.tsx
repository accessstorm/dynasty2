import { Container, Title, Text, Paper, Divider } from '@mantine/core';
import { motion } from 'framer-motion';
import { luxuryClasses } from '../components/LuxuryTheme';

const LegalPolicies = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <div className="py-24">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Title order={1} className={luxuryClasses.pageTitle}>LEGAL POLICIES</Title>
            <Text className={luxuryClasses.pageSubtitle}>
              Our terms, conditions, and policies that govern the use of our services
            </Text>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper shadow="xs" p="xl" withBorder className="mb-8 text-left max-w-4xl mx-auto">
              {/* Terms and Conditions */}
              <div className="mb-10">
                <Title order={3} className="text-2xl font-serif mb-4 text-center">1. Terms and Conditions</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  Welcome to Dynasty. These Terms and Conditions ("Terms") govern your access to and use of our website and the purchase of products offered herein. By accessing the website, browsing, or making a purchase, you agree to be legally bound by these Terms. If you do not agree to these Terms, you must refrain from using our services.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  All products listed on Dynasty are subject to availability and may be withdrawn at our sole discretion without notice. Dynasty reserves the right to refuse service to any individual or entity at any time, without the obligation to provide a reason. Pricing and availability are subject to change without prior notification. While we strive to ensure accuracy in product descriptions and images, slight variations may occur, and we shall not be held liable for discrepancies.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  The unauthorized reproduction, distribution, modification, display, or transmission of any content on this website is strictly prohibited. For any concerns or clarifications, you may contact us at support@dynastyworld.in.
                </Text>
              </div>
              
              <Divider my="lg" />
              
              {/* Return and Exchange Policy */}
              <div className="mb-10">
                <Title order={3} className="text-2xl font-serif mb-4 text-center">2. Return and Exchange Policy</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  At Dynasty, customer satisfaction is of paramount importance. However, due to the nature of our merchandise and our commitment to maintaining product hygiene and quality, we do not offer returns or refunds. Only exchanges are permitted, subject to the following terms.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  An exchange request must be initiated within forty-eight (48) hours of delivery. Customers are required to email support@dynastyworld.in, providing a detailed description and photographic evidence of the defect or damage. Exchanges shall be entertained solely in cases where the product is received in a defective or damaged condition, and not for reasons of personal preference.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  Products must be unused, unworn, and returned in their original packaging. Dynasty reserves the right to deny an exchange if, upon inspection, the returned product is found to have been used, tampered with, or damaged post-delivery.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  The cost of shipping the product for exchange shall be borne solely by the customer. Dynasty shall not be responsible for any loss or damage incurred during the return shipping process. Exchanges shall be processed only after the returned product passes our quality checks.
                </Text>
              </div>
              
              <Divider my="lg" />
              
              {/* Shipping Policy */}
              <div className="mb-10">
                <Title order={3} className="text-2xl font-serif mb-4 text-center">3. Shipping Policy</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  Dynasty endeavors to dispatch all confirmed orders within one (1) to two (2) business days, subject to operational exigencies. Upon dispatch, standard delivery timelines range between three (3) to seven (7) business days, depending on the delivery location and logistical factors.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  While we strive to ensure timely delivery, delays may occur due to unforeseen circumstances including but not limited to courier delays, natural disasters, or governmental restrictions. Dynasty shall not be held liable for any such delays beyond its reasonable control.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  Customers will receive shipping confirmation and tracking details via email upon dispatch. All deliveries shall be made through reputed third-party logistics providers, including but not limited to Delhivery.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  At present, Dynasty offers shipping exclusively within the territory of India.
                </Text>
              </div>
              
              <Divider my="lg" />
              
              {/* Cancellation Policy */}
              <div className="mb-10">
                <Title order={3} className="text-2xl font-serif mb-4 text-center">4. Cancellation Policy</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  Once an order is placed on the Dynasty website, it shall be deemed final and cannot be cancelled under any circumstances. This policy is applicable to all modes of payment, including prepaid and Cash on Delivery ("COD") orders.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  Given the high incidence of fraudulent activities associated with COD orders, customers are urged to ensure their full commitment before placing an order. Dynasty reserves the right to blacklist or refuse service to customers exhibiting a pattern of COD order refusals or cancellations.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  By placing an order, you acknowledge and accept the irrevocable nature of the transaction.
                </Text>
              </div>
              
              <Divider my="lg" />
              
              {/* Product Display and Accuracy Policy */}
              <div className="mb-10">
                <Title order={3} className="text-2xl font-serif mb-4 text-center">5. Product Display and Accuracy Policy</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  Dynasty is committed to providing the most accurate visual representation and description of its products. All product images are captured using high-quality professional equipment under carefully controlled lighting conditions to reflect the true attributes of the merchandise.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  However, minor variations in color, texture, and appearance may occur due to factors beyond our control, including but not limited to the lighting environment during photography, device screen settings, and individual perception. Such variations shall not constitute a defect or grounds for return or exchange.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  By purchasing from Dynasty, you acknowledge and accept the possibility of slight discrepancies between product images and actual products.
                </Text>
              </div>
              
              <Divider my="lg" />
              
              {/* Privacy Policy */}
              <div className="mb-4">
                <Title order={3} className="text-2xl font-serif mb-4 text-center">6. Privacy Policy</Title>
                
                <Title order={4} className="text-xl font-serif mb-3 text-center">Introduction</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  Dynasty ("we," "us," "our") is committed to safeguarding the privacy of all individuals who access our website or provide their personal information through any interaction with us. This Privacy Policy outlines how we collect, use, protect, and disclose your information.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  By using this website, you consent to the practices described in this Privacy Policy.
                </Text>
                
                <Title order={4} className="text-xl font-serif mb-3 text-center">Information We Collect</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  We may collect and store the following information when you place an order, register on our website, or contact us for any service:
                </Text>
                <ul className="list-disc pl-6 mb-4 space-y-1 max-w-xl mx-auto">
                  <li>Full Name</li>
                  <li>Billing and Shipping Address</li>
                  <li>Email Address</li>
                  <li>Mobile Number</li>
                  <li>Payment Details (processed through secure third-party gateways)</li>
                  <li>Any other information voluntarily provided by you</li>
                </ul>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  We do not collect or store sensitive payment information such as card numbers or CVV codes directly; all online payments are securely processed through authorized payment providers.
                </Text>
                
                <Title order={4} className="text-xl font-serif mb-3 text-center">Use of Information</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  The information collected may be used for the following purposes:
                </Text>
                <ul className="list-disc pl-6 mb-4 space-y-1 max-w-xl mx-auto">
                  <li>To process and fulfill your orders</li>
                  <li>To communicate with you regarding your purchases, queries, or service requests</li>
                  <li>To send you transactional updates, shipping details, or service-related notifications</li>
                  <li>To improve our products, services, and customer experience</li>
                  <li>To comply with legal obligations</li>
                </ul>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  We do not sell, rent, or trade your personal information to any third parties for marketing or other commercial purposes.
                </Text>
                
                <Title order={4} className="text-xl font-serif mb-3 text-center">Data Protection</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  Dynasty adopts reasonable and appropriate security measures to protect the confidentiality and integrity of your personal information against unauthorized access, disclosure, or destruction. However, no method of transmission over the internet or method of electronic storage is entirely secure, and therefore we cannot guarantee absolute security.
                </Text>
                
                <Title order={4} className="text-xl font-serif mb-3 text-center">Sharing of Information</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  We may disclose your information in the following circumstances:
                </Text>
                <ul className="list-disc pl-6 mb-4 space-y-1 max-w-xl mx-auto">
                  <li>To trusted third-party service providers, such as logistics partners and payment processors, solely for the purpose of fulfilling your orders and processing transactions.</li>
                  <li>When required by law or legal process to disclose your information to authorities.</li>
                  <li>To protect our rights, customers, or business interests, including fraud prevention.</li>
                </ul>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  All third-party service providers are contractually obligated to safeguard your data.
                </Text>
                
                <Title order={4} className="text-xl font-serif mb-3 text-center">Cookies and Tracking Technologies</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  Dynasty may use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and customize content. By using our website, you consent to our use of cookies. You may choose to disable cookies through your browser settings; however, this may affect certain functionalities of the website.
                </Text>
                
                <Title order={4} className="text-xl font-serif mb-3 text-center">Your Rights</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  You have the right to access, correct, update, or request deletion of your personal information at any time. To exercise these rights, please contact us at support@dynastyworld.in.
                </Text>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  Please note that we may retain certain information as required by law or for legitimate business purposes.
                </Text>
                
                <Title order={4} className="text-xl font-serif mb-3 text-center">Changes to This Privacy Policy</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  Dynasty reserves the right to modify this Privacy Policy at any time without prior notice. Changes will become effective immediately upon posting on the website. It is your responsibility to review this Privacy Policy periodically to stay informed of any updates.
                </Text>
                
                <Title order={4} className="text-xl font-serif mb-3 text-center">Contact Information</Title>
                <Text className="mb-4 leading-relaxed text-center mx-auto max-w-3xl">
                  For any questions, concerns, or requests relating to your personal data or this Privacy Policy, please contact us at:
                  <br />
                  Email: support@dynastyworld.in
                  <br />
                  Business Name: Dynasty
                </Text>
              </div>
              
              <Text className="text-center font-medium mt-10">
                By using this website, you agree to be bound by Dynasty's Terms & Conditions, Return & Exchange Policy, and Privacy Policy
              </Text>
            </Paper>
          </motion.div>
        </Container>
      </div>
    </div>
  );
};

export default LegalPolicies; 