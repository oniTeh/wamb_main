// contain all routh
const passport = require("passport");
const{ isAuth,isGoogleSignedIn }= require('../../lib/authmiddleware')
const {generate_affiliate_code} = require('../../controllers/wamb_market_controller/index')
const {Incommingdata} = require('../../serverHandlersInstances/IncommingHandler')
const { validatepublicKey } = require("../../lib/wambCrypt");
const connection = require("../../config/dbconnection"); //getting to connect to perform action
const User = connection.models.User; //all seaches access user db model and find matches
const router = require('express').Router();
require('dotenv').config();
const {createGoogleContact} = require('../../controllers/contactController');
const { google } = require("googleapis");
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


router.get('/get_affiliate_code',isAuth, generate_affiliate_code);

router.post('/*',(req,res,next)=>{
console.log(req.body);
  // const data =  new Incommingdata(req.body,req.params[0]);
  //  const validateRequest = (incomingdata)=>{
  //   try{
  //       //check db for details
  //     return   User.findById({_id:incomingdata._id}).then(result=>{
  //           if (result){
  //          return  validatepublicKey(incomingdata._id,incomingdata.userPublicKey,result.code.wamb_apikey).then(access=>{
  //               if(access){
  //                   return {
  //                       ...incomingdata,
  //                      accessKey: result.api_token,
  //                      refreshToken:result.refreshToken,
  //                      googleId:result.googleId

  //                   }
  //               }else{
  //                   return false
  //               }
           
  //           })
            
  //           }else{
  //               return false
  //           }
 
  //       })
     
    // }catch(error){
    //     console.log(error)
    // }
  //  }
//    validateRequest(data).then((result)=> {
//     if(result){

//     const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
//     const CLIENT_SECRETE = process.env.GOOGLE_CLIENT_SECRET;
//     const REDIRECT_URI = process.env.REDIRECT_URI;
//     const credentials = {
//       CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//       CLIENT_SECRETE: process.env.GOOGLE_CLIENT_SECRET,
//       access_token: result.accessKey,
//       refresh_token:result.refreshToken
//     };

//     const auth = new google.auth.OAuth2({
//       keyfile: `../../${process.env.GOOGLE_APPLICATION_CREDENTIALS}`,
//     });

//     auth.setCredentials(credentials);
//     auth._clientId = CLIENT_ID;
//     auth._clientSecret = CLIENT_SECRETE;
//     auth._redirectUrl = REDIRECT_URI;
    
//     try {
//       google.options({
//         access_token: result.accessKey,
//         refresh_token:result.refreshToken,
//         auth,
//       });

//       createGoogleContact(result.data).then(contact=>{
// //either insert to contact db or insert to user contacts list

//         User.findById({_id:data._id}).then((userData)=>{
//           if(userData){
//             userData.contacts.push(contact)
//             userData.save().then(data=>{
//               // return res.status(200).json(data);
//               return 
//             });
//           }else{
//             return res.status(400).json({code:400,messaage:"error occured"})
//           }
//         })
          
//       })
//     } catch (error) {
//       console.log(error);
//     }

//     }else{
//         res.status(200).json({code:200,data:result})
//     }
    
      
// });
res.status(200).json({code:200,message:'saved'})
})
       
   

module.exports= router;