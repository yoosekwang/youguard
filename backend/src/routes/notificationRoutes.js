const { getNotificationById, getNotifications, newNotification, deleteNotification} = require('../controllers/notificationController')
const router = require('express').Router()
const {protect, isAdmin} = require('../middlewares/authMiddleware')

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Retrieve a list of notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 notifications:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notification'
 *       400:
 *         description: No notifications found
 *       500:
 *         description: Internal Server Error
 * 
 * /notifications/{id}:
 *   get:
 *     summary: Retrieve a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The notification ID
 *     responses:
 *       200:
 *         description: Notification fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 notification:
 *                   $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Notification not found
 *       500:
 *         description: Internal Server Error
 * 
 * /notifications/new:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 savedNotification:
 *                   $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Internal Server Error
 * 
 * /notification/{id}:
 *   delete:
 *     summary: Delete a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The notification ID
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: No notification found
 *       500:
 *         description: Internal Server Error
 */

router.get('/notifications',protect, getNotifications)
router.get('/notifications/:id', protect, getNotificationById)
router.post('/notifications/new', protect, isAdmin, newNotification)
router.delete('/notification/:id', protect, isAdmin, deleteNotification)

module.exports = router;