// contain all routh
const { googleoAuthentry } = require('../config/passport/passport_google_auth');
// const {login,googleoAuth2Callback} = require('../controllers/authenticateController');

const router = require('express').Router();
//auth login
router.get('/login',(req,res)=>{
    res.render('login');
 });

//auth with googles

module.exports= router;