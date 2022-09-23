// const {
//   login,
//   register,
//   logout,
//   googleoAuthentry,
//   googleoAuth2Callback,
//   getContacts,
// } = require("./authenticateController");
// const { render, promiseImpl } = require("ejs");
// const bodyParser = require("body-parser").urlencoded({ extended: false });
// const { Mongoose } = require("mongoose");
// const passport = require("passport");
// const {
//   isAuth,
//   setOAuthUserdata,
//   isGoogleSignedIn,
// } = require("../lib/authmiddleware");
// const { erro_changer } = require("../config/activityStatus/userTodoActivity");
// const Messages = require("../config/activityStatus/userTodoActivity").Messages;
// const { connection } = require("../config/connection"); //getting to connect to perform action
// const { json } = require("body-parser");
// const mongodb = require("mongodb");
// const fs = require("fs");
// const { User } = require("../models/userSchema");
// require("dotenv").config();
// const dburl = process.env.DATABASE;
// // const User = connection.models.User//all seaches access user db model and find matches

// module.exports = function userController(app) {

//   app.get('/google',googleoAuthentry)
//     .get("/register", (req, res) => {
//       req.session.passport.userData
//         ? res.redirect("/profile")
//         : res.render("register");
//     })
//     .post("/register", bodyParser, register)

//     .get("/", bodyParser, (req, res) => {
//       req?.session?.passport?.user
//         ? res.redirect("/profile")
//         : res.render("login");
//     })
//     .get("/allcontacts", bodyParser, isAuth, getContacts)

//     .get("/google/callback",bodyParser, passport.authenticate("google",{successRedirect:'/profile',failureRedirect:'/'}) )
//     .post(
//       "/login",
//       bodyParser,
//       passport.authenticate("local", {
//         successRedirect: "/profile",
//         failureRedirect: "/",
//       })
//     );

//   app.get("/profile", isAuth,(req, res, done) => {
//     console.log(req.session)
//     console.log('in profile')
//        return res.status.send('hello world')
//     //     console.log('in profile')
//     //   try {
//     //     let _id = JSON.stringify(req?.session?.passport?.user)
//     //     console.log(_id)
//     //     if (_id) {
//     //       User.findById({ id:_id }).then((data) => {
//     //         req.session.passport.userData = data;
//     //         const display = ({
//     //           insertedId,
//     //           _id,
//     //           api_token,
//     //           email,
//     //           googled,
//     //           phonenumber,
//     //           name,
//     //           picture,
//     //           code,
//     //           web_hook_url,
//     //         } = data);
//     //         return res.render("my-profile", display);
//     //       });
//     //     } else {
//     //       res.redirect("/");
//     //     }
//     //   } catch (error) {
//     //    return done({ code: 400, message: error.message });
//     //   }
//     })
//     .get("/dashboard", isAuth, isGoogleSignedIn, (req, res) => {
//       const {
//         insertedId,
//         _id,
//         api_token,
//         email,
//         googled,
//         phonenumber,
//         name,
//         picture,
//       } = req.session?.passport.userData;
//       res.render("dashboard", {
//         insertedId,
//         _id,
//         api_token,
//         email,
//         googled,
//         phonenumber,
//         name,
//         picture,
//       });
//     })
//     .get("/change-password", (req, res) => {
//       const {
//         insertedId,
//         _id,
//         api_token,
//         email,
//         googled,
//         phonenumber,
//         name,
//         picture,
//       } = req.session?.passport?.userData;
//       res.render("change-password", {
//         insertedId,
//         _id,
//         api_token,
//         email,
//         googled,
//         phonenumber,
//         name,
//         picture,
//       });
//     });

//   // UI request to change values of todo

// //   app.post("/ui", isAuth, bodyParser,(req, res, next) => {
// //     console.log(req.body);
// //     let user = req.user;
// //     const { index, status, completedDate, timeCompleted } = req.body;
// //     //req.user.todoes[index].Status = status
// //     User.findById(user).then((result) => {
// //       if (!result) {
// //         res.message = new Messages(401, "an error occured");
// //         return res.json(res.message), next(null, res.message);
// //       } else {
// //         result.todoes[index].Status = status;
// //         result.todoes[index].completion_date = completedDate;
// //         result.todoes[index].timeCompleted = timeCompleted;

// //         result.save().then(() => {
// //           let newStatus = result.todoes[index].Status;
// //           res.message = new Messages(200, "status changed sucessfully ");
// //           res.status(200).json({ newStatus: newStatus, message: res.message });
// //           next(null, erro_changer);
// //         });
// //       }
// //     });
// //   });

//   // user videos in collection api
// //   app.get("/myvideos", isAuth, (req, res) => {
// //     let { firstname, lastname, username, email, videos } = req.user;
// //     profile = {
// //       data: videos,
// //       profile_name: username,
// //       email: email,
// //       fullName: `${firstname} ${lastname}`,
// //       status: { status: res.message },
// //     };
// //     video = JSON.parse(JSON.stringify(videos));
// //     if (videos.length < 1) {
// //       return res.status(401).send("no video in your collection");
// //     } else {
// //       res.render("player", profile);
// //     }
// //   });

// //   app.get("/status", (req, res, next) => {
// //     console.log(req.params.id);
// //     res.send("status");
// //   });

//   app.get("/logout", logout, (req, res) => {
//     res.redirect("/");
//   });

//   app.get("*", (req, res) => {
//     res.status(404).render("notfound");
//   });
// };
