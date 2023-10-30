const express = require('express')
const { registerUser, sign_in, profile } = require('../Controllers/UserController')
const {Protect} = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/me', Protect, profile)
router.post('/', registerUser)
router.post('/sign_in', sign_in)

module.exports = router