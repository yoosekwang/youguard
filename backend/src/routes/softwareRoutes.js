const { getSoftwares, getSoftwareById, downloadSoftware, uploadSoftware } = require('../controllers/softwareController')
const router = require('express').Router()
const {protect, isAdmin} = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware')
/**
 * @swagger
 * tags:
 *   name: Software
 *   description: Software management
 * /softwares:
 *   get:
 *     summary: Retrieve a list of softwares
 *     tags: [Software]
 *     responses:
 *       200:
 *         description: A list of softwares
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 softwares:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Software'
 * /softwares/{id}:
 *   get:
 *     summary: Retrieve a software by ID
 *     tags: [Software]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The software ID
 *     responses:
 *       200:
 *         description: A software object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 software:
 *                   $ref: '#/components/schemas/Software'
 * /softwares/new:
 *   post:
 *     summary: Upload a new software
 *     tags: [Software]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               version:
 *                 type: string
 *               description:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Software uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     version:
 *                       type: string
 *                     fileUrl:
 *                       type: string
 *                     uploadedAt:
 *                       type: string
 *                       format: date-time
 * /softwares/download:
 *   get:
 *     summary: Download a software
 *     tags: [Software]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Software download URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 downloadUrl:
 *                   type: string
 */
router.get('/softwares', protect, getSoftwares)
router.get('/softwares/:id', protect, getSoftwareById)
router.post('/softwares/new', upload.single('file'), protect, isAdmin, uploadSoftware)
router.get('/softwares/download/:id', protect, downloadSoftware)

module.exports = router