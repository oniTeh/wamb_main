const login_page=(req,res,done)=>{
    res.render('login')
}
const register_page = (req,res,done)=>{
    res.render('register')
}


module.exports={
    login_page,
    register_page,
}