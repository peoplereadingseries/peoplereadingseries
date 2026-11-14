'use client';
import { useLanguage } from '../context/LanguageContext';

export default function BookSection() {
    const { t } = useLanguage();

    const handlePayment = async () => {
        const amount = 499; // Price in INR
        const currency = 'INR';

        const res = await fetch('/api/payment/create-order', {
            method: 'POST',
            body: JSON.stringify({ amount, currency }),
        });
        const order = await res.json();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID', // Replace with public env var
            amount: order.amount,
            currency: order.currency,
            name: 'Siya',
            description: 'Purchase of "From Chaos to Clarity" eBook',
            order_id: order.id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order.id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                    itemType: 'EBOOK',
                    userDetails: {
                        name: 'User Name', // In a real app, collect this from a form
                        email: 'user@example.com',
                        phone: '9999999999'
                    },
                };

                const result = await fetch('/api/payment/verify', {
                    method: 'POST',
                    body: JSON.stringify(data),
                });
                const resData = await result.json();
                if (resData.msg === 'success') {
                    alert('Payment Successful! Check your email/whatsapp.');
                } else {
                    alert('Payment Verification Failed');
                }
            },
            prefill: {
                name: 'User Name',
                email: 'user@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#ff2a6d',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="text-white block">{t('book.title1')}</span>
                            <span className="text-gradient block">{t('book.title2')}</span>
                        </h2>
                        <p className="text-lg text-white/70 leading-relaxed">
                            {t('book.description')}
                        </p>
                        <ul className="space-y-3 text-white/80">
                            <li className="flex items-center gap-2">
                                <span className="text-neon-pink">✓</span> {t('book.points.p1')}
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-neon-pink">✓</span> {t('book.points.p2')}
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-neon-pink">✓</span> {t('book.points.p3')}
                            </li>
                        </ul>
                        <div className="pt-6">
                            <button
                                onClick={handlePayment}
                                className="glass hover:bg-white/10 text-white px-8 py-4 rounded-full text-lg border-2 border-neon-pink/50 transition-all hover:scale-105"
                            >
                                {t('book.cta')}
                            </button>
                        </div>
                    </div>

                    {/* Book Visual Mockup */}
                    <div className="flex-1 flex justify-center">
                        <div className="relative w-64 h-96 bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-r-2xl rounded-l-md shadow-[0_0_50px_rgba(255,42,109,0.3)] flex items-center justify-center transform rotate-y-12 animate-float">
                            {/* Spine */}
                            <div className="absolute left-0 top-0 bottom-0 w-4 bg-white/10 rounded-l-md" />
                            <div className="text-center p-6">
                                <h3 className="text-3xl font-bold font-serif text-white mb-2">{t('book.cover.title')}</h3>
                                <p className="text-sm text-neon-pink uppercase tracking-widest">{t('book.cover.subtitle')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
