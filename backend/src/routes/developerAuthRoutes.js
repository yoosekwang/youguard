const { signup, login, forgotPassword, resetPassword, changePassword, getDeveloperDetails, changeName} = require('../controllers/developerAuthController')
const {protect, isAdmin, isDeveloper} = require('../middlewares/authMiddleware')
const router = require('express').Router()

/**
 * @swagger
 * /developer/signup:
 *   post:
 *     summary: Developer signup
 *     description: Register a new developer
 *     tags:
 *       -  Developer Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - Name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Developer created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/developer/signup', signup)

/**
 * @swagger
 * /developer/login:
 *   post:
 *     summary: Developer login
 *     description: Login a user with email and password
 *     tags:
 *       - Developer Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Developer logged in successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/developer/login', login)

/**
 * @swagger
 * /developer/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Send a reset password link to the developer's email
 *     tags:
 *       - Developer Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Reset password link sent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/developer/forgot-password', forgotPassword)

/**
 * @swagger
 * /developer/reset-password:
 *   put:
 *     summary: Reset password
 *     description: Reset the developer's password using a token
 *     tags:
 *       - Developer Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *             required:
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put('/developer/reset-password/:resettoken', resetPassword)
/**
 * @swagger
 * /developer/change-password:
 *   put:
 *     summary: Change password
 *     description: Change the developer's password while logged in
 *     tags:
 *       - Developer Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - password
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put('/developer/change-password', protect, changePassword)
router.get('/developer/details', protect, getDeveloperDetails)
router.put('/developer/change-name', protect, changeName)

module.exports = router