const express = require('express')
const {signup, login} = require('../controllers/auth')
const authMiddleware = require('../services/authentication')

const router = express.Router()

router.route('/signup').post(signup)


router.route('/login').post(login)

module.exports = router