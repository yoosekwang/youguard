const { getDevelopers, updateDeveloper } = require('../controllers/developerController')
const {protect, isAdmin} = require('../middlewares/authMiddleware')
const router = require('express').Router()

router.get('/developers', protect, getDevelopers)
router.put('/developers/:id', protect, updateDeveloper)

module.exports = router