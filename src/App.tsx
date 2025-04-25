import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { luxuryTheme } from './components/LuxuryTheme';
import WhatsAppButton from './components/WhatsAppButton';
import ChatbotButton from './components/ChatbotButton';

// Pages
import Home from './pages/Home';
import Neckties from './pages/Neckties';
import PocketSquares from './pages/PocketSquares';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Cufflinks from './pages/Cufflinks';
import GiftSets from './pages/GiftSets';
import BulkOrders from './pages/BulkOrders';
import Help from './pages/Help';
import FAQ from './pages/FAQ';

function App() {
  return (
    <MantineProvider theme={luxuryTheme}>
      <Router>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Navbar />
          <div className="flex-grow w-full max-w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/neckties" element={<Neckties />} />
              <Route path="/pocket-squares" element={<PocketSquares />} />
              <Route path="/cufflinks" element={<Cufflinks />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/gift-sets" element={<GiftSets />} />
              <Route path="/bulk-orders" element={<BulkOrders />} />
              <Route path="/help" element={<Help />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </div>
          <Footer />
          {/* WhatsApp floating button */}
          <WhatsAppButton phoneNumber="+919820238241" />
          {/* Chatbot floating button */}
          <ChatbotButton />
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;
