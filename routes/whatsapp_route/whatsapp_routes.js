// contain all routh
const passport = require("passport");
const{ isAuth,isGoogleSignedIn }= require('../../lib/authmiddleware')
// const {getContacts,getLabel,contactInLabel,getPerson,create_group} = require('../../controllers/contactController')
const {whatsappSerever} = require('../../controllers/whatsapp_controllers/whatsapp_server_controller')



const router = require('express').Router();
// //get all gcontacts 
router.get('/',whatsappSerever,(req,res,next)=>{
 res.status(200).json({})
});
// //create new contact route
// router.get('/label',isGoogleSignedIn,isAuth,getLabel);
// //get contacts in a label
// router.get('/label_contact',isGoogleSignedIn,isAuth,contactInLabel);
// //get contact details of resoureseName
// router.get('/person',isGoogleSignedIn,isAuth,getPerson);
// // :::::::::::::::::::create:::::::::::::::::::::::::://
// router.get('/create_group',isGoogleSignedIn,isAuth,create_group);

module.exports= router;