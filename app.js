var express = require('express');
var app = express();
const io = require('socket.io')
const path = require('path')
const {WebSocket} = require("ws")
const cors = require ('cors');
const { connection } = require('./config/connection');
const passport  = require('passport');
const { google } = require("googleapis");
const {mysocket} = require('./lib/websocket')
const {wambSocket,wbs } = require('./controllers/whatsapp_controllers/whatsapp_server_controller')
error_index_route = require('./routes/error_route/Error_index_route')
require("dotenv").config()
wambSocket(app)
connection(app)
app.use(passport.initialize());
app.use(passport.session());

//:::::::::::require rouths:::::::::::::: 
const auth = require('./routes/auth_route/auth_index');
const display = require('./routes/display_route/display_index_route')
const bodyParser = require('body-parser');

// const contact_route = require('./routes/contact_route/contactRoute')
// const wamb_market_sass_routes = require('./routes/wabm_market_sass_routes/index')
// const whatsapp_route = require('./routes/whatsapp_route/whatsapp_routes')

//::::::::::require controloers::::::::::::::

// var userController = require('./controllers/userController');
//:::::::::::setup routes::::::::::::::
//set up template engin
app.set('view engine', 'ejs');
//static files serving
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
//setting google details for api calls
// app.use((req,res,next)=>{
//   if(req.session?.passport?.user !== undefined){

//     const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
//     const CLIENT_SECRETE = process.env.GOOGLE_CLIENT_SECRET;
//     const REDIRECT_URI = process.env.REDIRECT_URI;
//     const credentials = {
//       CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//       CLIENT_SECRETE: process.env.GOOGLE_CLIENT_SECRET,
//       access_token: req.session.passport.userData?.api_token,
//       refresh_token:req.session.passport.userData.refreshToken
//     };

//     const auth = new google.auth.OAuth2({
//       keyfile: `./${process.env.GOOGLE_APPLICATION_CREDENTIALS}`,
//     });

//     auth.setCredentials(credentials);
//     auth._clientId = CLIENT_ID;
//     auth._clientSecret = CLIENT_SECRETE;
//     auth._redirectUrl = REDIRECT_URI;
    
//     try {
//       google.options({
//         access_token:req.session.passport.userData?.api_token,
//         refresh_token:req.session.passport.userData?.refreshToken,
//         auth,
//       });
    
//     } catch (error) {
//       next(error);
//     }
//     next(null);
//   }else{
//     next(null);
//   }
 
  
// })

// ::::::::::user routes:::::::::::
app.use(display)
app.use(auth);
app.use('/*',error_index_route)





// :::::::ende use routes:::::::::::




//google contact api_controller
// app.use('/profile/contact', contact_route)

// app.use('/server',wamb_market_sass_routes)
// app.use('/whatsapp',whatsapp_route)

//sreaming route






// require('./config/passport');
// require('./config/google-passport-setup')
// app.use((req, res, next) => {   
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-reqed-With");
//     res.header("Access-Control-Allow-Methods", "PATCH,POST,GET,PUT,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     next();
//   });

  app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );






// userController(app);




// (error,req,res,done)=>{

//   if(error){

//     res.render('error',{message:error.message})
//     console.log('error : '+ error.message)
//   }
  
// })


