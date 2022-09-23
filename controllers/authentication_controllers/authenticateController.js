// const { genPassword, validatePassword } = require("../lib/passwordUtil");
// const googleapis = require("googleapis");
// const { connection, default: mongoose } = require("mongoose");
// const { User } = require("../models/userSchema");
// const { json } = require("body-parser");

// const passport = require("passport");

// require("dotenv").config();
// const GoogleStrategy = require("passport-google-oauth2").Strategy;

// const axios = require("../config/axiosConfig");
// const { google } = require("googleapis");

// // const { profile } = require("console");
// // try {
// //   passport.serializeUser((user, done) => {
// //     console.log("in passport serialised "+user)
// //     done(null, user);
// //   });
  
// //   passport.deserializeUser((user, done) => {
// //     console.log("in passport Deserialisedserialised "+user)
// //       done(null, user);
   
// //   });
  
// // } catch (error) {
// //   console.log("passport"+error.message)
// // }


// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.REDIRECT_URI,
//       access_type: "offline",
//       response_type: "code",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       //find usr in db with profile id to check wetherthey arerefgistered
//       // console.log(accessToken, refreshToken, profile, done);

//       let user = {  accessToken, refreshToken, ...profile._json};
  
//       let userMail=user['email']//get email of the user
//       //check if user already exist in database 
//       //if user exist update the tokens and update google details  and log user in
//       //else create new user with google auth and details and log them into the session
//       try {
//         User.findOne({email:userMail}).then(data=>{
//           if(data){
    
//             data.is_active=user['email_verified']
//             data.googleId=user['sub']
//             data.picture=user['picture']
//             data.access_token=accessToken
//             data.refreshToken=refreshToken
//             try {
//               data.save().then((saved,error)=>{
//                 done(null,saved._id)
//               })
//             }catch(error){
//               done(null)
//             }
//             done(data._id)
//             // console.log("data exits modify data:"+data)
//           }else{
//             console.log('create data')
//           }
//         })
        
//       } catch (error) {
//         done(null)
//       }
      
//     }
//   )
// );

// module.exports = {
//   logout: async function logout(req, res, done) {
//     console.log("loging out");
//     req.session.passport.userData={}
//     req.logout();
//     done(null);
//   },

//   register: async function register(req, res, done) {
//     if(req?.session?.passport?.user)return res.redirect('/profile')
//     const {
//       firstname,
//       phonenumber,
//       family_name,
//       given_name,
//       id_token,
//       name,
//       picture,
//       access_token,
//       scope,
//       code,
//       email_verified,
//       id,
//       refreshToken,
//       email,
//       verified_email,
//       gtoken_expiry_date,
//       username,
//       lastname,
//       password,
//       accessToken,
//       sub,
//     } = JSON.parse(JSON.stringify(req.body));

//     try {
//       await genPassword(password ? password : email).then((result) => {
//         let { salt, hash } = result;
//         salt.toString;
//         hash.toString;
//         const userdata = {
//           username: username ? username : `${family_name}`,
//           picture,
//           scope,
//           id_token,
//           access_token,
//           lastname: lastname ? lastname : given_name,
//           is_active: email_verified,
//           phonenumber: phonenumber,
//           firstname: firstname ? firstname : family_name,
//           name: name ? name : `${firstname} ${lastname}`,
//           email: email,
//           code: code,
//           refreshToken,
//           gtoken_expiry_date,
//           password: hash,
//           pkey: salt,
//           googleId: sub,
//           api_token: accessToken,
//         };

    

//         User.findOne({ email: email }).then((user) => {
//           if (user) {
//             // res
//             //   .status(208)
//             //   .json({
//             //     code: 208,
//             //     message: "allready have an account please login",
//             //   });// for react or single page api
//             res.redirect('/')
             
//           } else {
//             try {
//               connection.collections["users"]
//                 .insertOne(userdata)
//                 .then((user) => {
//                    return res.redirect('/')
//                    // authenticate the user log him then redirect to profile
//                 });
//             } catch (error) {
//               return done({ code: 400, message: error.message });
//             }
//           }
//         });
//       });
//     } catch (error) {
//       console.log(error);
//       done({ message: "error occured", code: 500 });
//     }
//   }, //end of app reg

//   getContacts: async (req, res, done) => {
//     console.log(req.session.passport.userData.api_token);
//     const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
//     const CLIENT_SECRETE = process.env.GOOGLE_CLIENT_SECRET;
//     const REDIRECT_URI = process.env.REDIRECT_URI;

//     const credentials = {
//       CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//       CLIENT_SECRETE: process.env.GOOGLE_CLIENT_SECRET,
//       access_token: req.session.passport.userData.api_token.toString(),
//       refresh_token: req.session.passport.userData.refreshToken,
//     };

//     const auth = new google.auth.OAuth2({
//       keyfile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
//     });

//     auth.setCredentials(credentials);
//     auth._clientId = CLIENT_ID;
//     auth._clientSecret = CLIENT_SECRETE;
//     auth._redirectUrl = REDIRECT_URI;

//     try {
//       google.options({
//         access_token: req.session.passport.userData.api_token,
//         refresh_token: req.session.passport.userData.refreshToken,
//         auth,
//       });

//       const people = google.people("v1").people;

//       const mycontacts = await people.connections.list({
//         auth: auth,
//         resourceName: `people/me`,
//         pageSize: 1000,
//         personFields: "names,emailAddresses,phoneNumbers",
//       });
//       res.status(200).json(mycontacts.data);
//       // res.send('check')
//     } catch (error) {
//       done(error);
//     }
//   },
// };
