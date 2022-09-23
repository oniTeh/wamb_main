const crypto =require('crypto');
//create password for users
async function validatePassword(password,hash,salt){
    let verifyHash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
    return verifyHash === hash;
};

//generate user password
async function genPassword(password){
    var salt = crypto.randomBytes(32).toString('hex');// edit for higher algorithm 
    var genHash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
    return{
        salt:salt,
        hash:genHash
    }
};
module.exports = {
    genPassword:genPassword,
    validatePassword:validatePassword
}