const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/modelschema');

const router = express.Router();

const JWT_SECRET = 'YOUR_SUPER_SECRET_KEY';

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., 'gmail', 'Outlook')
    auth: {
        user: 'YOUR_EMAIL@gmail.com', // Your email address
        pass: 'YOUR_EMAIL_PASSWORD' // Your email password or an app password (more secure than plain password)
    }
});

// API Endpoint for User Registration
router.post('/register', async (req, res) => {
    const { email, name, password, birthdate } = req.body;

    try {
        // 1. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds

        // 2. Create a new user with hashed password
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            birthdate: new Date(birthdate) // Convert birthdate string to Date object
        });

        // 3. Generate unique verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');
        newUser.verificationToken = verificationToken;

        await newUser.save(); // Save to database

        // 4. Send verification email
        const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`; // Create full URL

        const mailOptions = {
            from: 'YOUR_EMAIL@gmail.com',
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Click this link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending verification email:', error);
                return res.status(500).json({ message: 'Error sending verification email.' });
            } else {
                console.log('Verification email sent:', info.response);
                return res.json({ message: 'Registration successful. Please check your email to verify your account.' });
            }
        });

    } catch (error) {
        console.error('Error registering user:', error);
        // Check if the error is due to duplicate email
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ message: 'Email address is already registered.' });
        }
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

// API Endpoint for Email Verification
router.get('/verify-email', async (req, res) => {
    const { token } = req.query; // Get token from query string

    try {
        // Find user with matching token
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).send('Invalid verification link.');
        }

        // Mark user as verified
        user.isVerified = true;
        user.verificationToken = null; // Clear token after verification
        await user.save();

        // Redirect to a success page
        return res.redirect('/login.html'); //Redirect to login page
    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).send('Internal server error.');
    }
});

//Export Router
module.exports = router;