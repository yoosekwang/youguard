const { sendMessage, getMessages, getMessageById, getMessagesByUser} = require('../controllers/messageController')
const router = require('express').Router()
const { protect } = require('../middlewares/authMiddleware')

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Retrieve a list of messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       404:
 *         description: No messages found
 *       500:
 *         description: Internal Server Error
 * 
 *   post:
 *     summary: Send a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the message
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Message content is required
 *       500:
 *         description: Internal Server Error
 * /messages/{id}:
 *   get:
 *     summary: Retrieve a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The message ID
 *     responses:
 *       200:
 *         description: Message retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal Server Error
 * /messages/user:
 *   get:
 *     summary: Retrieve messages by user
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       400:
 *         description: User ID is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/messages', protect, getMessages)

router.post('/messages/:id', protect, sendMessage)

router.post('/messages', protect, sendMessage)

router.get('/messages/:id', protect, getMessagesByUser)

module.exports = router