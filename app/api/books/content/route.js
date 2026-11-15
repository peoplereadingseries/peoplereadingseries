import { validateActiveSession } from '../../../../lib/authDb';
import { getBookFullContent } from '../../../../lib/booksContentData';

export async function POST(req) {
  try {
    const { email, sessionToken, bookId } = await req.json();

    if (!email || !sessionToken || !bookId) {
      return Response.json({ error: 'Missing credentials or bookId' }, { status: 400 });
    }

    // 1. Enforce WhatsApp-Style Single Device Active Session
    const sessionCheck = await validateActiveSession({ email, sessionToken });
    if (!sessionCheck.valid) {
      return Response.json(
        {
          error: 'Session invalid or active on another device',
          ...sessionCheck,
        },
        { status: 401 }
      );
    }

    const user = sessionCheck.user;

    // 2. Validate Book Purchase Access
    const userPurchased = user.purchasedBooks || [];
    const hasAccess =
      userPurchased.includes(bookId) ||
      userPurchased.includes('bundle') ||
      userPurchased.length >= 5;

    if (!hasAccess) {
      return Response.json(
        {
          error: 'Book not purchased under this account',
          purchasedBooks: userPurchased,
          requestedBookId: bookId,
        },
        { status: 403 }
      );
    }

    // 3. Fetch Full Protected Reading Content
    const bookContent = getBookFullContent(bookId);
    if (!bookContent) {
      return Response.json({ error: 'Book content not found' }, { status: 404 });
    }

    // 4. Return protected content with dynamic anti-piracy DRM watermark metadata
    return Response.json({
      success: true,
      book: bookContent,
      watermark: {
        text: `Protected Edition • Licensed to ${user.name} (${user.email})`,
        email: user.email,
        timestamp: new Date().toISOString(),
      },
      user: {
        name: user.name,
        email: user.email,
        purchasedBooks: userPurchased,
      },
    });
  } catch (error) {
    console.error('Error fetching book content:', error);
    return Response.json({ error: 'Internal reader error' }, { status: 500 });
  }
}
