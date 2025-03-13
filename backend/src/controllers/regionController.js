const Region = require('../models/Region')
const logger = require("../logger");
const newRegion = async (req, res) => {
    try{
        const {region} = req.body
        if(!region){
            logger.warn(`Region is required`);
            return res.status(400).json({ message: 'Region is required'})
        }
        const newRegion = new Region({
            region
        })
        const savedRegion = newRegion.save()
        const RegionDetail = {
            Region: savedRegion.region
        }
        res.status(201).json({ 
            success: true,
            message: 'Region Added Successfully',
            RegionDetail
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

const getRegions = async (req, res) => {
    try{
        const regions = await Region.find()
        res.status(200).json({
            success: true,
            message: 'Regions fetched succesfully',
            regions
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

const deleteRegion = async (req, res) => {
    try{
        const regionId = req.params.id
        const region = await Region.findByIdAndDelete(regionId)
        if(!region){
            logger.warn(`Region not found...`);
            return res.status(400).json({ message: 'Region not found...'})
        }
        res.status(200).json({
            success: true,
            message: 'Region Deleted Successfully',
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

module.exports = {
    newRegion,
    getRegions,
    deleteRegion
}