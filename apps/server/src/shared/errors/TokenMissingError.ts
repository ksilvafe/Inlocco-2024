import { AppError } from "./AppError";

export class TokenMissingError extends AppError {
  constructor() {
    super("Nenhum token enviado!", 401);
  }
}
