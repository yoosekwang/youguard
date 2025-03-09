const Translation = require('../models/Translation')
const path = require('path');


const getTranslation = async (req, res) => {

    try{
        const translation = await Translation.findOne();

        if (!translation) {
            return res.status(404).json({ message: 'Translations not found' });
        }

        // Return translations in the requested format
        res.status(200).json({
            en: translation.translations.en,
            ko: translation.translations.ko
        });
       
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }

}

const updateTranslation = async (req, res) => {
    try {
        const { en, ko } = req.body
        
        const translation = await Translation.findOneAndUpdate(
            {}, // Empty filter will find the first document in the collection
            {
              $set: {
                'translations.en': en || {}, // Default to empty object if no 'en' translations are sent
                'translations.ko': ko || {}  // Default to empty object if no 'ko' translations are sent
              }
            },
            { new: true, upsert: false } 
        );
        res.status(200).json({ 
            success: true,
            message: 'Translation updated',
            data: translation
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }

}


const insertTranslation = async (req, res) => {
    
    // Destructure the translations from the request body
    const { en, ko } = req.body;

    // Validate that both 'en' and 'ko' translations are provided
    if (!en || !ko) {
      return res.status(400).json({ message: "Both 'en' and 'ko' translations are required." });
    }

    // Create a new translation document
    const newTranslation = new Translation({
      translations: {
        en: en,
        ko: ko
      }
    });

    // Save the document to the database
    const savedTranslation = await newTranslation.save();

    res.status(201).json({
      success: true,
      message: 'Translation added successfully',
      translation: savedTranslation,
    });

}

module.exports = {
    getTranslation,
    updateTranslation,
    insertTranslation
}