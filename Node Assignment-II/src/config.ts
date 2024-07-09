import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 300,
    refreshTokenExpiryMS: 3000,
  },
};

export default config;
