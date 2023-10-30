const express = require('express')
const { getMe, registerUser, sign_in, deleteUser } = require('../Controllers/UserController')
const router = express.Router()

router.get('/', getMe)
router.post('/', registerUser)
router.post('/sign_in', sign_in)

module.exports = router