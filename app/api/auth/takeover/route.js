import { loginAndClaimSession } from '../../../../lib/authDb';

export async function POST(req) {
  try {
    const { email, name, deviceId, deviceInfo } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email required' }, { status: 400 });
    }

    // Claim active single-device session
    const { user, sessionToken } = loginAndClaimSession({
      email,
      name,
      deviceId,
      deviceInfo: deviceInfo || 'Reclaimed Device',
    });

    return Response.json({
      success: true,
      message: 'Active session transferred to this device successfully.',
      sessionToken,
      user: {
        email: user.email,
        name: user.name,
        purchasedBooks: user.purchasedBooks,
        activeDeviceInfo: user.activeDeviceInfo,
      },
    });
  } catch (error) {
    console.error('Session takeover error:', error);
    return Response.json({ error: error.message || 'Takeover failed' }, { status: 500 });
  }
}
