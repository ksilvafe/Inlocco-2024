import dotenv from "dotenv";

import env from "./env";
dotenv.config();

export default {
  jwt: {
    secret: env.secretKey,
    expiresIn: env.expiresIn,
  },
};
