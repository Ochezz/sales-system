import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),

 /* MariaDB URL */
  databaseURL: process.env.DB_URL,
  databaseNAME: process.env.DB_NAME,
  databaseUSER: process.env.DB_USER,
  databasePW: process.env.DB_PASSWORD,
 /* API configs */
  api: {
    prefix: '/api'
  },
 /* Google Analytics */
  googleAnalyticsKEY_FILE: './jwt/' + process.env.GOOGLE_ANALYTICS_KEY_FILE,
  googleAnalyticsVIEW: process.env.GOOGLE_ANALYTICS_VIEW_ID,
  googleAnalyticsSCOPES: process.env.GOOGLE_ANALYTICS_SCOPES,
  issuer: 'SalesSys',
  public: 'public',
 /* JWT */
 jwtSecretKey : process.env.SECRETKEY, 
 acTokenExpiration : process.env.ACTOKEN_EXPIRATION,
 rfTokenExpiration : process.env.RFTOKEN_EXPIRATION
};