require('dotenv').config();

module.exports = {
  secretKey: process.env.JWT_SECRET,
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT,
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }
};

//non-sensitive config, e.g. feature flags, default settings