// contain all routh
const passport = require("passport");
const{ isAuth,isGoogleSignedIn }= require('../../lib/authmiddleware')
const {generate_affiliate_code} = require('../../controllers/wamb_market_controller/index')
const router = require('express').Router();

// //get all gcontacts 
// router.get('/',isGoogleSignedIn,isAuth,getContacts);
// //create new contact route
// router.get('/label',isGoogleSignedIn,isAuth,getLabel);
// //get contacts in a label
// router.get('/label_contact',isGoogleSignedIn,isAuth,contactInLabel);//require /?resourseName=groupId
// //get contact details of resoureseName
// router.get('/person',isGoogleSignedIn,isAuth,getPerson);
// // :::::::::::::::::::create:::::::::::::::::::::::::://
// router.get('/create_group',isGoogleSignedIn,isAuth,create_group);
// //create contact 

// router.get('/create_contact',isGoogleSignedIn,isAuth,create_contact);

// //add contacts to existing groups

// router.get('/modifygroup',isGoogleSignedIn,isAuth,modifygroup);
// //batchget perticular contacts with their resoureName 


router.get('/get_affiliate_code',isAuth, generate_affiliate_code)
router.get('/*',isAuth,(req,res,next)=>{
    console.log(req.params);
    res.status(200).json({code:200,message:"recieved"});
})
module.exports= router;