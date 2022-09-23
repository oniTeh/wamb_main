const { genPassword,validatePassword } = require("../../lib/passwordUtil")
const { User } = require("../../models/userSchema")
const {success_alert,server_error,show_alert,warn_alert,fail_alert} = require('../../routes/error_route/Error_types')

const handle_change_password = async (req,res,done)=>{
    const {old_password,new_password,confirm_password} = req.body
    const {password,pkey} = req.session.passport.user

            let validata_old = await validatePassword( old_password,password,pkey)//old password, password_hash,password_salt
            if(!validata_old)return res.status(400).json({type: warn_alert, message:' Pleasee your previous password doesn\'t match'})
            if(new_password !== confirm_password) return res.status(300).json({type: warn_alert, message:' Pleasee your new password doesn\'t match'})
            
            let {hash,salt} = await genPassword(new_password)
             User.findById({_id:req.session.passport.user._id}).then(data=>{
                data.password = hash
                data.pkey = salt
                data.save().then(p=>{
                    return res.status(200).json({type: success_alert, message:' Password changed successfully'})
                })
            return done(null,data)
            }).catch(err=>{
                
            res.status(500).json({type: server_error, message:' Server error'})
            done(err)

            })
        }
    module.exports = {
        handle_change_password
    }


