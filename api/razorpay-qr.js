import Razorpay from 'razorpay';
import shortid from 'shortid';

// Initialize Razorpay client
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_k7psHC0CdwYUlW',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'ha0u7XG5ISfSQRFljqHyQeEy',
});

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST for creating QR orders
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get amount and details from request
    const amount = req.body.amount || 500; // Amount in INR
    const currency = req.body.currency || 'INR';
    const name = req.body.name || 'Product';
    const description = req.body.description || 'Dynasty Product Purchase';
    const receipt = shortid.generate();

    // Create order options
    const orderOptions = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
      payment_capture: 1,
      notes: {
        productName: name,
        description: description
      }
    };

    // Create order
    const order = await razorpay.orders.create(orderOptions);
    console.log('Order created:', order);

    // Create QR code data for the order
    // Using Razorpay's order ID to link the payment to this order
    const qrData = {
      type: 'upi_qr',
      name: 'Dynasty',
      usage: 'single_use',
      fixed_amount: true,
      payment_amount: amount * 100,
      description: `Payment for ${name}`,
      customer_id: `customer_${receipt}`,
      close_by: Math.floor(Date.now() / 1000) + 3600, // Close after 1 hour
      notes: {
        order_id: order.id
      }
    };

    // Create a QR code using Razorpay
    try {
      const qrCode = await razorpay.qrCode.create(qrData);
      console.log('QR Code created:', qrCode);
      
      // Return QR code image URL and order details
      res.status(200).json({
        id: order.id,
        currency: order.currency,
        amount: order.amount / 100, // Convert back to INR from paise
        qrImage: qrCode.image_url || qrCode.qr_code
      });
    } catch (qrError) {
      console.error('Failed to create QR code with Razorpay API:', qrError);
      
      // Fallback to standard Google Charts QR code (for testing)
      const paymentData = `upi://pay?pa=razorpay@okicici&pn=DYNASTY&tr=${order.id}&am=${amount}&cu=INR&tn=${encodeURIComponent(name)}`;
      const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(paymentData)}`;
      
      res.status(200).json({
        id: order.id,
        currency: order.currency,
        amount: order.amount / 100,
        qrImage: qrUrl,
        warning: 'Using fallback QR generation due to API error'
      });
    }
  } catch (error) {
    console.error('Error creating QR code:', error);
    res.status(500).json({ error: 'Failed to create QR code', details: error.message });
  }
} 