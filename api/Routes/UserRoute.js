const express = require('express')
const { getMe, registerUser, updateUser, deleteUser } = require('../Controllers/UserController')
const router = express.Router()

router.get('/', getMe)
router.post('/', registerUser)

module.exports = router