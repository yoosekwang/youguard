const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()

const signup = async(req, res) => {
    try{
        const { name, email, password } = req.body
    const admin = await Admin.findOne({ email })
    if(admin){
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
        adminId : savedAdmin._id
    }
    const secretKey = process.env.SECRETKEY
    const options = {
        expiresIn : '6hrs'
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

        const admin = await Admin.findOne({ email })

        if(!admin){
            return res.status(400).json({message: 'Admin Not Found...'})
        }
        const matchedPassword = await bcrypt.compare(password, admin.password)
        if(!matchedPassword){
            return res.status(400).json({ message: 'Incorrect Credentials.. Please try again.'})
        }

        const payload = {
            adminId : admin._id
        }
        const secretKey = process.env.SECRETKEY
        const options = {
            expiresIn : '6hrs'
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
        const admin = await Admin.findOne(email)
        if(!admin){
            return res.status(400).json({ message: 'Admin Not Found...'}) 
        }

         // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    console.log('Generated Reset Token:', resetToken); // Debug log

    // Hash token and set to resetPasswordToken field
    admin.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    console.log('Hashed Reset Token:', user.resetPasswordToken); // Debug log

    // Set expire time to 10 minutes from now
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await admin.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    console.log('Reset URL:', resetUrl);

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
      const token = user.getSignedJwtToken();
  
      res.status(200).json({ message : "Password Changed Successfully",  success: true, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

const changePassword = async (req, res) => {
    try{
        const adminId = req.user._id
        console.log(adminId)
        const admin = await Admin.findById(adminId)
        if(!admin){
            return res.status(400).json({message: 'Admin not found'})
        }

        const {password, newPassword} = req.body
        const matchedPassword = await bcrypt.compare(password, admin.password)
        if(!matchedPassword){
            return res.status(400).json({message: 'Current Password Not Correct'})
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
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

const getAdminDetails = async(req, res) => {
    try{
        const adminId = req.user._id
        const admin = await Admin.findById(adminId)
        if(!admin){
            return res.status(404).json({ message: 'Admin not found'})
        }

        const adminInfo = {
            name: admin.name,
            email: admin.email,
            role: admin.role
        }

        res.status(200).json({
            success:true,
            message: 'Admin Details fetched successfully',
            adminInfo
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
        const adminId = req.user._id
        const admin = await Admin.findById(adminId)
        if(!admin){
            return res.status(404).json({ message: 'Admin not found'})
        }

        const { name } = req.body
        admin.name = name
        await admin.save()

        res.status(200).json({
            success: true,
            message: 'Admin name changed successfully',
            name: admin.name
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
    getAdminDetails,
    changeName
}