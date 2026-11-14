import Razorpay from 'razorpay';
import shortid from 'shortid';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET',
});

export async function POST(req) {
    try {
        const { amount, currency = 'INR' } = await req.json();

        const payment_capture = 1;
        const options = {
            amount: amount * 100, // Amount in paise
            currency,
            receipt: shortid.generate(),
            payment_capture,
        };

        const response = await razorpay.orders.create(options);

        return Response.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return Response.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
