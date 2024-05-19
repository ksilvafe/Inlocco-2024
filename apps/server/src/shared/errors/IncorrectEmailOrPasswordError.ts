import { AppError } from "../../shared/errors/AppError";

export class IncorrectEmailOrPasswordError extends AppError {
  constructor() {
    super("Email ou Senha inválido", 401);
  }
}
