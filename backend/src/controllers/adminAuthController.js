const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const emailjs = require('emailjs-com')

require('dotenv').config();

// Email Transporter Configuration (AWS SES)
const transporter = nodemailer.createTransport({
    host: process.env.AWS_SMTP_HOST,
    port: 587, // Try 587 for TLS (or 465 for SSL)
    secure: false, // false for TLS, true for SSL
    auth: {
      user: process.env.AWS_SMTP_USER,
      pass: process.env.AWS_SMTP_PASSWORD,
    },
  });
  
  // Function to Send Email
  const sendEmail = async (to, subject, html) => {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        html,
      });
  
      console.log("Email sent to:", to);
    } catch (error) {
      console.error("Email sending error:", error);
    }
  };

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const admin = await Admin.findOne({ email })
        if (admin) {
            return res.status(400).json('Admin already exists...')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword
        })

        const savedAdmin = await newAdmin.save()

        const payload = {
            adminId: savedAdmin._id
        }
        const secretKey = process.env.SECRETKEY
        const options = {
            expiresIn: '6hrs'
        }

        const token = jwt.sign(payload, secretKey, options)

        const adminInfo = ({
            Name: savedAdmin.name,
            Email: savedAdmin.email,
            Role: savedAdmin.role
        })

        res.status(201).json({
            success: true,
            message: 'Admin created successfully',
            token,
            adminInfo
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
        console.log(err)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })

        if (!admin) {
            return res.status(400).json({ message: 'Admin Not Found...' })
        }
        const matchedPassword = await bcrypt.compare(password, admin.password)
        if (!matchedPassword) {
            return res.status(400).json({ message: 'Incorrect Credentials.. Please try again.' })
        }

        const payload = {
            adminId: admin._id
        }
        const secretKey = process.env.SECRETKEY
        const options = {
            expiresIn: '6hrs'
        }

        const token = jwt.sign(payload, secretKey, options)

        const role = admin.role

        res.status(200).json({
            success: true,
            message: 'Admin logged in successfully',
            token,
            role
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
        console.log(err)
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(400).json({ message: 'Admin Not Found...' })
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        console.log('Generated Reset Token:', resetToken); // Debug log

        // Hash token and set to resetPasswordToken field
        admin.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        console.log('Hashed Reset Token:', admin.resetPasswordToken); // Debug log

        // Set expire time to 10 minutes from now
        admin.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await admin.save({ validateBeforeSave: false });

        // Create reset URL
        const resetUrl = `${process.env.FRONTEND_URL}/admin/reset-password/${resetToken}`;

        // Send email with reset link
        const resetTemplate = `
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
<table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
        <td style="padding: 40px 30px; text-align: center; background-color: #2563eb;">
            <h1 style="color: #ffffff; margin: 0;">YouGuard</h1>
        </td>
    </tr>
    <tr>
        <td style="padding: 40px 30px;">
            <h2 style="color: #333333; margin-bottom: 20px;">Reset Your Password</h2>
            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                We received a request to reset the password for your account. If you didn't make this request, you can safely ignore this email.
            </p>
            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                To reset your password, click the button below. This link will expire in 10 minutes.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; padding: 12px 30px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
            </div>
            <p style="color: #666666; font-size: 14px; line-height: 1.5;">
                If you're having trouble clicking the button, copy and paste this URL into your web browser:
                <br>
                <span style="color: #2563eb;">${resetUrl}</span>
            </p>
            <div style="margin-top: 30px; padding: 20px; background-color: #f8f8f8; border-radius: 5px;">
                <p style="color: #666666; font-size: 14px; line-height: 1.5; margin: 0;">
                    For security reasons:
                    <br>• This link will expire in 10 minutes
                    <br>• Can only be used once
                    <br>• If expired, please request a new password reset
                </p>
            </div>
        </td>
    </tr>
    <tr>
        <td style="padding: 20px 30px; background-color: #f8f8f8; text-align: center; font-size: 12px; color: #666666;">
            <p style="margin: 0;">
                If you didn't request a password reset, please contact support immediately.
                <br>
                &copy; 2025 YouGuard. All rights reserved.
            </p>
        </td>
    </tr>
</table>
</body>
    `
    //Send email
    await sendEmail(admin.email, "Password Reset Request", resetTemplate);
    res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const admin = await Admin.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!admin) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        //hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Set new password
        admin.password = hashedPassword;
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpire = undefined;
        await admin.save();

        // Create new token
        const token = admin.getSignedJwtToken();

        res.status(200).json({ message: "Password Changed Successfully", success: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const changePassword = async (req, res) => {
    try {
        const adminId = req.user._id
        console.log(adminId)
        const admin = await Admin.findById(adminId)
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' })
        }

        const { password, newPassword } = req.body
        const matchedPassword = await bcrypt.compare(password, admin.password)
        if (!matchedPassword) {
            return res.status(400).json({ message: 'Current Password Not Correct' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        admin.password = hashedPassword
        await admin.save()

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

const getAdminDetails = async (req, res) => {
    try {
        const adminId = req.user._id
        const admin = await Admin.findById(adminId)
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' })
        }

        const adminInfo = {
            name: admin.name,
            email: admin.email,
            role: admin.role
        }

        res.status(200).json({
            success: true,
            message: 'Admin Details fetched successfully',
            adminInfo
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

const changeName = async (req, res) => {
    try {
        const adminId = req.user._id
        const admin = await Admin.findById(adminId)
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' })
        }

        const { name, email } = req.body
        admin.name = name
        admin.email = email
        await admin.save()

        res.status(200).json({
            success: true,
            message: 'Admin name changed successfully',
            name: admin.name
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    getAdminDetails,
    changeName
}