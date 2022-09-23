const passport = require("passport");
const { User } = require("../../../models/userSchema");
const { genPassword } = require("../../../lib/passwordUtil");
require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {  
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
      access_type: "offline",
      response_type: "code",
    },
    async function (accessToken, refreshToken, profile, done) {
      //find usr in db with profile id to check wetherthey arerefgistered
      // console.log(accessToken, refreshToken, profile, done);

      let user = { accessToken, refreshToken, ...profile._json };

      let userMail = user["email"]; //get email of the user
      //check if user already exist in database
      //if user exist update the tokens and update google details  and log user in
      //else create new user with google auth and details and log them into the session
      try {
        User.findOne({ email: userMail }).then((data) => {
          if (data) {
            data.is_active = user["email_verified"];
            data.googleId = user["sub"];
            data.picture = user["picture"];
            data.accessToken = accessToken;
            data.refreshToken = refreshToken;
            data.family_name = user['family_name']
            data.sub = user['sub']
            data.given_name = user['given_name']
            data.save().then((u, e) => {
              if (e) return done(null, false);
              return done(null, u);
            });
            return;
          } else {
            console.log("create data............");
            // generate password from google id
            //send password to user email
            genPassword(user["sub"]).then((password) => {
              const { hash, salt } = password;
              console.log(hash, salt);

              let newUser = new User({
                phonenumber: user["phonenumber"],
                username: user["name"],
                firstname: user["given_name"],
                lastname: user["family_name"],
                email: user["email"],
                password: user["password"],
                pkey: salt,
                password: hash,
                name: user["name"],
                googleId: user["sub"],
                refreshToken: refreshToken,
                is_active: user["email_verified"],
                googleId: user["sub"],
                api_token: user["api_token"],
                accessToken: accessToken,
                id_token: user["id_token"],
                scope: user["scope"],
                contacts: user["contacts"],
                email_verified: user["email_verified"],
                sub: user["sub"],
                picture: user["picture"],
                code: user["code"],
                gtoken_expiry_date: user["gtoken_expiry_date"],
                locale: user["locale"],
                family_name: user["family_name"],
                given_name: user["given_name"],
                created_at: user["created_at"],
              });
              try {
                newUser.save().then((saved, error) => {
                  return done(null, saved._id);
                });
              } catch (error) {
                return done(null, false);
              }
            });
            return;
          }
        });

        console.log(">>>>>>>>>>>>>>>>>>>");
        return;
      } catch (error) {
        done(null, false);
        return;
      }
    }
  )
);

module.exports = {
  googleoAuthentry: passport.authenticate("google", {
    scope: [
      "https://www.google.com/m8/feeds",
      "https://www.googleapis.com/auth/contacts",
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/script.container.ui",
    ],
    accessType: "offline",
    responseType: "code",
    prompt: "consent",
    successRedirect: "/google/callback",
    failureRedirect: "/",
  }),
};
