const session = require("express-session");
const mongoose = require("mongoose");
var MongoDBStore = require('connect-mongodb-session')(session);

require("dotenv").config();

async function connection(app) {
  const dburl = process.env.DATABASE;
  const dbOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(dburl, dbOption).then((con, er) => {
      console.log("connected");
    });
    var store = new MongoDBStore({
      uri: process.env.SESSION_DATABASE,
      collection: 'sessions'
    });

    app.use(require('express-session')({
      secret: process.env.SESSION_SECRET,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 //one week
      },
      store: store,
      resave: true,
      saveUninitialized: true
    }));
    
    // Catch errors
    store.on('error', function(error) {
      done(error);
    });
    
  } catch (error) {
    console.error({ error: "error in connecting to database" });
  }
}

module.exports = {
  connection,
};
