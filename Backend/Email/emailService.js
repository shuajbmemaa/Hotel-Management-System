import nodemailer from 'nodemailer';
import { Buffer } from 'buffer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
    }
});

const sendResetEmail = (email, token) => {
    const base64Token = Buffer.from(token).toString('base64')
    const mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Resetimi i Fjalëkalimit',
        text: `Klikoni në linkun e mëposhtëm për të resetuar fjalëkalimin tuaj: \n\n http://localhost:5173/reset-password/${base64Token}`
    };

    return transporter.sendMail(mailOptions);
};

export { sendResetEmail }