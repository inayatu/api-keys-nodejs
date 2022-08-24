require("dotenv").config();

const config = {
  development: {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI_DEV,
    JWT_SECRET: process.env.JWT_SECRET,
    API_MAX_USE_PER_DAY: process.env.API_MAX_USE_PER_DAY,
  },
  production: {
    PORT: process.env.PORT_PROD,
    DB_URI: process.env.DB_URI_PROD,
    JWT_SECRET: process.env.JWT_SECRET,
    API_MAX_USE_PER_DAY: process.env.API_MAX_USE_PER_DAY,
  },
};

if (process.env.NODE_ENV === "development") module.exports = config.development;
else if (process.env.NODE_ENV === "production")
  module.exports = config.development;
else throw new Error("No environment defined");
