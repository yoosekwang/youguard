const mongoose = require('mongoose')
const Schema = mongoose.Schema

const softwareSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
})

const Software = mongoose.model('Software', softwareSchema)
module.exports = Software