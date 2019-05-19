const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

router.post('/registration', controller.regUser)
router.post('/login', controller.logUser)

module.exports = router
