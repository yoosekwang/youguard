const User = require('../models/User')

const getUsers = async (req, res) => {
    try{
        const users = await User.find()
        if(users.length == 0 ){
            return res.status(400).json({ message: 'No Users found...'})
        }
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            users
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message        })
    }
}

const getUserById = async (req, res) => {
    try{
        const userId = req.params.id
        const user  = await User.findById(userId)
        if(!user){
            return res.status(400).json({ message: 'User not found....'})
        }
        res.status(200).json({
            success: true,
            user
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

const updateUser = async (req, res) => {
    try{        
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true})
        if(!user){
            return res.status(400).json({ message: 'User not found...'})
        }
        const updatedUser = {
            Name: user.fullName,
            Username: user.username,
            Email: user.email,
            PhoneNumber: user.phoneNumber,
            Approval: user.isApproved,
            Region: user.region
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            updatedUser
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

const approveUser = async (req, res) => {
    try{
        const userId = req.params.id
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({ message: 'User not found...'})
        }
        if(user.isApproved){
            return res.status(400).json({ message: 'User has already been approved...'})
        }
        user.isApproved = true
        await user.save()
        
        const userDetails = {
            Name: user.fullName,
            Username: user.username,
            Region: user.region,
            PhoneNumber: user.phoneNumber,
            Approval: user.isApproved
        }

        res.status(200).json({
            success: true,
            message: 'User access approved successfully',
            userDetails
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

const revokeUser = async (req, res) => {
    try{
        const userId = req.params.id
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({ message: 'User not found...'})
        }
        if(!user.isApproved){
            return res.status(400).json({ message: 'User not approved initially'})
        }
        user.isApproved = false
        await user.save()

        const userDetails = {
            Name: user.fullName,
            Username: user.username,
            Region: user.region,
            PhoneNumber: user.phoneNumber,
            Approval: user.isApproved
        }

        res.status(200).json({
            success: true,
            message: 'User access revoked successfully',
            userDetails
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

const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).json({ message: 'User not found..'})
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
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

const getCurrentUser = async (req, res) => {
    try{
        const userId = req.user._id
        const user = await User.findById(userId)

        if(!user){
            return res.status(400).json({ message: 'User Not Found...'})
        }

        const userDetails = {
            Name: user.fullName,
            Username: user.username,
            Email: user.email,
            PhoneNumber: user.phoneNumber,
            Approval: user.isApproved,
            Region: user.region,
            Role: user.role,
            ID: user._id
        }

        res.status(200).json({
            success: true,
            message: 'User details gotten',
            userDetails
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
    getUsers,
    getUserById,
    approveUser,
    revokeUser,
    updateUser,
    deleteUser,
    getCurrentUser
}