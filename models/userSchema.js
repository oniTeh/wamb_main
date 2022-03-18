const mongoose = require('mongoose')
const Usertodo = require('./todoModel');
const UserVideos = require('./videosModel');
const userSchema = new mongoose.Schema({
  phonenumber: { type: Number,default:23341234657}, 
  username:String,
  firstname: String,
  lastname: String, 
  email:  String ,
  password: String,
  pkey: String,
  name:String,
  refreshToken:String,
  is_active: { type: Boolean, default: 0 },
  googleId: { type: String, default:"googleid" },
  api_token:{type:String,default:"api_token"}, 
  access_token:{type:String,default:""},
  id_token:{type:String,default:""},
  scope:{type:String,default:""},
  picture:String,
  code:{type:Object,default:{_id:"",wamb_apikey:'',wamb_hash:'',hooks:''}},
  gtoken_expiry_date:{type:Number},

})
module.exports = userSchema// mongoose.model('userSchema', userSchema);