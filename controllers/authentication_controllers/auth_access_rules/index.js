const passport = require('passport');
const isAuth = (req,res,done)=>{
    if(req.isAuthenticated()){
      return   done(null);
        
    }else{
       return  res.redirect('/')
    }
}

const already_loged_in = (req,res,done)=>{
    if(req.isAuthenticated()){
       return  res.redirect('/dashboard')
    }else{
        return done(null)
    }
}

module.exports = {
    isAuth,
    already_loged_in
}