const { getSettings, updateSettings, getSettingsAsKeyValue } = require('../controllers/settingController')
const router = require('express').Router()
const { protect, isDeveloper } = require('../middlewares/authMiddleware')


router.get('/settings', protect, getSettings)
router.get('/kv-settings', protect, getSettingsAsKeyValue)
router.post('/settings/update', protect, isDeveloper, updateSettings)

module.exports = router;