const mongoose = require('mongoose')
const Schema = mongoose.Schema

const regionSchema  = new Schema({
    region: {
        type: String,
        required: true
    }
})

const Region = mongoose.model('Region', regionSchema)
module.exports = Region