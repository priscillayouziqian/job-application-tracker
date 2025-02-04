require('dotenv').config();

module.exports = {
  secretKey: process.env.JWT_SECRET,
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT || 3000
};

//non-sensitive config, e.g. feature flags, default settings