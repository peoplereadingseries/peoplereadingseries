import { validateActiveSession } from '../../../../lib/authDb';

export async function POST(req) {
  try {
    const { email, sessionToken } = await req.json();

    if (!email || !sessionToken) {
      return Response.json({ valid: false, reason: 'MISSING_CREDENTIALS' }, { status: 400 });
    }

    const result = validateActiveSession({ email, sessionToken });

    if (!result.valid) {
      return Response.json(result, { status: 401 });
    }

    return Response.json(result);
  } catch (error) {
    console.error('Session validation error:', error);
    return Response.json({ valid: false, error: 'Server validation error' }, { status: 500 });
  }
}
