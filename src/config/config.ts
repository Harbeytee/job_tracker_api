import dotenv from 'dotenv';

dotenv.config();


// const config = {
//   PORT: Number(process.env.PORT) || 3000,
//   NODE_ENV: process.env.NODE_ENV || 'development',
//   MONGO_URI: process.env.MONGO_URI,
//   JWT_SECRET: process.env.JWT_SECRET,
//   JWT_LIFETIME: process.env.JWT_LIFETIME || '24hrs'
// };


const config = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: (() => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    return secret;
  })(),
  JWT_LIFETIME: process.env.JWT_LIFETIME || '24hrs'
};

export default config;