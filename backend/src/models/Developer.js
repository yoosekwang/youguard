const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { deflateSync } = require('zlib')
const jwt = require('jsonwebtoken')

const developerSchema = new Schema ({
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
        enum: ['Developer'],
        default: 'Developer'
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
})

developerSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.SECRETKEY, {
      expiresIn: process.env.JWT_EXPIRE || '1d'
    });
};

const Developer = mongoose.model('Developer', developerSchema)
module.exports = Developer