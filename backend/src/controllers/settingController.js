const Setting = require('../models/Setting')
const path = require('path');
const logger = require("../logger");
const { error } = require('winston');
const getSettings = async (req, res) => {

    try{
        const settings = await Setting.find()
        res.status(200).json({
            success: true,
            message: 'Settings fetched succesfully',
            settings
        })
    }
    catch(err){
        logger.error(`Internal Server Error: ${err}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }

}

const getSettingsAsKeyValue = async (req, res) => {

    try{
        const settings = await Setting.find({});
    
        // Convert array of objects to key-value JSON format
        const formattedSettings = settings.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
        }, {});
        res.status(200).json({
            success: true,
            message: 'Settings fetched succesfully',
            data: formattedSettings
        })
    }
    catch(err){
        logger.error(`Internal Server Error: ${err}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }

}

const updateSettings = async (req, res) => {

    try {
        const settingsData = req.body; // Get JSON data from request body

        // Iterate through each key-value pair and update or insert
        for (const key in settingsData) {
          await Setting.findOneAndUpdate(
            { key }, // Find by key
            { $set: { value: settingsData[key] } }, // Update value
            { upsert: true, new: true } // Create if not exists
          );
        }

        res.status(200).json({
            success: true,
            message: 'Settings updated',
            data: settingsData
        })
    } catch (error) {
        logger.error(`Internal Server Error: ${error}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}



module.exports = {
    getSettings,
    updateSettings,
    getSettingsAsKeyValue
}