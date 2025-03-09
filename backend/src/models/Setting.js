const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SettingSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true, // Ensures unique settings keys
    },
    value: {
        type: mongoose.Schema.Types.Mixed, // Allows string, object, array, etc.
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Setting = mongoose.model('Setting', SettingSchema)
module.exports = Setting