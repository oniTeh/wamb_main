require('dotenv').config();
const { genprivateKey, validatepublicKey } = require("../../lib/wambCrypt");
const {connection} = require("../../config/connection"); //getting to connect to perform action

const { User } = require("../../models/userSchema");

const generate_affiliate_code = (req, res, done) => {
  try {
    genprivateKey(req.session.passport.userData._id).then((data) => {
      const { salt, hash } = data;
      User.findById({ _id: req.session.passport.userData?._id }).then((result) => {
        result.code = {
          _id: req.session.passport.userData._id,
          wamb_apikey: salt,
          privateKey: hash,
          hooks:`${process.env.BASEURL}/server/${req.session.passport.userData?._id}/${hash}`
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
