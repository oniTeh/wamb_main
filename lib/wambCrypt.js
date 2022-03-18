const crypto =require('crypto');
//create public access Key for users
async function validatepublicKey(password,hash,salt){
    let verifyHash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
    return verifyHash === hash;
};

//generate user password
async function genprivateKey(password){
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
    return{
        salt:salt,
        hash:genHash
    }
};
module.exports = {
    genprivateKey:genprivateKey,
    validatepublicKey:validatepublicKey
}