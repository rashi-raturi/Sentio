const express = require('express')
const {signup, login} = require('../controllers/auth')
const authMiddleware = require('../middlewares/authentication')

const router = express.Router()

router.route('/signup').get((req,res)=>{
    res.render('auth/signup', {title: ''})
}).post(signup)


router.route('/login').get((req,res)=>{
    res.render('auth/login', {title: ''})
}).post(login)

module.exports = router