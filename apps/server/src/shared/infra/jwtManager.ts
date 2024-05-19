import jwt from "jsonwebtoken";

import { IDecoded } from "../../@types/jwt";
import authConfig from "../../config/auth";

export class JwtManager {
  SECRET_KEY: string;
  EXPIRES_IN: string;

  constructor() {
    const { secret, expiresIn } = authConfig.jwt;
    this.SECRET_KEY = secret;
    this.EXPIRES_IN = expiresIn;
  }

  generate(params = {}) {
    return jwt.sign(params, this.SECRET_KEY, { expiresIn: this.EXPIRES_IN });
  }

  verify(token: string): IDecoded {
    return jwt.verify(token, this.SECRET_KEY) as IDecoded;
  }
}
