import { updateChatUsage } from '../../../../lib/authDb';

export async function POST(req) {
  try {
    const { email, secondsRemaining, freeLimitReached } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const result = await updateChatUsage({
      email,
      secondsRemaining,
      freeLimitReached,
    });

    if (!result) {
      return Response.json({ error: 'User not found in Cloud Firestore' }, { status: 404 });
    }

    return Response.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Chat usage update error:', error);
    return Response.json({ error: error.message || 'Failed to update chat usage' }, { status: 500 });
  }
}
