const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    }
})

const Developer = mongoose.model('Developer', developerSchema)
module.exports = Developer