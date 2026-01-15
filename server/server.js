const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'devilboi150@gmail.com',  // Use your Gmail email directly
        pass: 'wvuk ymma cuto lhjr'     // Use your Gmail app-specific password
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Function to send email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'devilboi150@gmail.com',  // Sender email
        to,
        subject,
        text,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info.response);
            }
        });
    });
};

// Endpoint to send email
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Missing required fields: to, subject, text' });
    }

    try {
        const response = await sendEmail(to, subject, text);
        res.status(200).json({ message: 'Email sent successfully!', response });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
});

// Health check route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});