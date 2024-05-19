import { NextFunction, Request, Response } from "express";

import { InvalidTokenError } from "../../errors/InvalidTokenError";
import { TokenMissingError } from "../../errors/TokenMissingError";
import { JwtManager } from "../jwtManager";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const jwt = new JwtManager();
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new TokenMissingError();
  }

  const [, token] = authHeader.split(" ");

  try {
    const { cuid } = jwt.verify(token);
    request.user = { cuid };

    next();
  } catch {
    throw new InvalidTokenError();
  }
}
