const { handle_change_password } = require("../profile_edit_controller")

handle_change_password
const change_password = (req,res,done)=>{
    switch (req.method) {
        case "GET":
             return res.render ('change-password')
        case ('POST'):
            return handle_change_password(req,res,done)
        default:
            break;
    }
    
}
module.exports = change_password 