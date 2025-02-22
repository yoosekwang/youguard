const { newRegion, getRegions, deleteRegion } = require('../controllers/regionController')
const router = require('express').Router()
const { protect, isAdmin } = require('../middlewares/authMiddleware')
/**
 * @swagger
 * tags:
 *   name: Region
 *   description: Endpoint for managing regions
 */

/**
 * @swagger
 * /regions:
 *   get:
 *     summary: Get all regions
 *     tags: [Region]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Regions fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 regions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Region'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /regions/new:
 *   post:
 *     summary: Create a new region
 *     tags: [Region]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               region:
 *                 type: string
 *                 example: "North America"
 *     responses:
 *       201:
 *         description: Region added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 RegionDetail:
 *                   type: object
 *                   properties:
 *                     Region:
 *                       type: string
 *       400:
 *         description: Region is required
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /regions/{id}:
 *   delete:
 *     summary: Delete a region
 *     tags: [Region]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The region id
 *     responses:
 *       200:
 *         description: Region deleted successfully
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
 *         description: Region not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/regions', protect, getRegions)
router.post('/regions/new', protect, isAdmin, newRegion)
router.delete('/regions/:id', protect, isAdmin, deleteRegion)

module.exports = router;