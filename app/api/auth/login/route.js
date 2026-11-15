import { loginAndClaimSession } from '../../../../lib/authDb';

export async function POST(req) {
  try {
    const { email, name, phone, deviceId, deviceInfo } = await req.json();

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const { user, sessionToken } = await loginAndClaimSession({
      email,
      name: name || 'Reader',
      phone: phone || '',
      deviceId: deviceId || `dev_${Date.now()}`,
      deviceInfo: deviceInfo || 'Web Browser',
    });

    return Response.json({
      success: true,
      sessionToken,
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name,
        phone: user.phone,
        purchasedBooks: user.purchasedBooks,
        activeDeviceInfo: user.activeDeviceInfo,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: error.message || 'Login failed' }, { status: 500 });
  }
}
