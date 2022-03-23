
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

module.exports = {
  Incommingdata: Incommingdata,
};
