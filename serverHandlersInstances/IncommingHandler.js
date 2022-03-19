
class Incommingdata {
  constructor(data, user) {
    this.data = data;
    this.user = user;
    let userData = user.split("/");
    let _id = userData[0];
    let userPublicKey = userData[1];
   
    return {
        _id,userPublicKey,data
    }
  }

}

// function erro_changer (req,res,next) {

//   res.success =  new Messages(200,"success");
//    res.failure =  new Messages(400,"failled");
//     //console.log(success, failure);
//     next(null,{success:res.success,failure:res.failure})
// }

module.exports = {
  Incommingdata: Incommingdata,
};
