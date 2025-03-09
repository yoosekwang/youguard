const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TranslationSchema = new Schema({
    translations: {
        en: { type: Map, of: String, required: true },
        ko: { type: Map, of: String, required: true }
    }
});

const Translation = mongoose.model('Translation', TranslationSchema)
module.exports = Translation