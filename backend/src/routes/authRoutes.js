const { signup, login, forgotPassword, resetPassword, changePassword, verifyEmail} = require('../controllers/authController')
const {protect} = require('../middlewares/authMiddleware')
const router = require('express').Router()

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: User signup
 *     description: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - fullName
 *               - username
 *               - email
 *               - phoneNumber
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/user/signup', signup)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     description: Login a user with email/username and password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailOrUsername:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - emailOrUsername
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/user/login', login)

/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Send a reset password link to the user's email
 *     tags:
 *       - Auth
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
router.post('/user/forgot-password', protect, forgotPassword)

/**
 * @swagger
 * /user/reset-password:
 *   put:
 *     summary: Reset password
 *     description: Reset the user's password using a token
 *     tags:
 *       - Auth
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
router.put('/user/reset-password/:resettoken', resetPassword)

/**
 * @swagger
 * /user/change-password:
 *   put:
 *     summary: Change password
 *     description: Change the user's password while logged in
 *     tags:
 *       - Auth
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
router.put('/user/change-password', protect, changePassword)
router.post('/user/verify-email', verifyEmail)
module.exports = router