const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  phonenumber: { type: Number,default:23341234657}, 
  username:String,
  firstname: String,
  lastname: String, 
  email:  String ,
  password: {type:String,default:'password'},
  pkey: {type:String,default:''},
  name:String,
  googleId:String,
  refreshToken:{type:String,default:""},
  is_active: { type: Boolean, default: 0 },
  googleId: { type: String, default:"googleid" },
  api_token:{type:String,default:"api_token"}, 
  accessToken:{type:String,default:""},
  id_token:{type:String,default:""},
  scope:{type:String,default:""},
  contacts:{type:Array,default:[]},
  email_verified:{type:Boolean,default:false},
  sub:{type:String,default:""},
  picture:{type:String,default:""},
  code:{type:Object,default:{_id:"",wamb_apikey:'',wamb_hash:'',hooks:''}},
  gtoken_expiry_date:{type:Number},
  locale:{type:String, default:"en"},
  family_name:{type:String,default:""},
  given_name:{type:String,default:""},
  created_at: { type: Date, default: Date.now },

})


module.exports = {
User : mongoose.model('User', userSchema)
}