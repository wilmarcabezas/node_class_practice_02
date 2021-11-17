require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_SECRET_REFRESH,
  url: process.env.URLRECOVERY,
  smtpEmail: process.env.SMTPEMAIL,
  smtpPassword: process.env.SMTPPASSWORD,
  apiKey: process.env.apiKey,
}

module.exports = { config };