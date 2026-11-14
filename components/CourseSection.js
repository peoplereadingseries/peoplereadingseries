'use client';
import { useLanguage } from '../context/LanguageContext';

export default function CourseSection() {
    const { t } = useLanguage();

    const modules = [
        { title: t('course.modules.mod1.title'), desc: t('course.modules.mod1.desc') },
        { title: t('course.modules.mod2.title'), desc: t('course.modules.mod2.desc') },
        { title: t('course.modules.mod3.title'), desc: t('course.modules.mod3.desc') },
        { title: t('course.modules.mod4.title'), desc: t('course.modules.mod4.desc') }
    ];

    const handlePayment = async () => {
        const amount = 2499; // Price in INR
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
            description: 'Enrollment in Social Intelligence Masterclass',
            order_id: order.id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order.id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                    itemType: 'MASTERCLASS',
                    userDetails: {
                        name: 'User Name',
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
                    alert('Enrollment Successful! Check your email/whatsapp.');
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
                color: '#d300c5',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <section className="py-24 bg-black/50 relative">
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />

            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-16">
                    <span className="text-white">{t('course.title1')}</span>
                    <br />
                    <span className="text-neon-blue">{t('course.title2')}</span>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {modules.map((mod, idx) => (
                        <div key={idx} className="glass p-8 rounded-2xl text-left hover:bg-white/5 transition-colors">
                            <div className="text-neon-pink text-5xl font-bold mb-4 opacity-50">0{idx + 1}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{mod.title}</h3>
                            <p className="text-white/60 text-sm">{mod.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="glass-panel inline-block p-1 rounded-full bg-gradient-to-r from-neon-pink/20 to-neon-purple/20">
                    <div className="bg-black/80 rounded-full px-10 py-8 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2">{t('course.bundle.title')}</h3>
                            <p className="text-gray-400 mb-6">{t('course.bundle.desc')}</p>
                            <button
                                onClick={handlePayment}
                                className="btn-primary px-12 py-4 rounded-full text-lg font-bold w-full md:w-auto"
                            >
                                {t('course.bundle.cta')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
