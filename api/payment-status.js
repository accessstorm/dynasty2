import Razorpay from 'razorpay';

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

  // Only allow GET for checking payment status
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get order ID from query parameters
  const orderId = req.query.orderId;
  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  try {
    // Fetch order details from Razorpay
    const order = await razorpay.orders.fetch(orderId);
    console.log('Order details:', order);
    
    // Check if order exists and has payments
    if (!order) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Order not found' 
      });
    }
    
    // Check payment status based on the order
    // In Razorpay, order status can be "created", "attempted", "paid"
    if (order.status === 'paid') {
      return res.status(200).json({
        status: 'paid',
        orderId: orderId,
        amount: order.amount / 100, // Convert from paise to rupees
        currency: order.currency
      });
    }
    
    // If there are payments associated with the order
    if (order.attempts > 0) {
      try {
        // Get payments for this order
        const payments = await razorpay.payments.all({
          order_id: orderId
        });
        
        // Check if any payment is successful
        const successfulPayment = payments.items.find(payment => payment.status === 'captured');
        
        if (successfulPayment) {
          return res.status(200).json({
            status: 'paid',
            orderId: orderId,
            paymentId: successfulPayment.id,
            amount: successfulPayment.amount / 100,
            currency: successfulPayment.currency
          });
        }
      } catch (paymentError) {
        console.error('Error fetching payments:', paymentError);
      }
    }
    
    // If we get here, payment is still pending
    return res.status(200).json({
      status: 'pending',
      orderId: orderId,
      amount: order.amount / 100,
      currency: order.currency
    });
    
  } catch (error) {
    console.error('Error checking payment status:', error);
    
    // If order doesn't exist or there's another error
    return res.status(200).json({
      status: 'pending',
      orderId: orderId,
      error: error.message
    });
  }
} 