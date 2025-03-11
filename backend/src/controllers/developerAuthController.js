const jwt = require('jsonwebtoken')
const Developer = require('../models/Developer')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const emailjs = require('emailjs-com')

require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: { 
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const signup = async(req, res) => {
    try{
        const { name, email, password } = req.body
    const developer = await Developer.findOne({ email })
    if(developer){
        return res.status(400).json('Developer already exists...')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newDeveloper = new Developer({
        name,
        email,
        password: hashedPassword
    })

    const savedDeveloper = await newDeveloper.save()

    const payload = {
        developerId : savedDeveloper._id
    }
    const secretKey = process.env.SECRETKEY
    const options = {
        expiresIn : '6hrs'
    }

    const token = jwt.sign(payload, secretKey, options)

    const developerInfo = ({
        Name: savedDeveloper.name,
        Email: savedDeveloper.email,
        Role: savedDeveloper.role
    })

    res.status(201).json({
        success: true,
        message: 'Developer created successfully',
        token,
        developerInfo
    }) 
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
        console.log(err)
    }  
}

const login = async(req, res) => {
    try{
        const { email, password } = req.body

        const developer = await Developer.findOne({ email })

        if(!developer){
            return res.status(400).json({message: 'Developer Not Found...'})
        }
        const matchedPassword = await bcrypt.compare(password, developer.password)
        if(!matchedPassword){
            return res.status(400).json({ message: 'Incorrect Credentials.. Please try again.'})
        }

        const payload = {
            developerId : developer._id
        }
        const secretKey = process.env.SECRETKEY
        const options = {
            expiresIn : '6hrs'
        }

        const token = jwt.sign(payload, secretKey, options)

        const role = developer.role

        res.status(200).json({
            success: true,
            message: 'Developer logged in successfully',
            token,
            role
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
        console.log(err)
    }
}

const forgotPassword = async (req, res) => {
    try{
        const { email } = req.body
        const developer = await Developer.findOne({email})
        if(!developer){
            return res.status(400).json({ message: 'Developer Not Found...'}) 
        }

         // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    console.log('Generated Reset Token:', resetToken); // Debug log

    // Hash token and set to resetPasswordToken field
    developer.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    console.log('Hashed Reset Token:', developer.resetPasswordToken); // Debug log

    // Set expire time to 10 minutes from now
    developer.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await developer.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/developer/reset-password/${resetToken}`;

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
            To reset your password, click the button below. This link will expire in 60 minutes.
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
                <br>• This link will expire in 60 minutes
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

    const mailOptions = {
        from: process.env.EMAIL,
        to: developer.email,
        subject: 'Reset Your Password',
        html: resetTemplate
    };
    //
    await transporter.sendMail(mailOptions);


    res.status(200).json({ message: 'Password reset email sent successfully' });

    // email sending to come in later
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

const resetPassword = async (req, res) => {
    try {
      // Get hashed token
      const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');
  
      const developer = await Developer.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      });
  
      if (!developer) {
        return res.status(400).json({ message: 'Invalid token' });
      }
  
      //hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      // Set new password
      developer.password = hashedPassword;
      developer.resetPasswordToken = undefined;
      developer.resetPasswordExpire = undefined;
      await developer.save();
  
      // Create new token
      const token = developer.getSignedJwtToken();
  
      res.status(200).json({ message : "Password Changed Successfully",  success: true, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

const changePassword = async (req, res) => {
    try{
        const developerId = req.user._id
        console.log(developerId)
        const developer = await Developer.findById(developerId)
        if(!developer){
            return res.status(400).json({message: 'Developer not found'})
        }

        const {password, newPassword} = req.body
        const matchedPassword = await bcrypt.compare(password, developer.password)
        if(!matchedPassword){
            return res.status(400).json({message: 'Current Password Not Correct'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        developer.password = hashedPassword
        await developer.save()

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

const getDeveloperDetails = async(req, res) => {
    try{
        const developerId = req.user._id
        const developer = await Developer.findById(developerId)
        if(!developer){
            return res.status(404).json({ message: 'Developer not found'})
        }

        const developerInfo = {
            name: developer.name,
            email: developer.email,
            role: developer.role
        }

        res.status(200).json({
            success:true,
            message: 'Developer Details fetched successfully',
            developerInfo
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

const changeName = async(req, res) => {
    try{
        const developerId = req.user._id
        const developer = await Developer.findById(developerId)
        if(!developer){
            return res.status(404).json({ message: 'Developer not found'})
        }

        const { name } = req.body
        developer.name = name
        await developer.save()

        res.status(200).json({
            success: true,
            message: 'Developer name changed successfully',
            name: developer.name
        })
    }
    catch(err){
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
    getDeveloperDetails,
    changeName
}