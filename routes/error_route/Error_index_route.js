
const route = require('express').Router()
const {success_message,warn_alert,fail_alert} = require('../error_route/error_types')


 route.get('/*',(error,req,res,done)=>{
  if(error){
    console.log('error ocured')
  }
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
 })

module.exports = route