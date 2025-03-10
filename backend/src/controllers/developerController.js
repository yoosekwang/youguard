const Developer = require('../models/Developer')
const bcrypt = require('bcrypt')

const getDevelopers = async (req, res) => {
    try{
        const developers = await Developer.find()
        if(developers.length == 0 ){
            return res.status(400).json({ message: 'No Developers found...'})
        }
        res.status(200).json({
            success: true,
            message: 'Developers fetched successfully',
            developers
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message        })
    }
}

const updateDeveloper = async (req, res) => {
    try{        
        
        const {name,email,password,password_confirmation} = req.body;

        const updatedDeveloper = {
            name: name,
            email: email
        }

        if (password || password_confirmation) {
            if (!password || !password_confirmation) {
                return res.status(400).json({ message: "Both password and password confirmation are required." });
            }

            if (password !== password_confirmation) {
                return res.status(400).json({ message: "Passwords do not match." });
            }

            // If passwords match, include in updateFields
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            updatedDeveloper.password = hashedPassword;
        }

        const developer = await Developer.findByIdAndUpdate(req.params.id, updatedDeveloper, { new: true})
        if(!developer){
            return res.status(400).json({ message: 'Developer not found...'})
        }

        res.status(200).json({
            success: true,
            message: 'Developer updated successfully',
            developer
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
    getDevelopers,
    updateDeveloper
}