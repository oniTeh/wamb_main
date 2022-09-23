const { genPassword,validatePassword } = require("../../lib/passwordUtil")
const { User } = require("../../models/userSchema")
const {success_alert,server_error,show_alert,warn_alert,fail_alert} = require('../../routes/error_route/Error_types')

const handle_change_password = async (req,res,done)=>{
    const {old_password,new_password,confirm_password} = req.body
    const {password,pkey} = req.session.passport.user

    try {
    
            let validata_old = await validatePassword(old_password,password,pkey)//old password, password_hash,password_salt
            if(!validata_old)throw({type: warn_alert, message:' Pleasee your previous password doesn\'t match'})
            if(new_password !== confirm_password)throw({type: warn_alert, message:' Pleasee your new password doesn\'t match'})
            let {hash,salt} = await genPassword(new_password)
            let user = await User.findOneAndUpdate({_id:req.session.passport.user._id},{password:hash,pkey:salt})
            if(!user)throw({type: fail_alert , message:' Pleasee your new password doesn\'t match'}) 
            throw({type:success_alert,message:'password changed successfully'})

    } catch (error) {
        // console.log(error)
         new done (error.message)
        
    }

    
    }

    module.exports = {
        handle_change_password
    }