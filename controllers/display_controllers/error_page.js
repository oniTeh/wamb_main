const notfound_page= (error,req,res,done)=>{
    if(error){
        res.render('error',{error:error})
    
}
res.render('error')
}



module.exports = {
    notfount_page:notfound_page
}