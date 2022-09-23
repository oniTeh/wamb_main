//const passport = require("passport");
const { genPassword } = require("../../../lib/passwordUtil");
const { User } = require("../../../models/userSchema");



const register_account = async (req,res,done)=>{
    try {
        const data = JSON.parse(JSON.stringify(req.body));
        const  {password,email} = data
        console.log(password,email)
        //chwck if user exist using email
        const user = await User.findOne({email})
        if(user){
            if(user.is_active && user.sub){
                return done(new Error('google_user_exist'),null)
            }else{
                return done(new Error('user_exist'),null)
            }
        }else{


        //use password field to genearte a password for the user using generatePassword function
        // log the user into the session and redirect to the dashboard using passport login function

        // const new_user = new User(data);
        // const user = await new_user.save();
        // return  done(null,user._id)

        console.log("create data............");
        // generate password from google id
        //send password to user email
        genPassword(password).then((password_container) => {
          const { hash, salt } = password_container;
          console.log(hash, salt);

          let newUser = new User({
            phonenumber: data["phonenumber"],
            username: data["name"],
            firstname: data["given_name"],
            lastname: data["family_name"],
            email: data["email"],
            pkey: salt,
            password: hash,
            name: data["name"],
            googleId: data["sub"],
            refreshToken: '',
            is_active: data["email_verified"],
            googleId: data["sub"],
            api_token: data["api_token"],
            accessToken:'',
            id_token: data["id_token"],
            scope: data["scope"],
            contacts: data["contacts"],
            email_verified: data["email_verified"],
            sub: data["sub"],
            picture: data["picture"],
            code: data["code"],
            gtoken_expiry_date: data["gtoken_expiry_date"],
            locale: data["locale"],
            family_name: data["family_name"],
            given_name: data["given_name"],
            created_at: data["created_at"],
          });
          try {
            newUser.save().then((saved, error) => {
                if(error)return res.redirect('/register')
                return res.redirect('/')
            });
          } catch (error) {
            throw ({message:'not user created'})

          }
        });
        return;
           
        }
        
    }catch(error){
        done(error)
    }
    console.log(req.session)
    done(null)
}

module.exports ={
    register_account
}