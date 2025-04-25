import crypto from 'crypto';
import Razorpay from 'razorpay';

// Initialize Razorpay client
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_k7psHC0CdwYUlW',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'ha0u7XG5ISfSQRFljqHyQeEy',
});

// Webhook secret key (should be the same as configured in Razorpay dashboard)
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'webhook_secret';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify webhook signature
    const webhookSignature = req.headers['x-razorpay-signature'];
    
    if (!webhookSignature) {
      console.error('Webhook signature missing');
      return res.status(400).json({ error: 'Webhook signature missing' });
    }
    
    // Get the raw body data
    const rawBody = req.body;
    const jsonBody = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;
    
    // Verify the webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody))
      .digest('hex');
    
    // Check if signature matches
    if (expectedSignature !== webhookSignature) {
      console.error('Webhook signature verification failed');
      return res.status(400).json({ error: 'Webhook signature verification failed' });
    }
    
    // Verify event is valid and process it
    const event = jsonBody.event;
    console.log('Received webhook event:', event);
    
    // Handle different webhook events
    switch (event) {
      case 'payment.authorized':
      case 'payment.captured':
        // Payment was successful
        const paymentId = jsonBody.payload.payment.entity.id;
        const orderId = jsonBody.payload.payment.entity.order_id;
        
        console.log(`Payment ${paymentId} for order ${orderId} was successful`);
        
        // Here you would update your database or perform other actions
        // For UPI QR payments, this is how you'd confirm the payment went through
        
        break;
        
      case 'payment.failed':
        // Payment failed
        console.log(`Payment failed:`, jsonBody.payload.payment.entity);
        break;
        
      case 'qr_code.closed':
        // QR code was closed without payment
        console.log(`QR code closed:`, jsonBody.payload.qr_code.entity);
        break;
        
      default:
        console.log(`Unhandled webhook event: ${event}`);
    }
    
    // Always return a 200 response to Razorpay to acknowledge receipt
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
} 