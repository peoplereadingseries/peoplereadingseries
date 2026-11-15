import { registerOrUpdateUser } from '../../../../lib/authDb';

const ALL_5_BOOKS = [
  'the-charmer',
  'the-negotiator',
  'the-detective',
  'the-leader',
  'the-heart-reader'
];

export async function POST(req) {
  try {
    const { email, name, bookId, isBundle, deviceId, deviceInfo } = await req.json();

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 });
    }

    let booksToGrant = [];
    if (isBundle || bookId === 'bundle') {
      booksToGrant = ALL_5_BOOKS;
    } else if (bookId) {
      booksToGrant = [bookId];
    } else {
      // Default to the first book or heart-reader if unspecified
      booksToGrant = ['the-heart-reader'];
    }

    const { user, sessionToken } = await registerOrUpdateUser({
      email,
      name: name || 'Reader',
      booksToAdd: booksToGrant,
      deviceId: deviceId || `dev_${Date.now()}`,
      deviceInfo: deviceInfo || 'Purchasing Device',
    });

    return Response.json({
      success: true,
      message: 'Account registered and books unlocked successfully!',
      sessionToken,
      user: {
        email: user.email,
        name: user.name,
        purchasedBooks: user.purchasedBooks,
        activeDeviceInfo: user.activeDeviceInfo,
      },
      unlockedBookId: isBundle ? 'bundle' : booksToGrant[0],
    });
  } catch (error) {
    console.error('Checkout registration error:', error);
    return Response.json({ error: error.message || 'Checkout registration failed' }, { status: 500 });
  }
}
