const Message = require('../models/Message')
const User = require('../models/User')
const Admin = require('../models/Admin')

const sendMessage = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || content.trim() === '') {
            return res.status(400).json({ message: 'Message content is required' });
        }

        const userId = req.user._id; // User or Admin ID
        const isAdmin = req.user.role === 'Admin';

        let sender, senderType, receiver, receiverType;

        if (isAdmin) {
            // Admin sends a message to a user (id in params)
            const userIdInParams = req.params.id;
            if (!userIdInParams) {
                return res.status(400).json({ message: 'Receiver user ID is required' });
            }

            sender = await Admin.findById(userId);
            senderType = 'Admin';
            receiver = await User.findById(userIdInParams);
            receiverType = 'User';
        } else {
            // User sends a message to the admin
            sender = await User.findById(userId);
            senderType = 'User';
            receiver = await Admin.findOne(); // Assumes there's only one admin
            receiverType = 'Admin';
        }

        if (!sender || !receiver) {
            return res.status(400).json({ message: 'Sender or receiver not found' });
        }

        const message = new Message({
            sender: sender._id,
            senderType,
            receiver: receiver._id,
            receiverType,
            content,
        });

        await message.save();

        res.status(200).json({
            success: true,
            message: 'Message sent successfully',
            data: message,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};


const getMessages = async (req, res) => {
    try {
        const userId = req.user._id;
        const isAdmin = req.user.role === 'Admin'; // Check role from JWT or session

        let query;

        if (isAdmin) {
            // Admin fetching all messages with a specific user
            const userFilterId = req.query.userId; // Optional query param for user-specific messages
            query = userFilterId
                ? {
                      $or: [
                          { sender: userFilterId, senderType: 'User', receiverType: 'Admin' },
                          { receiver: userFilterId, receiverType: 'User', senderType: 'Admin' },
                      ],
                  }
                : { receiverType: 'Admin', senderType: 'User' }; // Fetch all messages with users
        } else {
            // User fetching their messages with the admin
            query = {
                $or: [
                    { receiver: userId, receiverType: 'User', senderType: 'Admin' },
                    { sender: userId, senderType: 'User', receiverType: 'Admin' },
                ],
            };
        }

        const messages = await Message.find(query)
            .populate('sender', 'nickname name')
            .populate('receiver', 'nickname name')
            .sort({ createdAt: -1 });

        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: 'No messages found' });
        }

        res.status(200).json({
            success: true,
            message: 'Messages retrieved successfully',
            messages,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};

const getMessageById = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the message by its ID
        const message = await Message.findById(id)
            .populate('sender', 'nickname name') // Populate sender details
            .populate('receiver', 'nickname name'); // Populate receiver details

        // If no message is found
        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Message retrieved successfully.',
            data: message,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            error: err.message,
        });
    }
};

const getMessagesByUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find messages where the user is either the sender or the receiver, sorted by oldest first
        const messages = await Message.find({
            $or: [
                { sender: userId },
                { receiver: userId },
            ],
        })
            .sort({ createdAt: 1 }) // Oldest messages first
            .select('content senderType createdAt');

        res.status(200).json({
            success: true,
            message: 'Messages retrieved successfully',
            messages
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};


module.exports = {
    sendMessage,
    getMessages,
    getMessageById,
    getMessagesByUser
}