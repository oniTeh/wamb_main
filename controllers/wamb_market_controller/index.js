const connection = require("../../config/dbconnection"); //getting to connect to perform action
const User = connection.models.User; //all seaches access user db model and find matches
require('dotenv').config();
const { genprivateKey, validatepublicKey } = require("../../lib/wambCrypt");

const generate_affiliate_code = (req, res, done) => {
  try {
    genprivateKey(req.session.passport.user._id).then((data) => {
      const { salt, hash } = data;
      User.findById({ _id: req.session.passport.user?._id }).then((result) => {
        result.code = {
          _id: req.session.passport.user._id,
          wamb_apikey: salt,
          privateKey: hash,
          hooks:`${process.env.BASEURL}/${req.session.passport.user?._id}/${hash}`
        };
        result
          .save()
          .then((result) =>
            res.status(200).json({ code: 200, data: result.code })
          );
      });
    });
  } catch (error) {
    done(error);
  }
};

module.exports = {
  generate_affiliate_code,
};
