const { signup, login, forgotPassword, resetPassword, changePassword, getAdminDetails, changeName} = require('../controllers/adminAuthController')
const {protect, isAdmin} = require('../middlewares/authMiddleware')
const router = require('express').Router()

/**
 * @swagger
 * /admin/signup:
 *   post:
 *     summary: Admin signup
 *     description: Register a new admin
 *     tags:
 *       -  Admin Auth
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
 *         description: Admin created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/admin/signup', signup)

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     description: Login a user with email and password
 *     tags:
 *       - Admin Auth
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
 *         description: Admin logged in successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/admin/login', login)

/**
 * @swagger
 * /admin/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Send a reset password link to the admin's email
 *     tags:
 *       - Admin Auth
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
router.post('/admin/forgot-password', forgotPassword)

/**
 * @swagger
 * /admin/reset-password:
 *   put:
 *     summary: Reset password
 *     description: Reset the admin's password using a token
 *     tags:
 *       - Admin Auth
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
router.put('/admin/reset-password', resetPassword)

/**
 * @swagger
 * /admin/change-password:
 *   put:
 *     summary: Change password
 *     description: Change the admin's password while logged in
 *     tags:
 *       - Admin Auth
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
router.put('/admin/change-password', protect, changePassword)
router.get('/admin/details', protect, getAdminDetails)
router.put('/admin/change-name', protect, changeName)

module.exports = router