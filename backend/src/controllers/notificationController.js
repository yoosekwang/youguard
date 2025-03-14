const Notification = require('../models/Notification')
const logger = require("../logger");
const getNotifications = async (req, res) => {
    try{
        const notifications = await Notification.find()
        if(!notifications){
            logger.warn(`No notifications found...`);
            return res.status(400).json({ message: 'No notifications found...'})
        }
        res.status(200).json({
            success: true,
            message: 'Notifications fetched successfully',
            notifications
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

const getNotificationById = async (req, res) => {
    try{
        const notificationId = req.params.id
        const notification = await Notification.findById(notificationId)
        if(!notification){
            logger.warn(`Notification not found`);
            return res.status(400).json({ message: 'Notification not found'})
        }
        res.status(200).json({
            success: true,
            message: 'Notification fetched successfully',
            notification
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

const newNotification = async (req, res) => {
    try{
        const { title, content } = req.body
        const notification = new Notification({
            title,
            content
        })
        const savedNotification = await notification.save()
        res.status(200).json({
            success: true,
            savedNotification
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

const deleteNotification = async(req, res) => {
    try{
        const notification = await Notification.findByIdAndDelete(req.params.id)
        if(!notification){
            logger.warn(`No notification found`);
            return res.status(400).json({ message: 'No notification found'})
        }
        res.status(200).json({
            success: true,
            message: 'Notification deleted successfully'
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
    getNotificationById,
    getNotifications,
    newNotification,
    deleteNotification
}