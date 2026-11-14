import nodemailer from 'nodemailer';

// Email Configuration
// TODO: Replace with your actual SMTP credentials
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your SMTP provider
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

export const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER || '"PeopleReadingSeries" <no-reply@peoplereadingseries.com>',
            to,
            subject,
            html,
        });
        console.log('Email sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

export const sendWhatsApp = async (to, message) => {
    // Placeholder for WhatsApp API integration
    // meaningful integration requires a paid provider like Twilio or Meta Business API

    console.log(`[WHATSAPP MOCK] Sending to ${to}: ${message}`);

    // Example implementation with Twilio (commented out):
    /*
    const client = require('twilio')(accountSid, authToken);
    await client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${to}`
    });
    */

    return true;
};
