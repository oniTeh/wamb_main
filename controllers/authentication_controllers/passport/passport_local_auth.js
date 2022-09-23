
const passport = require('passport');
const { validatePassword } = require('../../../lib/passwordUtil');
const { User } = require('../../../models/userSchema');
const localStrategy = require('passport-local').Strategy;


const feilds = {
    usernameField: 'email',
    passwordfield: 'password'
}


//::::creating verify custome verify callbac to be use by the strategy::::
const verifyCallback = function (username,password,done){
    username.toString(),password.toString();
    User.findOne({email:username}).then((user)=>{
        if(!(user && user?.password && user?.pkey)) return done(null,false);
        let pword = user.password;
        let pkey = user.pkey;
        
        validatePassword(password,pword,pkey).then((result)=>{
        if(result){
            return done(null , user );
        }else{
            return done(null , false );
        }

       });
       
    }).catch((err)=>{done(err)});

}

const strategy = new localStrategy(feilds, verifyCallback)

passport.use(strategy)
passport.serializeUser((user, done)=>{
    done(null, user);

})

passport.deserializeUser((userId, done)=>{
User.findById(userId).then((user)=>{  
    done(null, user);

}).catch(err => done(err))});

const login = (passport.authenticate('local',{successRedirect:'/dashboard',failureRedirect:'/'}));

const logout = (req,res)=>{
    req.logout();
   return  res.redirect('/');
}

module.exports = {
login,
logout
}