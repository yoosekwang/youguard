const Software = require('../models/Software')
const User = require('../models/User')
const path = require('path');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
});

const s3 = new AWS.S3();

const getSoftwares = async (req, res) => {
    try{
        const softwares = await Software.find()
        .sort({createdAt : -1})
        if(!softwares){
            return res.status(400).json(({message: 'No softwares found...'}))
        }
        res.status(200).json({
            success: true,
            message: 'Softwares fetched successfully...',
            softwares
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

const getSoftwareById = async ( req, res) => {
    try{
        const softwareId = req.params.id
        const software = await Software.findById(softwareId)
        if(!software){
            return res.status(400).json({message: 'Software not found...'})
        }
        res.status(200).json({
            success: true,
            message: 'Softwares fetched successfully...',
            software
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

const downloadSoftware = async (req, res) => {
    try{
        const softwareId = req.params.id
        const software = await Software.findById(softwareId)
        if(!software){
            return res.status(400).json({ message: 'Software not found'})
        }

        const downloadLink = software.filePath

        const userId = req.user._id
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message: 'User not found...'})
        }

        if(!user.isApproved){
            return res.status(400).json({message: 'User not approved...'})
        }

        const dowloadUrl = downloadLink

        res.status(200).json({
            success: true,
            message: 'Software available for download',
            downloadUrl: dowloadUrl
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}
const uploadSoftware = async (req, res) => {
    try {
        // Validate file upload
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded.',
            });
        }

        const { name, version, description} = req.body

        const file = req.file;
        
        const fileName = name
        // Upload to S3
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const s3Response = await s3.upload(params).promise();

        // Save software details in the database
        const newSoftware = new Software({
            name: fileName,
            version: version,
            filePath: s3Response.Location,
            description
        });

        await newSoftware.save();

        res.status(201).json({
            success: true,
            message: 'Software uploaded successfully.',
            data: {
                name: newSoftware.name,
                description: newSoftware.description,
                version: newSoftware.version,
                fileUrl: newSoftware.filePath,
                uploadedAt: newSoftware.uploadedAt,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to upload software.',
            error: error.message
        });
    }
};


module.exports  = {
    getSoftwares,
    getSoftwareById,
    downloadSoftware,
    uploadSoftware
}