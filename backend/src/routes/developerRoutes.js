const { getDevelopers, updateDeveloper, getDeveloper, changeDeveloperName, changeDeveloperPassword } = require('../controllers/developerController')
const {protect, isAdmin} = require('../middlewares/authMiddleware')
const router = require('express').Router()

router.get('/developers', protect, getDevelopers)
router.put('/developers/change-dev-name', protect, changeDeveloperName)
router.put('/developers/change-dev-password', protect, changeDeveloperPassword)
router.get('/developer-info', protect, getDeveloper)
router.put('/developers/:id', protect, updateDeveloper)

module.exports = router