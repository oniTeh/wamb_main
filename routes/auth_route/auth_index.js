const router = require('express').Router()
const passport = require('passport')
const { isAuth } = require('../../controllers/authentication_controllers/auth_access_rules')
const { googleoAuthentry } = require('../../controllers/authentication_controllers/passport/passport_google_auth')
const {login,logout} = require('../../controllers/authentication_controllers/passport/passport_local_auth')
const {register_account} = require('../../controllers/authentication_controllers/registration/register_account')
const change_password = require('../../controllers/display_controllers/chnage_password')




router.get('/auth/google',googleoAuthentry)
router.get('/google/callback', passport.authenticate('google',{successRedirect:'/dashboard',failureRedirect:'/'}) )
router.post('/register',register_account)
router.post('/change-password',isAuth,change_password)
router.post('/login', login) 
router.get('/logout',logout)

module.exports=router