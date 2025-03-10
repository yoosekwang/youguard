const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { deflateSync } = require('zlib')
const jwt = require('jsonwebtoken')

const adminSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type:String,
        enum: ['Admin', 'admin'],
        default: 'Admin'
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
})

adminSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.SECRETKEY, {
      expiresIn: process.env.JWT_EXPIRE || '1d'
    });
};

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin