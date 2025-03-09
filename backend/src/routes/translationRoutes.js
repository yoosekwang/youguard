const { updateTranslation, getTranslation, insertTranslation } = require('../controllers/translationController')
const router = require('express').Router()
const {protect, isAdmin} = require('../middlewares/authMiddleware')


/**
 * @swagger
 * /api/translations:
 *   get:
 *     summary: Get all translations
 *     tags: [Translations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Translations fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Translations fetched successfully"
 *                 translations:
 *                   type: object
 *                   additionalProperties:
 *                     type: object
 *                     properties:
 *                       en:
 *                         type: string
 *                         description: The translation in English
 *                         example: "Welcome to our website!"
 *                       ko:
 *                         type: string
 *                         description: The translation in Korean
 *                         example: "웹사이트에 오신 것을 환영합니다!"
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /translations/insert:
 *   post:
 *     summary: Insert a new translation
 *     tags: [Translations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 description: The translation key to insert
 *                 example: "welcome_message"
 *               translations:
 *                 type: object
 *                 properties:
 *                   en:
 *                     type: string
 *                     description: The translation in English
 *                     example: "Welcome to our website!"
 *                   ko:
 *                     type: string
 *                     description: The translation in Korean
 *                     example: "웹사이트에 오신 것을 환영합니다!"
 *     responses:
 *       201:
 *         description: Translation added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Translation added successfully"
 *                 translation:
 *                   type: object
 *                   properties:
 *                     key:
 *                       type: string
 *                     translations:
 *                       type: object
 *                       properties:
 *                         en:
 *                           type: string
 *                         ko:
 *                           type: string
 *       400:
 *         description: Translation key already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /translations/update:
 *   post:
 *     summary: Update translations for a specific key
 *     tags: [Translations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 description: The translation key to update
 *                 example: "welcome_message"
 *               translations:
 *                 type: object
 *                 properties:
 *                   en:
 *                     type: string
 *                     description: The translation in English
 *                     example: "Welcome to our website!"
 *                   ko:
 *                     type: string
 *                     description: The translation in Korean
 *                     example: "웹사이트에 오신 것을 환영합니다!"
 *     responses:
 *       200:
 *         description: Translation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Translation updated successfully"
 *       400:
 *         description: Invalid input, key or translations are missing
 *       404:
 *         description: Translation key not found
 *       500:
 *         description: Internal Server Error
 */


router.get('/translations', getTranslation)
router.post('/translations/insert', insertTranslation)
router.post('/translations/update', updateTranslation)

module.exports = router