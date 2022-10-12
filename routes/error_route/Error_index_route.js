const { warn_alert } = require("./Error_types");

const error = (app)=>{

    app.use((error,req,res,next)=>{
        if(error){
          switch (error.type) {
            case warn_alert:
              res.status(400).json({type:warn_alert,message:error.message})
              break;

            case warn_alert:
              res.status(400).json({type:warn_alert,message:error.message})
              break;
          
          
            default:
              break;
          }
            console.log(error)

            //res.status(500).json({type: server_error, message:' Server error'})
        }
    })
 
app.get('/*',(req,res)=>{
res.render('error',{title:'404',message:'Page not found'})
})


console.log('error route')
}
// const route = require('express').Router()
// const {success_message,warn_alert,fail_alert} = require('../error_route/error_types')


//  route.get('/*',(error,req,res,done)=>{
//   if(error){
//     console.log('error ocured')
//     done(null)
//   }else{
//     console.log('no error')
//     done(null)
//   }
//   })
  // if(error){JSON.stringify(error)}
  // if(error.type === server_error){
  //   res.status(500).json({message:error.message})
  // }
  // if(error.type === success_message){
  //   res.status(200).json({message:error.message})
  // }
  // if(error.type === warn_alert){
  //   res.status(200).json(` ${error.message}`)
  // }
  // res.status(200).json({message:error.message})
 

module.exports = error