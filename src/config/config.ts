import dotenv from "dotenv";

dotenv.config();

const config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI,
  baseUrl: process.env.BASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    lifetime: process.env.JWT_LIFETIME || "24h",
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    userInfoUrl: process.env.GOOGLE_USER_INFO_URL,
    tokenUrl: process.env.GOOGLE_AUTH_TOKEN_URL,
    geminiApiKey: process.env.GOOGLE_GEMINI_API_KEY,
  },
  email: {
    host: process.env.EMAIL_HOST,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    service: process.env.EMAIL_SERVICE,
    port: Number(process.env.EMAIL_PORT) || 587,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};

export default config;
