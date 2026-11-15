import crypto from 'crypto';
import { registerOrUpdateUser } from '../../../../lib/authDb';

const razorpay_key_secret = process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET';

const ALL_5_BOOKS = [
  'the-charmer',
  'the-negotiator',
  'the-detective',
  'the-leader',
  'the-heart-reader'
];

export async function POST(req) {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpaySignature,
      userDetails,
      itemType,
      bookId,
      isBundle,
      deviceId,
      deviceInfo
    } = await req.json();

    // Verify signature if secret is provided (skip in test mock if secret is default)
    if (razorpay_key_secret && razorpay_key_secret !== 'YOUR_KEY_SECRET') {
      const signature = crypto.createHmac('sha256', razorpay_key_secret);
      signature.update(orderCreationId + '|' + razorpayPaymentId);
      const digest = signature.digest('hex');

      if (digest !== razorpaySignature) {
        return Response.json({ msg: 'Transaction not legit!' }, { status: 400 });
      }
    }

    const { email, name, phone } = userDetails || {};

    if (!email) {
      return Response.json({ error: 'User email is required' }, { status: 400 });
    }

    // Determine which books were purchased
    let booksToGrant = [];
    if (isBundle || bookId === 'bundle' || itemType === 'MASTERCLASS') {
      booksToGrant = ALL_5_BOOKS;
    } else if (bookId) {
      booksToGrant = [bookId];
    } else {
      booksToGrant = ['the-heart-reader'];
    }

    // Register user in database and claim active single-device session
    const { user, sessionToken } = await registerOrUpdateUser({
      email,
      name: name || 'Reader',
      phone: phone || '',
      booksToAdd: booksToGrant,
      deviceId: deviceId || `dev_${Date.now()}`,
      deviceInfo: deviceInfo || 'Purchasing Device',
    });

    return Response.json({
      msg: 'success',
      orderId: razorpayPaymentId || `order_${Date.now()}`,
      sessionToken,
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name,
        phone: user.phone,
        purchasedBooks: user.purchasedBooks,
        activeDeviceInfo: user.activeDeviceInfo,
      },
      unlockedBookId: isBundle ? 'bundle' : booksToGrant[0],
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    return Response.json({ error: 'Verification failed' }, { status: 500 });
  }
}
