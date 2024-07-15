import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 3000,
    refreshTokenExpiryMS: 30000,
  },
  test: {
    accessToken: process.env.TEST_ACCESS_TOKEN,
    accessTokenSuperAdmin: process.env.TEST_ACCESS_TOKEN_SUPER_ADMIN,
  },
};

export default config;
